"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Bot,
  Plus,
  ListChecks,
  Trophy,
  Zap,
  TrendingUp,
  Search,
} from "lucide-react";

import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const [statsCards, setStatsCards] = useState([
    {
      icon: <ListChecks size={32} className="text-indigo-600" />,
      title: "Total Interviews",
      value: "0",
    },
    {
      icon: <Trophy size={32} className="text-green-600" />,
      title: "Best Score",
      value: "N/A",
    },
    {
      icon: <TrendingUp size={32} className="text-blue-600" />,
      title: "Improvement Rate",
      value: "0%",
    },
  ]);

  const fetchInterviews = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("User email not found");
      return;
    }

    try {
      const response = await fetch("/api/fetchUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch interview data");
      }

      const data = await response.json();

      // Filter interviews specific to the current user's email
      const userSpecificInterviews = data.userAnswers.filter(
        (interview) =>
          interview.userEmail === user.primaryEmailAddress.emailAddress
      );

      setInterviewData(userSpecificInterviews);

      // Calculate and update stats
      const totalInterviews = userSpecificInterviews.length;
      const bestScore =
        totalInterviews > 0
          ? Math.max(
              ...userSpecificInterviews.map((item) =>
                parseInt(item.rating || "0")
              )
            )
          : 0;
      const improvementRate = calculateImprovementRate(userSpecificInterviews);

      setStatsCards([
        {
          ...statsCards[0],
          value: totalInterviews.toString(),
        },
        {
          ...statsCards[1],
          value: bestScore ? `${bestScore}/10` : "N/A",
        },
        {
          ...statsCards[2],
          value: `${improvementRate}%`,
        },
      ]);

      if (totalInterviews > 0) {
        toast.success(`Loaded ${totalInterviews} interview(s)`);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error(error.message || "Failed to fetch interviews");
    }
  };

  const calculateImprovementRate = (interviews) => {
    if (interviews.length <= 1) return 0;

    const scores = interviews
      .map((interview) => parseInt(interview.rating || "0"))
      .sort((a, b) => a - b);

    const improvement =
      ((scores[scores.length - 1] - scores[0]) / scores[0]) * 100;
    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-8 py-12 max-w-7xl mt-15">
      {/* User Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 space-y-6 sm:space-y-0">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800 flex items-center gap-4 transition-all duration-300 ease-in-out hover:text-indigo-600">
            <Bot className="text-indigo-600" size={40} />
            Dashboard
          </h2>
          <h3 className="text-xl sm:text-2xl text-gray-700 mt-2">
            Welcome,{" "}
            <span className="font-semibold text-indigo-600">
              {user?.fullName || "Interviewer"}
            </span>
          </h3>
        </div>
        <div className="flex items-center gap-6 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
          <span className="text-gray-700 text-sm sm:text-base font-medium">
            {user?.primaryEmailAddress?.emailAddress || "Not logged in"}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 flex items-center space-x-4 cursor-pointer"
          >
            {card.icon}
            <div>
              <p className="text-xs sm:text-sm text-black">{card.title}</p>
              <p className="text-2xl sm:text-3xl font-semibold text-black">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Section */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 rounded-lg mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-6 sm:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-4">
            <Zap size={24} className="text-yellow-500" />
            Create AI Mock Interview
          </h2>
          {/* <button
            onClick={() => setIsNewInterviewModalOpen(true)}
            className="flex items-center bg-indigo-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300 transform cursor-pointer"
          >
            <Plus size={20} className="mr-2" />
            New Interview
          </button> */}
        </div>

        {/* Add New Interview Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <AddNewInterview
            isOpen={isNewInterviewModalOpen}
            onClose={() => setIsNewInterviewModalOpen(false)}
          />
        </div>
      </div>

      {/* Interview History */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
          Interview History
        </h2>

        {/* Conditional rendering */}
        {interviewData && interviewData.length > 0 ? (
          <InterviewList interviews={interviewData} />
        ) : (
          <p className="text-lg text-gray-600 text-center col-span-3 font-medium flex items-center justify-center gap-2 my-4">
            <Search size={24} className="text-gray-500" />
            No interview history available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
