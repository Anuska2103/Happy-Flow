"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { motion } from 'framer-motion';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2 // Delay between each child's animation
        }
    }
};



const dietaryFacts = [
  "Did you know? A diet with a low glycemic index (GI) can help regulate insulin levels and reduce PCOS symptoms.",
  "Did you know? Whole grains, legumes, and millets are rich in fiber, which can help stabilize blood sugar.",
  "Did you know? Healthy fats from nuts and seeds are essential for hormone production and reducing inflammation.",
  "Did you know? Lean proteins from sources like eggs, tofu, and fish help with muscle health and satiety.",
  "Did you know? Staying hydrated with plenty of water can support overall metabolism and well-being."
];

const dietPlans = {
  '18-25': {
    breakfast: [
      "Moong dal cheela with mint chutney",
      "Oats porridge with berries and nuts",
      "Scrambled eggs with spinach and whole-grain toast"
    ],
    lunch: [
      "Brown rice with chickpea curry and a side salad",
      "Quinoa salad with grilled vegetables and paneer",
      "Two multigrain chapatis with dal and mixed vegetable stir-fry"
    ],
    dinner: [
      "Grilled chicken/tofu with a side of steamed broccoli and sweet potato",
      "Lentil and vegetable stew with a small bowl of brown rice",
      "Fish curry with millet roti and cucumber salad"
    ],
    snack: [
      "A handful of roasted chickpeas or nuts",
      "Greek yogurt with flaxseeds and berries",
      "Apple slices with almond butter"
    ]
  },
  '26-35': {
    breakfast: [
      "Besan chilla with vegetables",
      "Ragi dosa with coconut chutney and sambar",
      "Overnight oats with chia seeds, nuts and berries"
    ],
    lunch: [
      "Brown rice pulao with raita and sautéed vegetables",
      "Dal palak with two chapatis and a cucumber salad",
      "Grilled salmon with steamed vegetables"
    ],
    dinner: [
      "Soya chunk curry with two multigrain chapatis",
      "Vegetable khichdi with a bowl of low-fat curd",
      "Clear chicken soup with a small portion of stir-fried tofu"
    ],
    snack: [
      "A portion of mixed seeds (pumpkin, sunflower)",
      "Herbal tea with roasted fox nuts (makhana)",
      "Carrot and cucumber sticks with hummus"
    ]
  },
  '36+': {
    breakfast: [
      "Vegetable oats upma with a glass of low-fat milk",
      "Methi paratha with low-fat curd",
      "Vegetable omelette with whole-grain toast"
    ],
    lunch: [
      "Brown rice with mixed bean curry and leafy greens",
      "Quinoa and vegetable bowl with grilled paneer",
      "Two millet chapatis with dal and vegetable curry"
    ],
    dinner: [
      "Baked fish with a side of grilled asparagus and quinoa",
      "Spinach and lentil soup with a side of whole-grain bread",
      "Tofu stir-fry with bell peppers and brown rice"
    ],
    snack: [
      "A handful of walnuts and almonds",
      "Green tea with a small bowl of sprouts",
      "Plain yogurt with a drizzle of honey"
    ]
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};


export default function PcodInfoPage() {
    const [activeTab, setActiveTab] = useState('dietary-plans');
    const [activeAgeGroup, setActiveAgeGroup] = useState('18-25');
    const [currentFact, setCurrentFact] = useState(dietaryFacts[0]);
    const [factIndex, setFactIndex] = useState(0);

    const handleAgeGroupChange = (e) => {
        setActiveAgeGroup(e.target.value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          setFactIndex((prevIndex) => (prevIndex + 1) % dietaryFacts.length);
        }, 5000); // Change fact every 5 seconds
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        setCurrentFact(dietaryFacts[factIndex]);
    }, [factIndex]);

    const currentPlan = dietPlans[activeAgeGroup];

    return (
        <div className="min-h-screen  flex font-sans">
            
            <aside className="w-1/4 lg:w-1/5 bg-pink-100 p-4 hidden md:flex flex-col shadow-md">
                <h2 className="text-xl font-bold text-pink-800 mb-4">Navigation</h2>
                <Link href="/dashboard" className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors">
                    Dashboard
                </Link>
                <Link href="/tracker" className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors">
                    Cycle Tracker
                </Link>
                <Link href="/dashboard/chatbot" className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors">
                    MediHelp
                </Link>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                

                {/* Main heading remains centered as requested */}
                <motion.h1
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 mt-5 text-center"
>
    Hi, Suffering from <span className="italic text-rose-900">PCOD?</span>
</motion.h1>
                
                <div className="max-w-5xl mx-auto">
                    <p className="text-base md:text-lg text-gray-700 mb-8 text-left">
                        Well relax, you are not the only one here. It's a very common syndrome and almost 9 in 10 women are suffering from this. But before going anywhere else, let's first see what PCOD/PCOS actually is.
                    </p>

                    {/* Information Card: Now with a white background and black text */}
                    <div className="w-full p-6 md:p-8 bg-white border-4 border-slate-700 rounded-2xl shadow-lg">
                        <h5
                         
                        className="mb-4 text-2xl md:text-2xl font-bold tracking-tight text-slate-700">
                            About PCOS/PCOD
                        </h5>
                        
                        {/* Content inside the card is formatted for readability */}
                        <div className="text-black space-y-6 text-base md:text-lg">
                            <p>
                                Polycystic Ovarian Disease (PCOD) is a medical condition where a woman's ovaries produce many immature or partially mature eggs. These eggs are not released during ovulation and can accumulate in the ovaries over time, forming small, fluid-filled sacs or cysts. PCOD is primarily a hormonal disorder that disrupts the normal menstrual cycle and can lead to a variety of symptoms. It is often considered a milder condition than PCOS and is more common, affecting a large number of women in their reproductive years.
                            </p>

                            <div>
                                <h6 className="font-bold text-xl mb-3 text-slate-700">Common Symptoms</h6>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li><span className="font-semibold text-gray-800">Irregular Menstrual Cycles:</span> This is one of the most frequent signs. Periods may be delayed, infrequent, or absent altogether.</li>
                                    <li><span className="font-semibold text-gray-800">Weight Gain:</span> Many women with PCOD experience unexplained weight gain, especially around the abdomen, and may find it difficult to lose weight.</li>
                                    <li><span className="font-semibold text-gray-800">Acne and Oily Skin:</span> Hormonal imbalances can lead to increased oil production, resulting in persistent acne.</li>
                                    <li><span className="font-semibold text-gray-800">Excess Hair Growth (Hirsutism):</span> Elevated levels of male hormones can cause unwanted hair growth on the face, chest, and back.</li>
                                    <li><span className="font-semibold text-gray-800">Hair Thinning:</span> Conversely, some women may experience thinning hair on the scalp or male-pattern baldness.</li>
                                    <li><span className="font-semibold text-gray-800">Difficulty Conceiving:</span> Irregular or absent ovulation can make it challenging to get pregnant.</li>
                                </ul>
                            </div>

                            <div>
                                <h6 className="font-bold text-xl mb-3 text-slate-700">Causes of PCOD</h6>
                                <p className="mb-2 text-gray-700">
                                    While the exact cause is not fully understood, a combination of factors is believed to contribute to its development:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li><span className="font-semibold text-gray-800">Genetics:</span> PCOD often runs in families, suggesting a genetic predisposition.</li>
                                    <li><span className="font-semibold text-gray-800">Insulin Resistance:</span> This is a key factor. When the body's cells don't respond well to insulin, it can cause the ovaries to produce more androgens, disrupting ovulation.</li>
                                    <li><span className="font-semibold text-gray-800">Lifestyle Factors:</span> An unhealthy diet, a sedentary lifestyle, and chronic stress are often linked to PCOD.</li>
                                    <li><span className="font-semibold text-gray-800">Hormonal Imbalances:</span> PCOD is fundamentally a hormonal disorder with an imbalance in hormones that regulate the menstrual cycle.</li>
                                </ul>
                            </div>
                            <div className="flex justify-end p-4">
                                <a
                                    href="https://www.webmd.com/women/what-is-pcos"
                                    className="bg-slate-600 text-white border rounded-2xl italic md:flex hover:bg-slate-800 py-2 px-4"
                                    target="_blank"
                                    rel="noopenner noreferer"
                                >Know More
                                </a>
                            </div> 
                        </div>
                    </div>
                    
                    <div className="p-8">
                        <ul className="flex flex-wrap text-xl font-mono text-center text-rose-500 border-b  border-gray-200 dark:border-gray-700 dark:text-rose-700">
                            <li className="me-2">
                                <a  onClick={()=> setActiveTab('dietary-plans')}
                                className={`inline-block p-4 rounded-t-lg hover:text-rose-50  dark:hover:bg-pink-950 ${activeTab==='dietary-plans' ? 'bg-pink-800 text-white':''}`}>Dietary Plans</a>
                            </li>
                            <li className="me-2">
                                <a onClick={() => setActiveTab('yoga-aasans')}
                                className={`inline-block p-4 rounded-t-lg hover:text-rose-50 dark:hover:bg-pink-950 ${activeTab === 'yoga-aasans' ? 'bg-pink-800 text-white' : ''}`}>Yoga/Aasans</a>
                            </li>
                            <li className="me-2">
                                <a onClick={() => setActiveTab('appointments')}
                                className={`inline-block p-4 rounded-t-lg hover:text-rose-50 dark:hover:bg-pink-950 ${activeTab === 'appointments' ? 'bg-pink-800 text-white' : ''}`}>Appointments</a>
                            </li>
                        </ul>
                    </div>
                    {/* {TAb Content} */}
                    <div className="mt-8">
                        {activeTab==='dietary-plans' && (
                           <>
                           <motion.div
                             id='dietary-plan'
                             className="p-4 bg-white rounded-t-lg shadow-md mb-4"
                             initial={{ y: -50, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.5 }}
                           >
                             <div className="flex items-center justify-between mb-4">
                               <h3 className="text-2xl font-bold text-slate-800">Personalized Dietary Plan</h3>
                               <div className="relative">
                                 <select
                                   value={activeAgeGroup}
                                   onChange={handleAgeGroupChange}
                                   className="appearance-none bg-slate-100 border border-stone-900 text-slate-600 py-2 pl-4 pr-10 rounded-full leading-tight focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
                                 >
                                   <option value="18-25 ">Age Group: 18-25</option>
                                   <option value="26-35">Age Group: 26-35</option>
                                   <option value="36+">Age Group: 36+</option>
                                 </select>
                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-pink-600">
                                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                   </svg>
                                 </div>
                               </div>
                             </div>

                             <motion.div
                               className="mt-4 p-4 bg-slate-300 rounded-lg"
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ duration: 0.5 }}
                             >
                               <p className="text-slate-950 italic">
                                 {currentFact}
                               </p>
                             </motion.div>
                           </motion.div>

                           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                             <motion.div
                               className="bg-white rounded-xl shadow-lg p-6"
                               variants={cardVariants}
                               initial="hidden"
                               animate="visible"
                             >
                               <motion.h4 className="text-xl font-bold text-slate-600 mb-4" layoutId="breakfast-title">
                                 <span className="inline-block mr-2">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun-dim"><circle cx="12" cy="12" r="4"/><path d="M12 4h.01"/><path d="M18.37 5.63l-.01.01"/><path d="M20 12h.01"/><path d="M18.37 18.37h.01"/><path d="M12 20h.01"/><path d="M5.63 18.37h.01"/><path d="M4 12h.01"/><path d="M5.63 5.63h.01"/></svg>
                                 </span>
                                 Breakfast
                               </motion.h4>
                               <motion.ul
                                 className="space-y-3 list-inside text-gray-700"
                                 variants={sectionVariants}
                                 initial="hidden"
                                 animate="visible"
                               >
                                 {currentPlan.breakfast.map((item, index) => (
                                   <motion.li
                                     key={index}
                                     className="flex items-start"
                                     variants={itemVariants}
                                     transition={{ delay: index * 0.1 }}
                                   >
                                     <span className="inline-block mr-2 text-pink-900 mt-1">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2l-7 13v9"/><path d="M14 15v9"/></svg>
                                     </span>
                                     {item}
                                   </motion.li>
                                 ))}
                               </motion.ul>
                             </motion.div>

                             <motion.div
                               className="bg-white rounded-xl shadow-lg p-6"
                               variants={cardVariants}
                               initial="hidden"
                               animate="visible"
                               transition={{ delay: 0.2 }}
                             >
                               <motion.h4 className="text-xl font-bold text-slate-600 mb-4" layoutId="lunch-title">
                                 <span className="inline-block mr-2">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun-medium"><circle cx="12" cy="12" r="4"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="M5 12H3"/><path d="M21 12h-2"/><path d="m18.364 5.636-.01.01"/><path d="m5.636 18.364.01-.01"/><path d="m18.364 18.364-.01-.01"/><path d="m5.636 5.636.01-.01"/></svg>
                                 </span>
                                 Lunch
                               </motion.h4>
                               <motion.ul
                                 className="space-y-3 list-inside text-gray-700"
                                 variants={sectionVariants}
                                 initial="hidden"
                                 animate="visible"
                               >
                                 {currentPlan.lunch.map((item, index) => (
                                   <motion.li
                                     key={index}
                                     className="flex items-start"
                                     variants={itemVariants}
                                     transition={{ delay: index * 0.1 }}
                                   >
                                     <span className="inline-block mr-2 text-pink-900 mt-1">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2l-7 13v9"/><path d="M14 15v9"/></svg>
                                     </span>
                                     {item}
                                   </motion.li>
                                 ))}
                               </motion.ul>
                             </motion.div>
                             
                             <motion.div
                               className="bg-white rounded-xl shadow-lg p-6"
                               variants={cardVariants}
                               initial="hidden"
                               animate="visible"
                               transition={{ delay: 0.4 }}
                             >
                               <motion.h4 className="text-xl font-bold text-slate-600 mb-4" layoutId="dinner-title">
                                 <span className="inline-block mr-2">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                                 </span>
                                 Dinner
                               </motion.h4>
                               <motion.ul
                                 className="space-y-3 list-inside text-gray-700"
                                 variants={sectionVariants}
                                 initial="hidden"
                                 animate="visible"
                               >
                                 {currentPlan.dinner.map((item, index) => (
                                   <motion.li
                                     key={index}
                                     className="flex items-start"
                                     variants={itemVariants}
                                     transition={{ delay: index * 0.1 }}
                                   >
                                     <span className="inline-block mr-2 text-pink-900 mt-1">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2l-7 13v9"/><path d="M14 15v9"/></svg>
                                     </span>
                                     {item}
                                   </motion.li>
                                 ))}
                               </motion.ul>
                             </motion.div>

                             <motion.div
                               className="bg-white rounded-xl shadow-lg p-6"
                               variants={cardVariants}
                               initial="hidden"
                               animate="visible"
                               transition={{ delay: 0.6 }}
                             >
                               <motion.h4 className="text-xl font-bold text-slate-600 mb-4" layoutId="snack-title">
                                 <span className="inline-block mr-2">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-popcorn"><path d="M18 8a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2a2 2 0 0 1-2 2v2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v2a2 2 0 0 1 2 2h12a2 2 0 0 1 2-2v-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2V8Z"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
                                 </span>
                                 Snacks
                               </motion.h4>
                               <motion.ul
                                 className="space-y-3 list-inside text-gray-700"
                                 variants={sectionVariants}
                                 initial="hidden"
                                 animate="visible"
                               >
                                 {currentPlan.snack.map((item, index) => (
                                   <motion.li
                                     key={index}
                                     className="flex items-start"
                                     variants={itemVariants}
                                     transition={{ delay: index * 0.1 }}
                                   >
                                     <span className="inline-block mr-2 text-pink-900 mt-1">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2l-7 13v9"/><path d="M14 15v9"/></svg>
                                     </span>
                                     {item}
                                   </motion.li>
                                 ))}
                               </motion.ul>
                             </motion.div>
                           </div>
                         </>
                        )}


                        { activeTab==='yoga-aasans' && (
                            <>
                                <div id= 'yoga-aasans' className="p-4 bg-white rounded-b-lg shadow-md">
                                    <h3 className="text-2xl font-bold mb-2">Yoya/Asanas</h3>
                                    <p>all excluive yoga to fight your pcod</p>
                                </div>
                                <div className="mt-4 flex  p-4 bg-pink-100 rounded-lg">
                                    <div className=" flex  bg-white rounded-lg shadow-lg p-4 flex-grow hover:shadow-xl transition-shadow space-x-4">
                                        <Image src="/asan1.svg" alt="bridge asan" width={80} height={80} />
                                        <div>
                                        <h2 className="text-rose-900 text-xl font-bold">Setu Bandhasana</h2>
                                        <p className="text-slate-950 text-sm">
                                            Lie on your back with your knees bent and feet flat on the floor. Press into your feet and lift your hips toward the ceiling, holding the pose for 3 seconds. Repeat this 3 times.
                                        </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex  p-4 bg-pink-100 rounded-lg">
                                    <div className=" flex  bg-white rounded-lg shadow-lg p-4 flex-grow hover:shadow-xl transition-shadow space-x-4">
                                        <Image src="/Dhanurasana.svg" alt="Dhanurasana-icon" width={80} height={80} />
                                        <div>
                                        <h2 className="text-rose-900 text-xl font-bold">Dhanurasana</h2>
                                        <p className="text-slate-950 text-sm">
                                            Lie on your stomach, bend your knees and hold your ankles. Lift your chest and thighs off the ground, holding the pose for 30 seconds. Repeat this 3 times.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex  p-4 bg-pink-100 rounded-lg">
                                    <div className=" flex  bg-white rounded-lg shadow-lg p-4 flex-grow hover:shadow-xl transition-shadow space-x-4">
                                        <Image src="/Sarvangasana.svg" alt="Dhanurasana-icon" width={80} height={80} />
                                        <div>
                                        <h2 className="text-rose-900 text-xl font-bold">Sarvangasana</h2>
                                        <p className="text-slate-950 text-sm">
                                            Lie on your back, lift your legs and hips, supporting your back with your hands to bring your body into a straight, vertical line, holding the pose for 30 seconds.
                                        </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex  p-4 bg-pink-100 rounded-lg">
                                    <div className=" flex  bg-white rounded-lg shadow-lg p-4 flex-grow hover:shadow-xl transition-shadow space-x-4">
                                        <Image src="/Baddha_Konasana.svg" alt="Baddha-Konasana-icon" width={80} height={80} />
                                        <div>
                                        <h2 className="text-rose-900 text-xl font-bold">Baddha Konasana</h2>
                                        <p className="text-slate-950 text-sm">
                                            Sit on the floor, bring the soles of your feet together, and hold your ankles as you let your knees drop toward the ground, holding the pose for 30-60 seconds.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex  p-4 bg-pink-100 rounded-lg">
                                    <div className=" flex  bg-white rounded-lg shadow-lg p-4 flex-grow hover:shadow-xl transition-shadow space-x-4">
                                        <Image src="/Chakravakasana.svg" alt="Dhanurasana-icon" width={80} height={80} />
                                        <div>
                                        <h2 className="text-rose-900 text-xl font-bold">Chakravakasana</h2>
                                        <p className="text-slate-950 text-sm">
                                            Lie on your back, lift your legs and hips, supporting your back with your hands to bring your body into a straight, vertical line, holding the pose for 30 seconds.
                                        </p>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )}

                        {activeTab === 'appointments' && (
                            <>
                                <div id="appointments" className="p-4 bg-white rounded-b-lg shadow-md">
                                    <h3 className="text-2xl font-bold mb-2">Appointments</h3>
                                    <p>Book and manage your doctor and nutritionist appointments here.</p>
                                </div>

                                <div className="p-4 text-rose-900 font-bold underline">
                                    <h2>Gynecologist & Obstetrician</h2>
                                </div>

                                {/* Horizontal scroll container */}
                                <div className="flex overflow-x-auto space-x-6 p-4 bg-pink-100 rounded-lg
                                [scrollbar-width:none] 
                                [-ms-overflow-style:none] 
                                [&::-webkit-scrollbar]:hidden"
                                        style={{
                                        WebkitOverflowScrolling: 'touch', // smooth mobile scrolling
                                        }}>
                                    {/* Appointment card 1 */}
                                    <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 w-64 hover:shadow-xl transition-shadow">
                                        <h2 className="text-lg font-semibold text-slate-700">Dr. Amit Gosh</h2>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Qualification: <span className="text-black">MBBS, MD (U.K)</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Location: <span className="text-black">Mitri Clinic, New Alipore Kol-700099</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Timing: <span className="text-black">Wed, Thurs, Friday (5 p.m - 8 p.m)</span>
                                        </p>
                                    </div>

                                    {/* Appointment card 2 */}
                                    <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 w-64 hover:shadow-xl transition-shadow">
                                        <h2 className="text-lg font-semibold text-slate-700">Dr. Anita Roy</h2>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Qualification: <span className="text-black">MBBS, DGO</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Location: <span className="text-black">Roy Medical Center, Ballygunge</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Timing: <span className="text-black">Mon, Wed, Sat (10 a.m - 1 p.m)</span>
                                        </p>
                                    </div>

                                    {/* Appointment card 3 */}
                                    <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 w-64 hover:shadow-xl transition-shadow">
                                        <h2 className="text-lg font-semibold text-slate-700">Dr. Rina Das</h2>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Qualification: <span className="text-black">MBBS, MS</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Location: <span className="text-black">City Hospital, Salt Lake</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Timing: <span className="text-black">Tue, Thurs, Sun (4 p.m - 7 p.m)</span>
                                        </p>
                                    </div>
                                    <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 w-64 hover:shadow-xl transition-shadow">
                                        <h2 className="text-lg font-semibold text-slate-700">Dr. Rina Das</h2>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Qualification: <span className="text-black">MBBS, MS</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Location: <span className="text-black">City Hospital, Salt Lake</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Timing: <span className="text-black">Tue, Thurs, Sun (4 p.m - 7 p.m)</span>
                                        </p>
                                    </div>
                                    <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 w-64 hover:shadow-xl transition-shadow">
                                        <h2 className="text-lg font-semibold text-slate-700">Dr. Rina Das</h2>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Qualification: <span className="text-black">MBBS, MS</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Location: <span className="text-black">City Hospital, Salt Lake</span>
                                        </p>
                                        <p className="text-sm text-slate-600 mt-2">
                                            Timing: <span className="text-black">Tue, Thurs, Sun (4 p.m - 7 p.m)</span>
                                        </p>
                                    </div>
                                </div>
                                </>

                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}

