import { useState } from 'react'
import LibraryPage from "./pages/LibraryPage";
import GamePlayer from "./components/GamePlayer";
import PricingPage from "./pages/Pricing";
import ContactPage from "./pages/Contact";
import TermsPage from "./pages/Terms";
import PrivacyPage from "./pages/Privacy";
import SiteLayout from "./layouts/SiteLayout";
import AccountPage from "./pages/AccountPage.tsx";

import {
  loginUser,
  registerUser,
  loginWithGoogle,
} from './firebase-config'

import './App.css'

const freeGames = [
  {
    name: 'Bubble Wrap Popper',
    category: 'CASUAL',
    path: '/bubble-wrap-popper/index.html',
  },
  {
    name: 'Cyber Chess Tactics',
    category: 'STRATEGY',
    path: '/cyber-chess-tactics/index.html',
  },
  {
    name: 'Cyber Serpent',
    category: 'ARCADE',
    path: '/cyber-serpent-retro-slither/index.html',
  },
  {
    name: 'Dot Dash Neon Nexus',
    category: 'ARCADE',
    path: '/dot-dash-neon-nexus/index.html',
  },
  {
    name: 'Dungeon Glam RPG',
    category: 'RPG',
    path: '/dungeon-glam-rpg/index.html',
  },
  {
    name: 'Frogger Feast Pond Panic',
    category: 'ARCADE',
    path: '/frogger-feast-pond-panic/index.html',
  },
  {
    name: 'Iron Vanguard Tank Blitz',
    category: 'ACTION',
    path: '/iron-vanguard-tank-blitz/index.html',
  },
  {
    name: 'Moto Mayhem Nitro Rush',
    category: 'RACING',
    path: '/moto-mayhem-nitro-rush/index.html',
  },
  {
    name: 'Neon Brick Breaker',
    category: 'ARCADE',
    path: '/neon-brick-breaker/index.html',
  },
  {
    name: 'Neon Sudoku Grid',
    category: 'PUZZLE',
    path: '/neon-sudoku-grid/index.html',
  },
  {
    name: 'Retro Space Invaders',
    category: 'ARCADE',
    path: '/retro-space-invaders/index.html',
  },
  {
    name: 'Rocket Rumble Cosmo Orbit',
    category: 'ARCADE',
    path: '/rocket-rumble-cosmo-orbit/index.html',
  },
  {
    name: 'Shadow Blade Ninja Strike',
    category: 'ACTION',
    path: '/shadow-blade-ninja-strike/index.html',
  },
]
 function LandingPage() {  
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const result =
        mode === 'login'
          ? await loginUser(email, password)
          : await registerUser(email, password)

      if (!result.success) {
        setMessage(result.error || 'Unable to sign in.')
        return
      }

     window.location.href = '/account/'
    } catch (error) {
      setMessage(error.message || 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setMessage('')
    setLoading(true)

    try {
      const result = await loginWithGoogle()

      if (!result.success) {
        setMessage(result.error || 'Google sign-in failed.')
        return
      }

      window.location.href = '/library/'
    } catch (error) {
      setMessage(error.message || 'Google sign-in failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="landing">
      <section className="landing-auth">
        <div className="auth-inner">
          <div className="auth-content">
            <span className="eyebrow">PLAYER ACCESS</span>

            <h1>
              {mode === 'login'
                ? 'Aura Maze.'
                : 'Enter the game.'}
            </h1>

            <p>
              {mode === 'login'
                ? 'Sign in to enjoy over 100 games, scores and achievements.'
                : 'Create your free account and unlock the full Aura Maze library.'}
            </p>

            <button
              className="google-button"
              type="button"
              onClick={handleGoogle}
              disabled={loading}
            >
              <span className="google-mark">G</span>
              Continue with Google
            </button>

            <div className="divider">
              <span>OR CONTINUE WITH EMAIL</span>
            </div>

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
                  minLength={6}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
              </label>

              <button
                className="auth-submit"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? 'CONNECTING...'
                  : mode === 'login'
                    ? 'SIGN IN'
                    : 'CREATE FREE ACCOUNT'}
              </button>
            </form>

            {message && (
              <div className="auth-message">{message}</div>
            )}

            <button
              className="auth-switch"
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setMessage('')
              }}
            >
              {mode === 'login'
                ? 'New to Aura Maze? Create an account'
                : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="auth-bottom">
            <span>SECURE ACCOUNT ACCESS</span>
            <span>© 2026 AURA MAZE</span>
          </div>
        </div>
      </section>

      <section className="landing-world">
        <div className="world-glow" />
        <div className="mist mist-a" />
        <div className="mist mist-b" />

        <div className="world-content">
          <div className="world-top">
            <span className="eyebrow">WELCOME TO AURA MAZE</span>

            <span className="world-status">
              <i /> ONLINE
            </span>
          </div>

          <div className="portal-scene">
            <div className="portal-outer">
              <div className="portal-inner">
                <img
                  className="portal-logo"
                   src="/icons/logo.png"
                  alt="Aura Maze"
                />
              </div>
            </div>

            <div className="rune rune-one">✦</div>
            <div className="rune rune-two">◇</div>
            <div className="rune rune-three">✧</div>
          </div>

          <div className="world-copy">
            <h2>PLAY THE ARCADEK.</h2>
            <p>
              Step inside. Try a game instantly, completely free.
              No account required.
            </p>
          </div>

          <div className="free-games">
            <div className="free-games-heading">
              <span>TRY FOR FREE</span>
              <small>NO ACCOUNT REQUIRED</small>
            </div>

            <div className="free-game-list">
              {freeGames.map((game) => (
                <a
                  className="free-game"
                  href={game.path}
                  key={game.path}
                >
                  <div>
                    <span>{game.category}</span>
                    <strong>{game.name}</strong>
                  </div>
                  <b>PLAY →</b>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="torch torch-left">
          <i />
        </div>

        <div className="torch torch-right">
          <i />
        </div>
      </section>
    </main>
   )
}
export default function App() {
  const path = window.location.pathname

  if (path === '/library' || path === '/library/') {
    return <LibraryPage />
  }

  if (path.startsWith('/play/')) {
    const slug = decodeURIComponent(
      path.replace('/play/', '').replace(/\/+$/, '')
    )

    return <GamePlayer slug={slug} />
  }

  if (path === '/pricing' || path === '/pricing/') {
    return (
      <SiteLayout>
        <PricingPage />
      </SiteLayout>
    )
  }

  if (path === '/contact' || path === '/contact/') {
    return (
      <SiteLayout>
        <ContactPage />
      </SiteLayout>
    )
  }

  if (path === '/terms' || path === '/terms/') {
    return (
      <SiteLayout>
        <TermsPage />
      </SiteLayout>
    )
  }

   if (path === '/privacy' || path === '/privacy/') {
    return (
      <SiteLayout>
        <PrivacyPage />
      </SiteLayout>
    )
  }

if (path === '/account' || path === '/account/') {
  return (
    <SiteLayout>
      <AccountPage />
    </SiteLayout>
  )
}

  return (
    <SiteLayout>
      <LandingPage />
    </SiteLayout>
  )
}
