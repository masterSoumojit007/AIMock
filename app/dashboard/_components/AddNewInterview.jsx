"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModal";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Loader, PlusCircle, Sparkles, UserCheck, X } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Job Role Suggestions
const JOB_ROLE_SUGGESTIONS = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
];

// Tech Stack Suggestions
const TECH_STACK_SUGGESTIONS = {
  "Full Stack Developer": "React, Node.js, Express, MongoDB, TypeScript",
  "Frontend Developer": "React, Vue.js, Angular, TypeScript, Tailwind CSS",
  "Backend Developer": "Python, Django, Flask, Java Spring, PostgreSQL",
  "Software Engineer": "Java, C++, Python, AWS, Microservices",
  "DevOps Engineer": "Docker, Kubernetes, Jenkins, AWS, Azure",
  "Data Scientist": "Python, TensorFlow, PyTorch, Pandas, NumPy",
  "Machine Learning Engineer": "Python, scikit-learn, Keras, TensorFlow",
  "Cloud Engineer": "AWS, Azure, GCP, Terraform, Kubernetes",
  "Mobile App Developer": "React Native, Flutter, Swift, Kotlin",
  "UI/UX Designer": "Figma, Sketch, Adobe XD, InVision",
};

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Auto-suggest tech stack based on job role
  const autoSuggestTechStack = (role) => {
    const suggestion = TECH_STACK_SUGGESTIONS[role];
    if (suggestion) {
      setJobDescription(suggestion);
      toast.info(`Auto-filled tech stack for ${role}`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}.
    Generate 5 interview questions and answers in JSON format.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();

      const cleanedResponse = responseText
        .replace(/```json\n?|```/g, "")
        .trim();

      const mockResponse = JSON.parse(cleanedResponse);

      const res = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(mockResponse),
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: MockInterview.mockId });

      toast.success("Interview questions generated successfully!");
      router.push(`dashboard/interview/${res[0]?.mockId}`);
    } catch (error) {
      console.error("Error generating interview:", error);
      toast.error("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Add New Button */}
      <div
        className="p-8 border rounded-lg bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 cursor-pointer transition-all duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex items-center space-x-2 justify-center">
          <PlusCircle className="h-6 w-6 text-white" />
          <h1 className="font-semibold text-lg text-center text-white">
            Add New Interview Preparation
          </h1>
        </div>
      </div>

      {/* Dialog Component */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white shadow-xl rounded-lg p-8">
          <DialogHeader>
            <DialogTitle className="font-bold text-3xl text-indigo-600">
              Create Your Interview Preparation
            </DialogTitle>
          </DialogHeader>

          {/* Removed <p> and replaced with a <div> */}
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                {/* Job Role/Position Section */}
                <div className="mt-7">
                  <label className="block text-lg font-semibold text-indigo-600">
                    Job Role/Position
                  </label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      value={jobPosition}
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                      list="jobRoles"
                      className="border-2 rounded-lg px-4 py-3 w-full text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                    />
                    <datalist id="jobRoles">
                      {JOB_ROLE_SUGGESTIONS.map((role) => (
                        <option key={role} value={role} />
                      ))}
                    </datalist>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => autoSuggestTechStack(jobPosition)}
                      disabled={!jobPosition}
                      className="bg-transparent text-indigo-500 hover:bg-indigo-500 hover:text-white p-3 rounded-lg border-2 border-indigo-500 hover:border-indigo-600 transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                      <Sparkles className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Job Description/Tech Stack Section */}
                <div>
                  <label className="block text-lg font-semibold text-indigo-600">
                    Job Description/Tech Stack
                  </label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJs, MySql etc"
                    value={jobDescription}
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="border-2 rounded-lg px-4 py-3 w-full text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 transition duration-300 ease-in-out"
                  />
                </div>

                {/* Years of Experience Section */}
                <div>
                  <label className="block text-lg font-semibold text-indigo-600">
                    Years of Experience
                  </label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    max="70"
                    value={jobExperience}
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                    className="border-2 rounded-lg px-4 py-3 w-full text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 transition duration-300 ease-in-out"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 justify-end mt-8">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setOpenDialog(false)}
                  className="text-white hover:bg-red-700 border border-gray-300 hover:border-gray-400 px-6 py-2 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer"
                >
                  <X /> Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-lg flex items-center transition-all duration-300 ease-in-out cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2" /> Generating
                    </>
                  ) : (
                    <>
                      <UserCheck /> Start Interview
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
