import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function InterviewRoom() {
  const [question] = useState({
    category: "Project",
    difficulty: "Medium",
    title: "Explain your AI CSE Navigator project.",
    expectedTime: "2 Minutes",
    skills: ["FastAPI", "React", "PostgreSQL"],
  });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 p-6">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow border p-5 mb-6 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              AI Interview
            </h1>

            <p className="text-slate-500">
              AI Engineer • Accenture
            </p>
          </div>

          <div className="flex gap-8">

            <div>
              <p className="text-xs text-slate-500">
                Question
              </p>

              <h2 className="font-bold">
                3 / 15
              </h2>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Time
              </p>

              <h2 className="font-bold">
                08:42
              </h2>
            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left */}

          <div className="lg:col-span-3">

            <div className="bg-white rounded-2xl shadow border p-6">

              <h2 className="font-bold text-lg mb-4">
                Interview Progress
              </h2>

              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">

                <div
                  className="bg-indigo-600 h-full"
                  style={{ width: "40%" }}
                />

              </div>

              <div className="mt-6 space-y-4">

                <div>

                  <p className="text-xs text-slate-400">
                    Current Topic
                  </p>

                  <h3 className="font-semibold">
                    Project Discussion
                  </h3>

                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Difficulty
                  </p>

                  <h3 className="font-semibold">
                    Medium
                  </h3>

                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Upcoming
                  </p>

                  <ul className="text-sm mt-2 space-y-2">

                    <li>✔ Resume</li>

                    <li>✔ Projects</li>

                    <li>⬜ Python</li>

                    <li>⬜ SQL</li>

                    <li>⬜ HR</li>

                    <li>⬜ AI</li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

          {/* Center */}

          <div className="lg:col-span-6">

            <div className="bg-white rounded-2xl shadow border p-8">

              <div className="flex flex-col items-center">

                <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-6xl">

                  🤖

                </div>

                <h2 className="text-xl font-bold mt-5">
                  AI Interviewer
                </h2>

              </div>

              <div className="mt-8 rounded-xl bg-slate-50 border p-6">

                <div className="flex justify-between">

                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">

                    {question.category}

                  </span>

                  <span className="text-sm text-slate-500">

                    {question.expectedTime}

                  </span>

                </div>

                <h2 className="text-2xl font-bold mt-6">

                  {question.title}

                </h2>

                <div className="mt-6">

                  <p className="font-semibold mb-3">

                    Skills Being Tested

                  </p>

                  <div className="flex flex-wrap gap-3">

                    {question.skills.map(skill => (

                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-slate-100"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

              <textarea
                rows="8"
                placeholder="Type your answer here..."
                className="w-full mt-8 rounded-xl border p-5 resize-none"
              />

              <div className="flex gap-3 mt-6">

                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl">
                  Submit Answer
                </button>

                <button className="px-6 py-3 border rounded-xl">
                  🎤 Speak
                </button>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="lg:col-span-3">

            <div className="bg-white rounded-2xl shadow border p-6">

              <h2 className="font-bold text-lg mb-6">
                Live AI Feedback
              </h2>

              {[
                ["Confidence", 82],
                ["Communication", 76],
                ["Grammar", 91],
                ["Technical Accuracy", 84],
              ].map(([title, score]) => (

                <div className="mb-5" key={title}>

                  <div className="flex justify-between mb-1">

                    <span>{title}</span>

                    <span>{score}%</span>

                  </div>

                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-indigo-600"
                      style={{ width: `${score}%` }}
                    />

                  </div>

                </div>

              ))}

              <div className="mt-8">

                <h3 className="font-semibold mb-3">
                  AI Suggestions
                </h3>

                <ul className="text-sm text-slate-600 space-y-2">

                  <li>• Add project architecture.</li>

                  <li>• Mention JWT Authentication.</li>

                  <li>• Explain deployment.</li>

                  <li>• Give one real example.</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}