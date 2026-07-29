import { useState } from 'react'
import { api } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import { FiUpload, FiFileText } from 'react-icons/fi'

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('paste')

  const analyze = async () => {
    if (!resumeText.trim()) { toast.error('Please paste your resume text'); return }
    setLoading(true); setResult('')
    const prompt = `You are an expert ATS Resume Analyzer and Career Coach.

Analyze this resume${jobDesc ? ' against the job description' : ''}:

RESUME:
${resumeText}

${jobDesc ? `JOB DESCRIPTION:\n${jobDesc}` : ''}

Provide a detailed analysis with:
1. **ATS Match Score** (0-100) ${jobDesc ? 'for this job description' : ''}
2. **Strengths** - What's good about this resume
3. **Weaknesses** - Critical issues to fix
4. **Missing Keywords** - Important keywords to add
5. **Section-by-Section Review** - Feedback on each section
6. **Rewrite Suggestions** - Specific improvements with examples
7. **Final Verdict** - Is this resume job-ready?

Be specific, actionable, and honest.`

    try {
      const data = await api.chat(prompt)
      setResult(data.response)
    } catch { toast.error('Analysis failed. Check API key.') }
    finally { setLoading(false) }
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">📄 AI Resume Analyzer</h1>
          <p className="text-slate-500 mt-1">Get instant ATS score and improvement suggestions powered by Gemini AI</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="card">
              <h3 className="font-bold text-slate-800 mb-4">Paste Your Resume</h3>
              <textarea value={resumeText} onChange={e => setResumeText(e.target.value)} rows={10}
                className="input resize-none text-xs leading-5 font-mono"
                placeholder="Paste your complete resume text here...&#10;&#10;Include all sections:&#10;- Contact Info&#10;- Summary&#10;- Experience&#10;- Education&#10;- Skills&#10;- Projects" />
            </div>
            <div className="card">
              <h3 className="font-bold text-slate-800 mb-3">Job Description (Optional)</h3>
              <p className="text-slate-500 text-xs mb-3">Add a JD to get ATS match score for that specific role</p>
              <textarea value={jobDesc} onChange={e => setJobDesc(e.target.value)} rows={5}
                className="input resize-none text-xs font-mono"
                placeholder="Paste the job description here for better ATS matching..." />
            </div>
            <button onClick={analyze} disabled={loading} className="btn-primary w-full">
              {loading ? '🔍 Analyzing Resume...' : '✨ Analyze My Resume'}
            </button>
          </div>

          <div className="md:col-span-3">
            {loading ? (
              <div className="card flex flex-col items-center justify-center py-24">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Analyzing your resume...</p>
                <p className="text-slate-400 text-sm mt-2">Checking ATS compatibility, keywords, and structure</p>
              </div>
            ) : result ? (
              <div className="card prose prose-slate max-w-none overflow-y-auto" style={{ maxHeight: '80vh' }}>
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-24 text-center">
                <FiFileText className="text-5xl text-slate-300 mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">Ready to Analyze</h3>
                <p className="text-slate-500 text-sm max-w-xs">Paste your resume on the left and click analyze. You'll get ATS score, keyword gaps, and specific improvement tips.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
