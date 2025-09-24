"use client";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "@/firebase/config";
import { collection, onSnapshot, addDoc, query, orderBy ,updateDoc,deleteDoc, doc} from "firebase/firestore";
import { UserAuth } from "@/context/AuthContext";

// Helper function to calculate days until the next period
const calculateDaysUntilNextPeriod = (lastPeriodDate) => {
  if (!lastPeriodDate) return null;

  const lastDate = new Date(lastPeriodDate);
  const cycleLength = 30; // Average cycle length
  const nextPeriodDate = new Date(lastDate);
  nextPeriodDate.setDate(lastDate.getDate() + cycleLength);

  const now = new Date();
  const timeDifference = nextPeriodDate.getTime() - now.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference > 0 ? daysDifference : 0;
};

export default function TrackerPage() {
  const { user } = UserAuth();
  const router = useRouter();

  const [periodLogs, setPeriodLogs] = useState([]);
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [activeTab, setActiveTab] = useState("oldLogs");
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    pads: "",
    flow: "",
  });
  const [editId, setEditId] = useState(null); 
  const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, `users/${user.uid}/periodData`, id));
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
const handleEdit = (log) => {
  setFormData({
    startDate: log.startDate,
    endDate: log.endDate,
    pads: log.pads,
    flow: log.flow,
  });
  setEditId(log.id);
  setActiveTab("newLog");
};

  useEffect(() => {
   
    if (!user || !user.uid) {
      
      if (!user) {
        router.push("/login");
      }
      return;
    }

    const q = query(
      collection(db, `users/${user.uid}/periodData`),
      orderBy("startDate", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      setPeriodLogs(logs);
    });

    return () => unsubscribe();
  }, [user, router]);

  const lastPeriod = periodLogs.length > 0 ? periodLogs[0].startDate : null;
  const daysLeft = calculateDaysUntilNextPeriod(lastPeriod);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    if (editId) {
      // Update existing log
      const logRef = doc(db, `users/${user.uid}/periodData`, editId);
      await updateDoc(logRef, {
        startDate: formData.startDate,
        endDate: formData.endDate,
        pads: parseInt(formData.pads, 10),
        flow: formData.flow,
      });
      console.log("Document successfully updated!");
      setEditId(null);
    } else {
      // Add new log
      await addDoc(collection(db, `users/${user.uid}/periodData`), {
        startDate: formData.startDate,
        endDate: formData.endDate,
        pads: parseInt(formData.pads, 10),
        flow: formData.flow,
        createdAt: new Date(),
      });
      console.log("Document successfully written!");
    }

    // Reset form
    setFormData({
      startDate: "",
      endDate: "",
      pads: "",
      flow: "",
    });
    setActiveTab("oldLogs");
  } catch (error) {
    console.error("Error saving document: ", error);
  }
};


  const visibleLogs = showAllLogs ? periodLogs : periodLogs.slice(0, 2);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-row font-inter">
      {/* Sidebar */}
      <aside className="w-1/4 lg:w-1/5 bg-pink-100 p-4 hidden md:flex flex-col shadow-md">
        <h2 className="text-xl font-bold text-pink-800 mb-4">Navigation</h2>
        <Link
          href="/dashboard"
          className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/pcod"
          className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors"
        >
          PCOD Help
        </Link>
        <Link
          href="/dashboard/chatbot"
          className="py-2 px-3 rounded-md text-pink-700 hover:bg-pink-200 transition-colors"
        >
          MediHelp
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h3 className="text-3xl font-bold text-rose-700 mb-6">
          {user?.displayName || user?.email}, Welcome
        </h3>

        

        {/* Logs / Form */}
        <div className="bg-white/40 backdrop-blur-sm rounded-lg p-6 w-full max-w-2xl border border-black shadow-lg">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-4 relative">
            <h4 className="text-2xl font-semibold text-black">Your Logs</h4>
            <div className="flex space-x-4 relative">
              <button
                onClick={() => setActiveTab("oldLogs")}
                className={`text-m font-normal italic text-black capitalize ${
                  activeTab === "oldLogs" ? "z-10" : ""
                }`}
              >
                Old Logs
              </button>
              <button
                onClick={() => setActiveTab("newLog")}
                className={`text-sm font-normal italic text-black capitalize ${
                  activeTab === "newLog" ? "z-10" : ""
                }`}
              >
                New Log
              </button>
              <div
                className={`absolute bottom-0 h-1 bg-pink-400 transition-all duration-500 ease-in-out ${
                  activeTab === "oldLogs"
                    ? "left-0 w-[60px]"
                    : "left-[75px] w-[60px]"
                }`}
              ></div>
            </div>
          </div>

          {activeTab === "oldLogs" ? (
            <>
              <div className="space-y-9">
                {visibleLogs.map((log) => (
                  <div key={log.id} className="relative flex items-center">
                    <div className="w-4 h-4 rounded-full bg-pink-400 absolute left-0 -ml-2 border-2 border-white z-10"></div>
                    <div className="w-0.5 h-full bg-gray-300 absolute left-0 ml-0.5"></div>

                    <div className="pl-8 flex-grow">
                      <p className="font-semibold text-black">
                        <span className="text-pink-600">Started:</span>{" "}
                        {log.startDate}
                      </p>
                      <p className="text-black">
                        <span className="text-pink-600">Ended:</span>{" "}
                        {log.endDate}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="text-pink-600">Number of pads:</span>{" "}
                        {log.pads} 
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="text-pink-600">Flow:</span> {log.flow}
                      </p>
                      {/* Edit + Delete Buttons */}
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => handleEdit(log)}
                          className="px-3 py-1 text-sm bg-slate-800 text-slate-950 rounded-md hover:bg-slate-900 text-white transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="px-3 py-1 text-sm bg-slate-800 text-slate-950 rounded-md hover:bg-slate-900 text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {periodLogs.length > 2 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAllLogs(!showAllLogs)}
                    className="text-pink-600 hover:underline"
                  >
                    {showAllLogs ? "Show less" : "Show more..."}
                  </button>
                </div>
              )}
            </>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 border border-black p-6 rounded-lg bg-white/60 backdrop-blur-sm"
            >
              <h5 className="text-xl font-semibold mb-6 text-black">
                New Log Entry
              </h5>

              <ol className="relative text-gray-500 border-s border-gray-200">
                <li className="mb-10 ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                      formData.startDate
                        ? "bg-green-200"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {formData.startDate ? "✔" : "📅"}
                  </span>
                  <h3 className="font-medium leading-tight">Start Date</h3>
                  <p className="text-sm mb-2">When did your period start?</p>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </li>

                <li className="mb-10 ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                      formData.endDate
                        ? "bg-green-200"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {formData.endDate ? "✔" : "📅"}
                  </span>
                  <h3 className="font-medium leading-tight">End Date</h3>
                  <p className="text-sm mb-2">When did your period end?</p>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </li>

                <li className="mb-10 ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                      formData.duration
                        ? "bg-green-200"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    ⏳
                  </span>
                  <h3 className="font-medium leading-tight">Number of Sanitary pads</h3>
                  
                  <input
                    type="range"
                    id="pads"
                    name="pads"
                    min="1"
                    max="10"
                    value={formData.pads}
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                  <span className="text-sm text-gray-500">
                    {formData.pads} 
                  </span>
                </li>

                <li className="ms-6">
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                      formData.flow
                        ? "bg-green-200"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    📝
                  </span>
                  <h3 className="font-medium leading-tight">Flow Notes</h3>
                  <p className="text-sm mb-2">Add notes about your flow</p>
                  <textarea
                    id="flow"
                    name="flow"
                    rows="3"
                    value={formData.flow}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  ></textarea>
                </li>
              </ol>

              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
              >
                Submit Log
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
