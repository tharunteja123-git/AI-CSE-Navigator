import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import toast from 'react-hot-toast'
import GlassmorphismProfile from '../components/ui/glassmorphism-profile'

export default function Profile() {
  const { user, fetchUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    api.getProfile()
      .then((d) => {
        if (cancelled) return
        if (d?.profile) setProfile(d.profile)
      })
      .catch(() => {
        if (!cancelled) toast.error('Could not load profile')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  // Career Information card → Save
  const handleSaveCareer = async (careerForm) => {
    try {
      const updated = { ...profile, ...careerForm }
      await api.updateProfile(updated)
      setProfile(updated)
      await fetchUser?.()
      toast.success('Career info updated!')
    } catch {
      toast.error('Update failed')
    }
  }

  // Social & Coding Profiles card → Save
  // (component sends the full merged career + social form so nothing is lost)
  const handleSaveSocial = async (fullForm) => {
    try {
      const updated = { ...profile, ...fullForm }
      await api.updateProfile(updated)
      setProfile(updated)
      await fetchUser?.()
      toast.success('Social links updated!')
    } catch {
      toast.error('Update failed')
    }
  }

  return (
    <DashboardLayout>
      <GlassmorphismProfile
        user={user}
        profile={profile}
        loading={loading}
        onSaveCareer={handleSaveCareer}
        onSaveSocial={handleSaveSocial}
      />
    </DashboardLayout>
  )
}