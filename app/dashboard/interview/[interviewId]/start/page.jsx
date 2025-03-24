"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Flag, Loader2 } from "lucide-react";
import Link from "next/link";
import QuestionsSection from "./components/QuestionsSection";
import RecordAnswerSection from "./components/RecordAnswerSection";

const StartInterview = () => {
  const params = useParams(); // ✅ Fetch params from useParams hook
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails();
    }
  }, [params]);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSave = (answerRecord) => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <p className="mt-4 text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">No interview questions found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interViewData}
          onAnswerSave={handleAnswerSave}
        />
      </div>
      <div className="flex justify-end gap-4 mt-8">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-green-800 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            Next Question
            <ArrowRight className="h-5 w-5" />
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interViewData?.mockId}/feedback`}>
            <Button className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <Flag className="h-5 w-5" />
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
