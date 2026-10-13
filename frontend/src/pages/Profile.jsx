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

const handleSaveCareer = async (careerForm) => {
     try {
         // Check if any field in careerForm differs from profile 
          const changed = Object.entries(careerForm).some( ([key, value]) => profile?.[key] !== value )
           if (!changed) { toast('No career changes detected', { icon: 'ℹ️' }) 
            return } const updated = { ...profile, ...careerForm } 
        await api.updateProfile(updated) 
        setProfile(updated) 
        await fetchUser?.() 
        toast.success('Career info updated!') } catch { toast.error('Update failed') } }
const handleSaveSocial = async (fullForm) => {
  try {
    // Social and coding profile fields
    const socialFields = [
      'linkedin',
      'github',
      'leetcode',
      'codeforces',
      'hackerrank',
      'portfolio',
    ]

    // Get fields that actually contain a value
    const providedLinks = Object.entries(fullForm).filter(
      ([key, value]) =>
        socialFields.includes(key) &&
        typeof value === 'string' &&
        value.trim() !== ''
    )

    // Stop if no social/coding links were provided
    if (providedLinks.length === 0) {
      toast.error('Please enter at least one social or coding profile link')
      return
    }

    // Check whether any provided link has changed
    const changed = providedLinks.some(([key, value]) => {
      const oldValue = profile?.[key] ?? ''
      return oldValue.trim() !== value.trim()
    })

    // Stop if all provided links are unchanged
    if (!changed) {
      toast('No social changes detected', { icon: 'ℹ️' })
      return
    }

    // Update only after validation
    const updated = { ...profile, ...fullForm }

    await api.updateProfile(updated)

    setProfile(updated)
    await fetchUser?.()

    toast.success('Social links updated!')
  } catch (error) {
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