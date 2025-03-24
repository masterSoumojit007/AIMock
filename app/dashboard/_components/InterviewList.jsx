"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Search } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Previous Mock Interview
      </h2>
      {InterviewList.length === 0 ? (
        <p className="text-lg text-gray-600 text-center col-span-3 font-medium flex items-center justify-center gap-2 my-4">
          <Search size={24} className="text-gray-500" />
          No previous interviews found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {InterviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
