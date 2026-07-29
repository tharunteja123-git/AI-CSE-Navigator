import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import toast from 'react-hot-toast'
import { FiEdit2, FiSave, FiX } from 'react-icons/fi'

export default function Profile() {
  const { user, fetchUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    current_year: '', career_goal: '', skill_level: '',
    languages: '', dsa_level: '', study_hours: '',
    learning_style: '', interests: ''
  })

  useEffect(() => {
    api.getProfile().then(d => {
      if (d.profile) { setProfile(d.profile); setForm(d.profile) }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.updateProfile(form)
      setProfile(form)
      setEditing(false)
      toast.success('Profile updated!')
    } catch { toast.error('Update failed') }
    finally { setSaving(false) }
  }

  const set = (k, v) => setForm(f => ({...f, [k]: v}))

  const Field = ({ label, k, type = 'text', opts }) => (
    <div>
      <label className="label">{label}</label>
      {editing ? (
        opts ? (
          <select value={form[k]} onChange={e => set(k, e.target.value)} className="select">
            {opts.map(o => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input value={form[k] || ''} onChange={e => set(k, e.target.value)} className="input" />
        )
      ) : (
        <div className="px-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-slate-200">
          {form[k] || <span className="text-slate-400">Not set</span>}
        </div>
      )}
    </div>
  )

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">👤 My Profile</h1>
          <p className="text-slate-500 mt-1">Your personal and academic information</p>
        </div>

        {/* User info */}
        <div className="card mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {user?.full_name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user?.full_name}</h2>
              <p className="text-slate-500 text-sm">{user?.email}</p>
              <div className="flex gap-2 mt-2">
                {user?.college && <span className="badge bg-indigo-50 text-indigo-700 text-xs">🏫 {user.college}</span>}
                {user?.graduation_year && <span className="badge bg-green-50 text-green-700 text-xs">🎓 {user.graduation_year}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Profile details */}
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">Academic & Career Profile</h3>
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(false); setForm(profile || {}) }}
                    className="flex items-center gap-1 text-slate-500 hover:text-red-500 text-sm border border-slate-200 px-3 py-1.5 rounded-lg">
                    <FiX /> Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-1 btn-primary text-sm py-1.5 px-3">
                    <FiSave /> {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm border border-indigo-200 px-3 py-1.5 rounded-lg">
                  <FiEdit2 /> Edit
                </button>
              )}
            </div>

            {profile || editing ? (
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Current Year" k="current_year" opts={['1st Year','2nd Year','3rd Year','4th Year','Fresher / Graduate']} />
                <Field label="Career Goal" k="career_goal" opts={['AI Engineer','Full Stack Developer','Backend Developer','Frontend Developer','DevOps Engineer','Data Scientist','Cybersecurity','Mobile Developer']} />
                <Field label="Skill Level" k="skill_level" opts={['Beginner','Elementary','Intermediate','Advanced']} />
                <Field label="DSA Level" k="dsa_level" opts={['None','Basic Arrays/Strings','Intermediate (DP, Trees)','Advanced (Graphs, Segment Trees)']} />
                <Field label="Programming Languages" k="languages" />
                <Field label="Study Hours/Day" k="study_hours" opts={['1-2 hours','2-4 hours','4-6 hours','6+ hours']} />
                <Field label="Learning Style" k="learning_style" opts={['Video Tutorials','Reading Docs','Hands-on Projects','Mixed']} />
                <Field label="Interests" k="interests" />
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500 mb-4">No profile setup yet</p>
                <a href="/onboarding" className="btn-primary inline-flex">Setup Profile →</a>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
