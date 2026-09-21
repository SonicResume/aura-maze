import React, { useEffect, useMemo, useState } from "react";
import SiteLayout from "../layouts/SiteLayout";

const CATEGORY_META = {
  puzzle: {
    label: "Puzzle",
    emoji: "🧩",
    accent: "amber",
    art:
      "from-amber-950/80 via-[#15100b] to-black",
    glow: "bg-amber-400/10",
    border: "border-amber-400/20",
    badge: "bg-amber-400/10 text-amber-200 border-amber-400/20",
    hover: "hover:border-amber-400/35",
  },

  arcade: {
    label: "Arcade",
    emoji: "🕹️",
    accent: "orange",
    art:
      "from-orange-950/75 via-[#160d09] to-black",
    glow: "bg-orange-400/10",
    border: "border-orange-400/20",
    badge: "bg-orange-400/10 text-orange-200 border-orange-400/20",
    hover: "hover:border-orange-400/35",
  },

  shooter: {
    label: "Shooter",
    emoji: "🎯",
    accent: "red",
    art:
      "from-red-950/70 via-[#160a0c] to-black",
    glow: "bg-red-400/10",
    border: "border-red-400/20",
    badge: "bg-red-400/10 text-red-200 border-red-400/20",
    hover: "hover:border-red-400/35",
  },

  racing: {
    label: "Racing",
    emoji: "🏎️",
    accent: "cyan",
    art:
      "from-cyan-950/65 via-[#081317] to-black",
    glow: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    badge: "bg-cyan-400/10 text-cyan-200 border-cyan-400/20",
    hover: "hover:border-cyan-400/35",
  },

  sports: {
    label: "Sports",
    emoji: "⚽",
    accent: "emerald",
    art:
      "from-emerald-950/65 via-[#08130d] to-black",
    glow: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    badge:
      "bg-emerald-400/10 text-emerald-200 border-emerald-400/20",
    hover: "hover:border-emerald-400/35",
  },

  platformer: {
    label: "Platformer",
    emoji: "🏃",
    accent: "violet",
    art:
      "from-violet-950/65 via-[#100b16] to-black",
    glow: "bg-violet-400/10",
    border: "border-violet-400/20",
    badge:
      "bg-violet-400/10 text-violet-200 border-violet-400/20",
    hover: "hover:border-violet-400/35",
  },

  casual: {
    label: "Casual",
    emoji: "🎈",
    accent: "pink",
    art:
      "from-pink-950/60 via-[#150a11] to-black",
    glow: "bg-pink-400/10",
    border: "border-pink-400/20",
    badge:
      "bg-pink-400/10 text-pink-200 border-pink-400/20",
    hover: "hover:border-pink-400/35",
  },

  board: {
    label: "Board",
    emoji: "♟️",
    accent: "stone",
    art:
      "from-stone-800/70 via-[#121110] to-black",
    glow: "bg-stone-300/10",
    border: "border-stone-300/20",
    badge:
      "bg-stone-300/10 text-stone-200 border-stone-300/20",
    hover: "hover:border-stone-300/35",
  },

  "word-quiz": {
    label: "Words & Quiz",
    emoji: "📝",
    accent: "yellow",
    art:
      "from-yellow-950/65 via-[#151208] to-black",
    glow: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    badge:
      "bg-yellow-400/10 text-yellow-200 border-yellow-400/20",
    hover: "hover:border-yellow-400/35",
  },

  "3d": {
    label: "3D",
    emoji: "🌐",
    accent: "sky",
    art:
      "from-sky-950/65 via-[#081116] to-black",
    glow: "bg-sky-400/10",
    border: "border-sky-400/20",
    badge:
      "bg-sky-400/10 text-sky-200 border-sky-400/20",
    hover: "hover:border-sky-400/35",
  },
};

