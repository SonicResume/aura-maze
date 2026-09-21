
import { useEffect, useRef, useState } from 'react'

export default function GamePlayer({ slug }) {
  const [game, setGame] = useState(null)
  const [error, setError] = useState('')
  const iframeRef = useRef(null)

  useEffect(() => {
    async function loadGame() {
      try {
        const response = await fetch('/registry.json')
        if (!response.ok) throw new Error('Could not load registry')

        const registry = await response.json()
        const found = registry.games?.find((item) => item.slug === slug)

        if (!found) {
          throw new Error(`Game "${slug}" was not found in the registry`)
        }

        setGame(found)
      } catch (err) {
        setError(err.message || 'Unable to load game')
      }
    }

    loadGame()
  }, [slug])

  function goLibrary() {
    window.location.href = '/library'
  }

  function fullscreen() {
    const iframe = iframeRef.current

    if (!iframe) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
      return
    }

    iframe.requestFullscreen?.()
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#050505',
          color: '#fff',
          padding: 24,
        }}
      >
        <div>
          <h2>Game could not load</h2>
          <p>{error}</p>
          <button onClick={goLibrary}>Back to Library</button>
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#050505',
          color: '#fff',
        }}
      >
        Loading game...
      </div>
    )
  }

  const gameUrl = `/${game.path.replace(/^\/+/, '')}`

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <button
          type="button"
          onClick={goLibrary}
          style={{
            pointerEvents: 'auto',
            padding: '10px 16px',
            border: 0,
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          ← Library
        </button>

        <button
          type="button"
          onClick={fullscreen}
          style={{
            pointerEvents: 'auto',
            padding: '10px 16px',
            border: 0,
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Fullscreen
        </button>
      </div>

      <iframe
        ref={iframeRef}
        title={game.name}
        src={gameUrl}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
          display: 'block',
          background: '#000',
        }}
        allow="autoplay; fullscreen; gamepad"
      />
    </div>
  )
}
