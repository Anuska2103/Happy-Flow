"use client"
import { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { PaperClipIcon } from '@heroicons/react/24/outline'; // SVG for the attachment icon
import Link from 'next/link';

// Animation variants for the container and child items
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2 // Delay between each child's animation
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 10,
            stiffness: 100
        }
    }
};

export default function ChatbotAgent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSearch = async () => {
        if (!searchTerm || !file) {
            alert("Please provide both a prompt and a file.");
            return;
        }

        setLoading(true);
        setResponse('');

        const formData = new FormData();
        formData.append('prompt', searchTerm);
        formData.append('file', file);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            setResponse(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-row font-inter'>
            {/* Sidebar remains the same */}
            <aside className="w-1/4 lg:w-1/5 bg-pink-100 p-4 hidden md:flex flex-col shadow-md">
                <h2 className="text-xl font-bold text-pink-800 mb-4">Navigation</h2>
                <Link href='/../' className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors">
                    Dashboard
                </Link>
                <Link href="/../tracker" className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors">
                    Cycle Tracker
                </Link>
                <Link href="/../pcod" className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors">
                    PCOD Help
                </Link>
                <Link href="#" className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors">
                    About
                </Link>
            </aside>

            <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
                {/* Floating Heading with entry animation */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-slate-800 font-extrabold text-5xl md:text-6xl text-center items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                    MediHelp
                </motion.h1>
                
                {/* Main content with a higher z-index and staggered animation */}
                <motion.div
                    className="relative z-10 pt-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className='text-black-500 text-center mb-8'>
                        <motion.h1 className='font-serif text-4xl text-pink-900 '>MediHelp</motion.h1>
                        <br></br>
                        <motion.p className="font-serif text-l text-slate-600">Let&apos;s dive into Your report. Please upload them and search</motion.p>
                    </motion.div>

                    {/* Styled Input Container with File and Prompt */}
                    <motion.div variants={itemVariants} className='flex items-center justify-center gap-2'>
                        <div className='relative flex items-center w-full max-w-2xl'>
                            {/* Hidden file input */}
                            <input
                                id="file-input" 
                                type='file'
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept='application/pdf'
                                className="hidden"
                            />
                            
                            {/* Attachment icon with a pulsing animation */}
                            <motion.label
                                htmlFor="file-input"
                                className="absolute left-3 cursor-pointer z-20"
                                whileTap={{ scale: 0.9 }}
                                animate={{ scale: [1.5, 1, 1.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                title="Attach a medical report"
                            >
                                <PaperClipIcon className="h-6 w-6 text-blue-900" />
                            </motion.label>
                            
                            {/* Search box with rounded edges */}
                            <input
                                type='text'
                                placeholder='Search or upload a file...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full pl-12 pr-4 py-3 border-2 border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-900'
                            />
                        </div>

                        {/* Go button */}
                        <motion.button
                            onClick={handleSearch}
                            disabled={loading}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='bg-slate-500 text-white flex items-centre h-14 w-14 font-semibold py-4 px-4 rounded-full hover:bg-slate-700 transition-colors disabled:bg-gray-400'
                        >
                            {loading ? '...' : 'Go'}
                        </motion.button>
                    </motion.div>

                    {/* Response container */}
                    {response && (
                        <motion.div variants={itemVariants} className='mt-8 p-6 bg-white rounded-xl shadow-lg'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Response:</h3>
                            <p className="text-gray-600 leading-relaxed">{response}</p>
                        </motion.div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