const GAME_ICONS = {
  "2048": "🔢",
  "6-octagons": "⬡",
  "6oct": "⬡",
  "rock-paper-scissors": "✊",
  sudoku: "🔢",
  abhita: "✨",
  "alien-battle": "👾",
  "anti-gravity": "🪐",
  antigravity: "🪐",
  archer: "🏹",
  "balance-stack": "🏗️",
  basketball: "🏀",
  "bird-shooter": "🐦",
  "bomb-blast": "💣",
  "boom-dots": "💥",
  bowling: "🎳",
  breakoid: "🧱",
  "bubble-pop": "🫧",
  "bubble-shooter": "🔵",
  "bug-smasher": "🐞",
  buttermilk: "🥛",
  "candy-crush": "🍬",
  "candy-crusher": "🍭",
  "cannon-blaster": "💥",
  "cargo-stack": "📦",
  "car-race": "🏎️",
  carrom: "🎯",
  chess: "♟️",
  "circle-path": "⭕",
  "circuit-bulb": "💡",
  "catch-me-if-you-can": "🏃",
  collector: "💎",
  "color-dash": "🌈",
  "colour-pour": "🎨",
  connected: "🔗",
  "cool-platformer": "🏃",
  "cosmic-cleaner": "🌌",
  "cricket-1-2-3": "🏏",
  "crossy-road": "🚦",
  "crowd-control": "👥",
  "curve-snake": "🐍",
  "cut-the-rope": "✂️",
  "cut-rope": "✂️",
  demon: "😈",
  "devil-king": "👑",
  "dodge-enemy": "💨",
  "dodge-master": "⚡",
  "doodle-jump": "⬆️",
  "dream-weaver": "🌙",
  "endless-mafia": "🕶️",
  "endless-runner": "🏃",
  "fighter-fury": "🥊",
  "fighter-jet": "✈️",
  flappy: "🐤",
  "flip-jump": "🔄",
  "fly-monkey": "🐒",
  football: "⚽",
  "forest-runner": "🌲",
  "four-dots": "🔵",
  "fruit-basket": "🍎",
  "fruit-cosmics": "🍉",
  "fruit-merge": "🍊",
  "luma-bounce": "✨",
  lumabounce: "✨",
  "glass-step": "🪟",
  gunman: "🔫",
  "gun-run": "🎯",
  "hex-puzzle": "⬡",
  "hungry-player": "🍔",
  "jump-dot": "🔴",
  "kaiju-krush": "👹",
  "laser-bounce": "🔦",
  link: "🔗",
  ludo: "🎲",
  "mario-like": "🍄",
  mario: "🍄",
  "math-quest": "➗",
  memory: "🧠",
  "memory-cards": "🃏",
  "number-merge": "🔢",
  "one-car": "🚗",
  "orbital-outpost": "🛰️",
  "pac-man": "👻",
  pacman: "👻",
  pairing: "🔗",
  parkour: "🤸",
  pathfinder: "🧭",
  "perfect-square": "⬛",
  pirates: "🏴‍☠️",
  "planet-visitor": "🪐",
  "planet-war": "🌍",
  "projectile-enemy": "🎯",
  quiz: "❓",
  "red-light": "🔴",
  "green-light": "🟢",
  "road-cross": "🚸",
  "road-fighter": "🚘",
  "robot-destruction": "🤖",
  "screw-master": "🔩",
  "shadow-runner": "🥷",
  "shadow-shooter": "🎯",
  "shape-collector": "🔷",
  "shape-fitter": "🔶",
  "shoot-enemy": "🎯",
  shooter: "🎯",
  "signal-circuit": "📡",
  "sky-high": "☁️",
  "slide-puzzle": "🧩",
  snake: "🐍",
  "snake-ladder": "🐍",
  "snake-and-ladder": "🐍",
  sniper: "🎯",
  "space-fighter": "🚀",
  spaceman: "👨‍🚀",
  "space-waves": "🌊",
  "square-one": "⬛",
  "stack-tower": "🏢",
  "stick-game": "🥢",
  "stick-toss": "🎯",
  "straight-rush": "⚡",
  "survival-run": "🏃",
  survivor: "🛡️",
  "table-tennis": "🏓",
  "tap-target": "🎯",
  "tee-shooter": "🎯",
  tetris: "🟦",
  "that-level-again-1": "🔁",
  "that-level-again-2": "🔁",
  "that-level-again-3": "🔁",
  "that-level-again-4": "🔁",
  "that-level-again-5": "🔁",
  "thunder-god": "⚡",
  "tic-tac-toe": "❌",
  "tile-tap": "🟦",
  "tower-shooter": "🏰",
  "trench-defence": "🛡️",
  "two-cars": "🚗",
  "two-cars-ai": "🤖",
  unruly: "😵",
  "vaccine-shooter": "💉",
  "whack-a-bug": "🪰",
  wordle: "🔤",
  wordlee: "🔤",
  "words-of-wonder": "📚",
  "penalty-shootout": "🥅",
  penalty: "🥅",
  "swipe-assassin": "🥷",
  "level-devil": "😈",
  "line-trap": "〰️",
  "window-shooter": "🎯",
};

