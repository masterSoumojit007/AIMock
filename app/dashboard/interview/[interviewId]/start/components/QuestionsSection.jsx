"use client";
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  console.log(
    "🚀 ~ file: QuestionsSection.jsx:4 ~ QuestionsSection ~ mockInterviewQuestion:",
    mockInterviewQuestion
  );
  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestion && (
        <div className="p-6 border border-gray-200 rounded-3xl shadow-xl my-10 bg-gradient-to-br from-white to-slate-50">
          
          {/* Question Number Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {mockInterviewQuestion.map((question, index) => (
              <div
                key={index}
                onClick={() => activeQuestionIndex(index)}
                className={`py-3 text-sm text-center font-semibold rounded-full cursor-pointer transition-all duration-300 border 
                  ${
                    activeQuestionIndex === index
                      ? "bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white shadow-md border-none"
                      : "bg-gray-100 hover:bg-indigo-100 text-gray-800 border-gray-300"
                  }`}
              >
                Question #{index + 1}
              </div>
            ))}
          </div>
      
          {/* Active Question */}
          <div className="flex items-start justify-between gap-3 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
              {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>
            <Volume2
              className="h-6 w-6 text-indigo-600 hover:text-indigo-800 mt-1 cursor-pointer transition-all"
              onClick={() =>
                textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)
              }
            />
          </div>
      
          {/* Info Box */}
          <div className="border-l-4 border-yellow-400 bg-yellow-50 rounded-2xl p-5 mt-10 shadow-sm">
            <div className="flex items-center gap-2 text-yellow-800 font-semibold mb-2">
              <Lightbulb className="h-5 w-5" />
              <span>Important Note</span>
            </div>
            <p className="text-sm text-yellow-900 leading-relaxed">
              🎥 Please enable your <strong>webcam and microphone</strong> to start your AI-powered mock interview. You will be asked <strong>5 questions</strong> and receive a detailed report based on your responses.
              <br />
              🔒 <strong>Privacy Friendly:</strong> Your webcam feed is <u>never recorded</u>. You can disable access anytime.
            </p>
          </div>
        </div>
      )
  );
};

export default QuestionsSection;
