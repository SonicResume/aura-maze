import { useEffect, useRef, useState } from 'react'

const ARCADE_CSS = `
  html, body {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: #000 !important;
  }

  body {
    display: grid !important;
    place-items: center !important;
  }

  #game,
  #game-container,
  canvas {
    max-width: 100% !important;
    max-height: 100% !important;
  }

  canvas {
    display: block !important;
    margin: auto !important;
  }
`

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

  function normalizeGameViewport() {
    const iframe = iframeRef.current
    if (!iframe) return

    try {
      const doc = iframe.contentDocument
      if (!doc) return

      let style = doc.getElementById('aura-arcade-controller')

      if (!style) {
        style = doc.createElement('style')
        style.id = 'aura-arcade-controller'
        doc.head.appendChild(style)
      }

      style.textContent = ARCADE_CSS
    } catch {
      // Ignore games that don't expose their document.
    }
  }

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

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          background: '#000',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'min(100vw, calc(100vh * 16 / 9))',
            height: 'min(100vh, calc(100vw * 9 / 16))',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <iframe
            ref={iframeRef}
            title={game.name}
            src={gameUrl}
            onLoad={normalizeGameViewport}
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
      </div>
    </div>
  )
}