const fallbackMeta = {
  label: "Game",
  emoji: "🎮",
  accent: "neutral",
  art: "from-zinc-900 via-[#111] to-black",
  glow: "bg-white/5",
  border: "border-white/10",
  badge: "bg-white/5 text-zinc-300 border-white/10",
  hover: "hover:border-white/20",
};

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getMeta(game) {
  return CATEGORY_META[game?.category] || fallbackMeta;
}

function getIcon(game) {
  const slug = String(game?.slug || "").toLowerCase();
  const nameSlug = slugify(game?.name);

  return (
    GAME_ICONS[slug] ||
    GAME_ICONS[nameSlug] ||
    getMeta(game).emoji
  );
}

function GameArt({ game, large = false }) {
  const meta = getMeta(game);

  return (
    <div
      className={`group/art relative flex h-full min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br ${meta.art} ${
        large ? "min-h-[350px]" : ""
      }`}
    >
      {/* Soft category atmosphere */}
      <div
        className={`absolute -left-20 -top-20 h-56 w-56 rounded-full blur-3xl ${meta.glow} transition duration-700 group-hover/art:scale-125`}
      />

      <div
        className={`absolute -bottom-20 -right-20 h-56 w-56 rounded-full blur-3xl ${meta.glow} transition duration-700 group-hover/art:scale-125`}
      />

      {/* Moving light */}
      <div
        className={`absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-white/[0.035] blur-2xl transition-transform duration-1000 ease-out group-hover/art:translate-x-[500%]`}
      />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* Category mark */}
      <div className="absolute bottom-4 left-4 text-[10px] font-black uppercase tracking-[0.25em] text-white/20">
        {meta.label}
      </div>

      {/* Game icon */}
      <span
        className={`relative z-10 select-none drop-shadow-[0_20px_30px_rgba(0,0,0,.75)] transition duration-500 ease-out group-hover/art:scale-110 group-hover/art:-rotate-2 ${
          large
            ? "text-8xl md:text-[9rem]"
            : "text-7xl"
        }`}
        aria-hidden="true"
      >
        {getIcon(game)}
      </span>

      {/* Bronze edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b98a5a]/30 to-transparent" />
    </div>
  );
}

function GameCard({ game, onPlay, index }) {
  const meta = getMeta(game);

  return (
    <button
      type="button"
      onClick={() => onPlay(game)}
      style={{
        animationDelay: `${Math.min(index * 45, 450)}ms`,
      }}
      className={`group w-full overflow-hidden rounded-2xl border ${meta.border} bg-[#0e0c0d] text-left shadow-xl shadow-black/25 backdrop-blur transition-all duration-300 ease-out animate-[libraryCardIn_.55s_ease-out_both] hover:-translate-y-1 ${meta.hover} hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#b98a5a]/40`}
    >
      <div className="relative overflow-hidden">
        <GameArt game={game} />

        <span
          className={`absolute left-3 top-3 rounded-full border px-3 py-1.5 text-xs font-bold backdrop-blur-md ${meta.badge}`}
        >
          {meta.emoji} {meta.label}
        </span>

        <span className="absolute bottom-3 right-3 translate-y-2 rounded-lg border border-[#b98a5a]/30 bg-black/75 px-3 py-2 text-xs font-black text-[#d3a875] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
          ▶ Play
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3">
          <h3 className="min-w-0 flex-1 truncate text-base font-bold text-white">
            {game.name}
          </h3>

          <span className="text-xl font-bold text-[#8f6948] transition duration-300 group-hover:translate-x-1 group-hover:text-[#d3a875]">
            →
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
          {game.description ||
            `Play ${game.name} in your browser.`}
        </p>
      </div>
    </button>
  );
}

export default function LibraryPage() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("library");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadGames() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/registry.json", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Registry returned ${response.status}`
          );
        }

        const data = await response.json();

        if (!alive) return;

        setGames(
          Array.isArray(data.games)
            ? data.games
            : []
        );

        setCategories(
          Array.isArray(data.categories)
            ? data.categories
            : []
        );
      } catch (err) {
        if (alive) {
          setError(
            err?.message ||
              "Unable to load games."
          );
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    }

    loadGames();

    return () => {
      alive = false;
    };
  }, []);

  const categoryList = useMemo(() => {
    const fromRegistry = categories
      .map((category) => {
        if (typeof category === "string") {
          return category;
        }

        return (
          category?.slug ||
          category?.id ||
          category?.name
        );
      })
      .filter(Boolean);

    const fromGames = games
      .map((game) => game.category)
      .filter(Boolean);

    return [
      ...new Set([
        ...fromRegistry,
        ...fromGames,
      ]),
    ];
  }, [categories, games]);

  const filteredGames = useMemo(() => {
    const text = query.trim().toLowerCase();

    const result = games.filter((game) => {
      const categoryMatch =
        activeCategory === "all" ||
        game.category === activeCategory;

      if (!categoryMatch) return false;

      if (!text) return true;

      return [
        game.name,
        game.slug,
        game.category,
        game.description,
        ...(game.tags || []),
        ...(game.tech || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(text);
    });

    if (sort === "name") {
      result.sort((a, b) =>
        String(a.name).localeCompare(
          String(b.name)
        )
      );
    }

    return result;
  }, [
    games,
    query,
    activeCategory,
    sort,
  ]);

  function playGame(game) {
    if (!game?.slug) return;

    window.location.href =
      `/play/${encodeURIComponent(game.slug)}`;
  }

  const featured = games[0];

 return (
  <SiteLayout>
    <div className="min-h-screen overflow-hidden bg-[#080707] text-white">
      {/* Animation keyframes — page-local, no CSS file */}
      <style>{`
        @keyframes libraryCardIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes libraryFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes libraryFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes libraryShimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1380px] px-4 py-10 md:px-8 md:py-14">

        {/* Header */}
        <header
          className="mb-9 animate-[libraryFadeUp_.6s_ease-out_both]"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#b98a5a]" />

            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c99a63]">
              Aura Maze Library
            </p>
          </div>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
            Choose your game.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 md:text-lg">
            Find something that fits your mood and
            jump straight into the action.
          </p>
        </header>

        {/* Featured */}
        {!loading && !error && featured && (
          <section
            className="group/featured relative mb-9 grid overflow-hidden rounded-3xl border border-[#b98a5a]/20 bg-[#0d0b0b] shadow-2xl shadow-black/50 animate-[libraryFadeUp_.7s_.08s_ease-out_both] lg:grid-cols-[1fr_1fr]"
          >
            {/* Featured copy */}
            <div className="relative z-10 flex flex-col justify-center p-7 md:p-12">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#b98a5a]/30 bg-[#b98a5a]/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#d3a875]">
                  ✦ Featured
                </span>

                <span className="text-xs font-semibold text-zinc-600">
                  {getMeta(featured).label}
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl">
                {featured.name}
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-zinc-500">
                {featured.description ||
                  "Ready when you are. Start playing now."}
              </p>

              <button
                type="button"
                onClick={() =>
                  playGame(featured)
                }
                className="mt-7 w-fit rounded-xl border border-[#d3a875]/30 bg-[#9a6a3f] px-6 py-3.5 font-black text-white shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ad7a49] hover:shadow-[#9a6a3f]/20"
              >
                ▶ Play Now
              </button>
            </div>

            {/* Featured art */}
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[350px]">
              <GameArt
                game={featured}
                large
              />

              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0d0b0b] to-transparent lg:w-32" />
            </div>

            {/* Bronze shimmer */}
            <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 rotate-12 bg-white/[0.035] blur-2xl transition-transform duration-[1400ms] group-hover/featured:translate-x-[650%]" />
          </section>
        )}

        {/* Search */}
        <div
          className="mb-4 flex flex-col gap-3 md:flex-row animate-[libraryFadeUp_.6s_.15s_ease-out_both]"
        >
          <label className="relative min-w-0 flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-700">
              ⌕
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search games..."
              className="h-12 w-full rounded-xl border border-white/10 bg-[#0d0b0c] pl-11 pr-4 text-white outline-none placeholder:text-zinc-700 transition focus:border-[#b98a5a]/50 focus:ring-2 focus:ring-[#b98a5a]/10"
            />
          </label>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="h-12 rounded-xl border border-white/10 bg-[#0d0b0c] px-4 text-sm font-semibold text-zinc-400 outline-none focus:border-[#b98a5a]/50 focus:ring-2 focus:ring-[#b98a5a]/10 md:w-48"
          >
            <option value="library">
              Library order
            </option>

            <option value="name">
              Name A–Z
            </option>
          </select>
        </div>

        {/* Categories */}
        <div
          className="mb-8 flex gap-2 overflow-x-auto pb-2 animate-[libraryFadeUp_.6s_.2s_ease-out_both]"
        >
          <button
            type="button"
            onClick={() =>
              setActiveCategory("all")
            }
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition-all duration-300 ${
              activeCategory === "all"
                ? "border-[#b98a5a]/60 bg-[#b98a5a]/15 text-[#d3a875]"
                : "border-white/10 bg-white/[0.025] text-zinc-500 hover:border-white/20 hover:text-zinc-300"
            }`}
          >
            🎮 All
          </button>

          {categoryList.map((item) => {
            const meta = getMeta({
              category: item,
            });

            return (
              <button
                type="button"
                key={item}
                onClick={() =>
                  setActiveCategory(item)
                }
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition-all duration-300 ${
                  activeCategory === item
                    ? `${meta.border} ${meta.bg || "bg-white/10"} ${meta.text || "text-white"}`
                    : `${meta.border} bg-white/[0.02] text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-300`
                }`}
              >
                {meta.emoji} {meta.label}
              </button>
            );
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-[#0d0b0c] px-5 py-16 text-center text-zinc-600">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#b98a5a]" />

            Loading your games…
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-5 py-16 text-center text-red-400">
            <strong>
              Could not load the game library.
            </strong>

            <div className="mt-2 text-sm text-red-400/70">
              {error}
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredGames.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#0d0b0c] px-5 py-16 text-center text-zinc-600">
              <div
                className="mb-3 text-4xl animate-[libraryFloat_2.5s_ease-in-out_infinite]"
              >
                🔎
              </div>

              <strong className="text-zinc-300">
                No games found.
              </strong>

              <div className="mt-2 text-sm">
                Try another search or category.
              </div>
            </div>
          )}

        {/* Games */}
        {!loading &&
          !error &&
          filteredGames.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredGames.map(
                (game, index) => (
                  <GameCard
                    key={
                      game.slug ||
                      game.path ||
                      game.name
                    }
                    game={game}
                    index={index}
                    onPlay={playGame}
                  />
                )
              )}
            </div>
          )}

        {/* Bottom accent */}
        {!loading &&
          !error &&
          filteredGames.length > 0 && (
            <div className="mx-auto mt-12 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#9a6a3f]/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">
                Aura Maze
              </span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#9a6a3f]/40" />
            </div>
          )}
     </div>
    </div>
  </SiteLayout>
  );
}