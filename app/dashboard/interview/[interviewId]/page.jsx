"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Camera, Lightbulb, Play, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { useParams } from "next/navigation"; // Import useParams from next/navigation

function Interview() {
  const { interviewId } = useParams(); // Use useParams to access the interviewId

  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, [interviewId]); // Trigger fetch on interviewId change

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId)); // Use interviewId from params

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        toast.error("Interview details not found");
      }
    } catch (error) {
      toast.error("Error fetching interview details");
      console.error("Interview details fetch error:", error);
    }
  };

  const handleWebcamToggle = () => {
    if (!webCamEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          setWebCamEnabled(true);
          toast.success("Webcam and microphone enabled");
        })
        .catch((error) => {
          toast.error("Failed to access webcam or microphone");
          console.error("Webcam access error:", error);
        });
    } else {
      setWebCamEnabled(false);
    }
  };

  if (!interviewData) {
    return <div>Loading interview details...</div>;
  }

  return (
    <div className="my-16 mt-24">
      <h2 className="font-extrabold text-4xl bg-clip-text text-indigo-600 mt-16 mb-8 ml-1">
        Let's Get Started
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div className="flex flex-col gap-8">
          {/* Job Information */}
          <div className="flex flex-col p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-lg border border-gray-200 gap-6 hover:shadow-2xl transition-all ease-in-out duration-300 transform">
            <h2 className="text-xl font-semibold text-gray-800">
              <strong className="text-indigo-600">
                Job Role/Job Position:{" "}
              </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800">
              <strong className="text-indigo-600">
                Job Description/Tech Stack:{" "}
              </strong>
              {interviewData.jobDesc}
            </h2>
            <h2 className="text-xl font-semibold text-gray-800">
              <strong className="text-indigo-600">Years of Experience: </strong>
              {interviewData.jobExperience}
            </h2>
          </div>

          {/* Information Section */}
          <div className="p-8 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 border border-yellow-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform">
            <h2 className="flex gap-3 items-center text-yellow-700 text-xl font-semibold">
              <Lightbulb className="text-yellow-500" />
              <span className="text-yellow-700">Information</span>
            </h2>
            <h2 className="mt-4 text-yellow-700 text-md leading-relaxed">
              Enable Video Web Cam and Microphone to Start your AI Generated
              Mock Interview. It has 5 questions which you can answer, and we
              will provide a report based on your answers. <br />
              <strong>NOTE:</strong> We never record your video. Webcam access
              can be disabled at any time.
            </h2>
          </div>
        </div>

        {/* Right Section - Webcam */}
        <div className="flex flex-col justify-center items-center gap-8">
          {webCamEnabled ? (
            <Webcam
              mirrored={true}
              style={{
                height: 350,
                width: "auto",
                borderRadius: "15px",
                border: "3px solid #e5e5e5",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease-in-out",
              }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => {
                toast.error("Webcam access error");
                setWebCamEnabled(false);
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 my-7 border-4 rounded-lg w-full p-20 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 shadow-2xl transform transition-all" />

              <Button
                className="w-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 text-white font-semibold py-4 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:via-indigo-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={handleWebcamToggle}
              >
                <Camera /> {/* Add the icon with some margin to the right */}
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-end mt-8">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white font-semibold py-4 px-8 rounded-xl hover:bg-gradient-to-r hover:from-green-700 hover:via-green-800 hover:to-green-900 transition-all shadow-lg flex items-center cursor-pointer">
            <Play className="h-5 w-5" />
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
