"use client";
import React, { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {motion } from "motion/react"

import AnimatedStar from '../../components/BackgroundAnimations';



export default function DashboardPage() {
    const { user } = UserAuth();
    const router = useRouter();
    

    

    // This effect protects the route. If no user is logged in, it redirects to the login page.
    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    // Render nothing or a loading spinner while checking for user and redirecting
    if (!user) {
        return (
             <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    const title = "Happy Flow".split("");
    return (
        <div className="min-h-screen  p-4 sm:p-6 md:p-8">
            <div className=" pd-10px flex items-center justify-center space-x-6">
                
                <h1 className="mb-4 text-3xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        {title.map((char, i) => (
                            <motion.span
                            key={i}
                            className="inline-block text-transparent bg-clip-text bg-pink-700"
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            >
                            {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                </h1>
            </div>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user.displayName || user.email}!
                </h1>
                <p className="mt-2 text-gray-600">What would you like to do today?</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Track Period */}
                    <motion.div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{duration: 0.4, delay: 0, scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 } }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <><Link href="./tracker">
                        <h2 className="text-xl font-semibold text-pink-600">Track your Flow</h2>
                        <p className="mt-2 text-gray-500">Log your cycle and view predictions.</p>
                        </Link>
                        </>
                    </motion.div>

                    
                    <motion.div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{duration: 1,delay: 0.5, scale: { type: "spring", visualDuration: 1, bounce: 0.5 } }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <><Link href="./pcod">
                        <h2 className="text-xl font-semibold text-pink-600">PCOD/PCOS Help</h2>
                        <p className="mt-2 text-gray-500">Here we are to help you and overcome with pcod</p>
                        </Link>
                        </>
                    </motion.div>

                  
                    <motion.div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{duration: 1.5, delay: 10 ,scale: { type: "spring", visualDuration: 1.5, bounce: 0.5 } }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <><Link href="./dashboard/chatbot">
                        <h2 className="text-xl font-semibold text-pink-600">MediHelp</h2>
                        <p className="mt-2 text-gray-500">Get answers to your questions.</p>
                        </Link>
                        </>
                    </motion.div>

                    <motion.div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{duration: 1.5, delay: 10 ,scale: { type: "spring", visualDuration: 1.5, bounce: 0.5 } }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <><Link href="./dashboard/about">
                        <h2 className="text-xl font-semibold text-pink-600">About</h2>
                        <p className="mt-2 text-gray-500">know Happpy Flow and more</p>
                        </Link>
                        </>
                    </motion.div>
                </div>
                <div>
                    <AnimatedStar />
                </div>
            </div>
        </div>
    );
}