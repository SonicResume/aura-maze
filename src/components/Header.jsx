export default function Header() {
  return (
    <header className="site-header">
      <a className="site-brand" href="/">
        <img src="/logo.png" alt="Aura Maze" />
        <span>AURA MAZE</span>
      </a>

      <nav className="site-nav" aria-label="Main navigation">
        <a href="/library">Game Directory</a>
        <a href="/library?category=arcade">Categories</a>
        <a href="/leaderboards">Leaderboards</a>
      </nav>

      <div className="site-header-actions">
        <a className="header-signin" href="/login">
          Sign In
        </a>
        <a className="header-play" href="/library">
          PLAY GAMES
        </a>
      </div>
    </header>
  )
}
