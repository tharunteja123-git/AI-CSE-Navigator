import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api, API_BASE_URL } from '../services/api'
import toast from 'react-hot-toast'
import { Ripple, AuthTabs, TechOrbitDisplay } from '../components/ui/animated-sign-in'

/*
  Install what this template needs (the class library alone won't run without these):
    npm install motion lucide-react clsx tailwind-merge

  Google OAuth assumes your backend has a GET /auth/google route that starts the
  OAuth flow and redirects back into your app with a token. Point API_BASE_URL
  at wherever your backend lives.

  Forgot-password assumes a POST /auth/forgot-password endpoint that accepts
  { email } and always returns 200 (so it doesn't leak which emails exist).
  Add it to services/api.js if it isn't there yet:

    forgotPassword: (email) => http.post('/auth/forgot-password', { email })

  tailwind.config.js and index.css need a few additions for the animations and
  CSS variables this template relies on — see the notes at the end of my reply.
*/

const iconsArray = [
  {
    component: () => (
      <img width={30} height={30} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img width={30} height={30} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 10,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img width={50} height={50} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 210,
    duration: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img width={50} height={50} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 210,
    duration: 20,
    delay: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <img width={30} height={30} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="TailwindCSS" />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img width={30} height={30} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 10,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img width={50} height={50} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 270,
    duration: 20,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img width={50} height={50} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" alt="FastAPI" />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 270,
    duration: 20,
    delay: 60,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <img width={50} height={50} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 320,
    duration: 20,
    delay: 20,
    path: false,
    reverse: false,
  },
]

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorField, setErrorField] = useState('')
  const [loading, setLoading] = useState(false)

  const [forgotOpen, setForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (event, name) => {
    const value = event.target.value
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorField('')
    setLoading(true)
    try {
      const data = await api.login(formData)
      if (data?.access_token) {
        login(data.access_token)
        toast.success('Welcome back! 👋')
        navigate('/dashboard')
      } else {
        setErrorField(data?.detail || 'Login failed — check your credentials.')
      }
    } catch (err) {
      setErrorField(err?.response?.data?.detail || err?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    if (!API_BASE_URL) {
      toast.error('Set VITE_API_URL so Google login knows where your backend is.')
      return
    }
    window.location.href = `${API_BASE_URL}/auth/google`
  }

  const goToForgotPassword = (event) => {
    event.preventDefault()
    setForgotOpen(true)
  }

  const closeForgotModal = () => {
    setForgotOpen(false)
    setForgotSent(false)
    setForgotEmail('')
  }

  const handleForgotSubmit = async (event) => {
    event.preventDefault()
    if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      toast.error('Enter a valid email address.')
      return
    }
    setForgotLoading(true)
    try {
      if (!api.forgotPassword) {
        throw new Error('Add a forgotPassword() method to services/api.js first.')
      }
      await api.forgotPassword(forgotEmail)
      setForgotSent(true)
    } catch (err) {
      toast.error(err?.response?.data?.detail || err?.message || 'Could not send reset email.')
    } finally {
      setForgotLoading(false)
    }
  }

  const formFields = {
    header: 'Welcome back',
    subHeader: 'Sign in to continue your journey',
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: 'Enter your email address',
        onChange: (event) => handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password',
        placeholder: 'Enter your password',
        onChange: (event) => handleInputChange(event, 'password'),
      },
    ],
    submitButton: loading ? 'Signing in…' : 'Sign in',
    textVariantButton: 'Forgot password?',
    errorField,
  }

  return (
    <>
      <section className="flex max-lg:justify-center">
        <span className="hidden lg:flex flex-col justify-center w-1/2 relative">
          <Ripple mainCircleSize={100} />
          <TechOrbitDisplay iconsArray={iconsArray} text="PRO CODE...AI" />
        </span>

        <span className="w-full lg:w-1/2 h-[100dvh] flex flex-col justify-center items-center max-lg:px-[10%]">
          <AuthTabs
            formFields={formFields}
            goTo={goToForgotPassword}
            handleSubmit={handleSubmit}
            onGoogleLogin={handleGoogleLogin}
          />
        </span>
      </section>

      {forgotOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={closeForgotModal}>
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            {!forgotSent ? (
              <>
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">Reset your password</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-5">
                  Enter your email and we'll send you a link to reset it.
                </p>
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <input
                    type="email"
                    autoFocus
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-800 border-none text-black dark:text-white rounded-md px-3 py-2 text-sm focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none"
                    placeholder="you@email.com"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeForgotModal}
                      className="flex-1 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-neutral-700 dark:text-neutral-200 py-2.5 rounded-md text-sm font-medium transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-1 bg-zinc-800 dark:bg-zinc-200 hover:opacity-90 text-white dark:text-black py-2.5 rounded-md text-sm font-semibold transition disabled:opacity-60"
                    >
                      {forgotLoading ? 'Sending…' : 'Send link'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-1.5">Check your inbox</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-5">
                  If an account exists for <span className="font-medium">{forgotEmail}</span>, a reset link is on its way.
                </p>
                <button
                  onClick={closeForgotModal}
                  className="w-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black py-2.5 rounded-md text-sm font-semibold transition"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}