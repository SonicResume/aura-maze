import { useState } from 'react'
import { loginUser, registerUser } from '../firebase-config'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    const result =
      mode === 'login'
        ? await loginUser(email, password)
        : await registerUser(email, password)

    setLoading(false)

    if (!result.success) {
      setMessage(result.error)
      return
    }

    setMessage(
      mode === 'login'
        ? 'Welcome back to Aura Maze.'
        : 'Your player account has been created.'
    )
  }

  return (
    <main className="auth-page">
      <div className="auth-page-brand">
        <a href="/">
          <img src="/logo.png" alt="Aura Maze" />
          <span>AURA MAZE</span>
        </a>
      </div>

      <section className="auth-card">
        <div className="card-heading">
          <span>PLAYER ACCOUNT</span>
          <div className="status">
            <i /> ONLINE
          </div>
        </div>

        <h1>{mode === 'login' ? 'Welcome back.' : 'Join the maze.'}</h1>

        <p className="card-subtitle">
          {mode === 'login'
            ? 'Sign in to continue your adventure.'
            : 'Create your free player account.'}
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            EMAIL ADDRESS
            <input
              type="email"
              placeholder="player@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            PASSWORD
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength="6"
              required
            />
          </label>

          <button className="submit" disabled={loading}>
            {loading
              ? 'CONNECTING...'
              : mode === 'login'
                ? 'ENTER AURA MAZE'
                : 'CREATE PLAYER ACCOUNT'}
          </button>
        </form>

        {message && <div className="form-message">{message}</div>}

        <button
          className="mode-switch"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setMessage('')
          }}
        >
          {mode === 'login'
            ? 'New player? Create an account'
            : 'Already registered? Sign in'}
        </button>

        <div className="card-footer">
          <span>SECURE FIREBASE AUTHENTICATION</span>
          <span>●</span>
        </div>
      </section>
    </main>
  )
}
