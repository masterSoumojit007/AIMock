"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { Mic, StopCircle, Loader2, Camera, CameraOff } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  onAnswerSave,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const recognitionRef = useRef(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    // Speech recognition setup (previous code remains the same)
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          }
        }

        if (finalTranscript.trim()) {
          setUserAnswer((prev) => (prev + " " + finalTranscript).trim());
        }
      };

      recognition.onerror = (event) => {
        toast.error(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const EnableWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
      setWebcamEnabled(true);
      toast.success("Webcam enabled successfully");
    } catch (error) {
      toast.error("Failed to enable webcam", {
        description: "Please check your camera permissions",
      });
      console.error("Webcam error:", error);
    }
  };

  const DisableWebcam = () => {
    const tracks = webcamRef.current?.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
    setWebcamEnabled(false);
  };

  const StartStopRecording = () => {
    // (previous recording logic remains the same)
    if (!recognitionRef.current) {
      toast.error("Speech-to-text not supported");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      toast.info("Recording stopped");
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast.info("Recording started");
    }
  };

  const UpdateUserAnswer = async () => {
    // (previous answer saving logic remains the same)
    if (!userAnswer.trim()) {
      toast.error("Please provide an answer");
      return;
    }

    setLoading(true);

    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please give a rating out of 10 and feedback on improvement in JSON format { "rating": <number>, "feedback": <text> }`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();
      const JsonfeedbackResp = JSON.parse(mockJsonResp);

      const answerRecord = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await db.insert(UserAnswer).values(answerRecord);

      onAnswerSave?.(answerRecord);

      toast.success("Answer recorded successfully");

      setUserAnswer("");
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } catch (error) {
      toast.error("Failed to save answer", {
        description: error.message,
      });
      console.error("Answer save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col relative px-4">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 z-[9999] flex flex-col justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-indigo-600 mb-4" />
          <p className="text-indigo-700 text-lg font-medium">
            Saving your answer...
          </p>
        </div>
      )}

      {/* Webcam Section */}
      <div className="flex flex-col mt-10 mb-16 justify-center items-center bg-white rounded-2xl p-6 shadow-md w-full max-w-md border border-gray-200">
        {webcamEnabled ? (
          <video
            ref={webcamRef}
            autoPlay
            playsInline
            className="w-52 h-52 object-cover rounded-xl border-4 border-indigo-500 shadow-sm"
          />
        ) : (
          <div className="w-52 h-52 flex justify-center items-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">Webcam Disabled</p>
          </div>
        )}

        {/* Toggle Webcam Button */}
        <Button
          variant="outline"
          className="mt-6 border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition-all"
          onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
        >
          {webcamEnabled ? (
            <>
              <CameraOff className="mr-2 h-4 w-4" /> Disable Webcam
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" /> Enable Webcam
            </>
          )}
        </Button>
      </div>

      {/* Record Button */}
      <Button
        disabled={loading}
        variant="outline"
        className={`my-5 px-6 py-4 rounded-xl text-base font-medium shadow-md transition-all ${
          isRecording
            ? "border-red-500 text-red-600 bg-red-50 animate-pulse hover:bg-red-100"
            : "border-indigo-500 text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
        }`}
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="flex items-center gap-2">
            <StopCircle className="h-5 w-5" />
            Stop Recording
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Record Answer
          </span>
        )}
      </Button>

      {/* Textarea for Answer */}
      <textarea
        className="w-full max-w-2xl h-32 p-4 mt-4 border-2 border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        placeholder="Your answer will appear here..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />

      {/* Save Answer Button */}
      <Button
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={UpdateUserAnswer}
        disabled={loading || !userAnswer.trim()}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
