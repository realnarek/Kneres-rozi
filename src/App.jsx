import { useCallback, useMemo, useState } from 'react'

const HEART_COLORS = ['#FF8FAB', '#FFC2D6', '#FF5C8A', '#FFB3C6']

function rand(min, max) {
  return Math.random() * (max - min) + min
}

/** Ambient hearts that continuously rise from the bottom of the screen. */
function AmbientHearts({ count = 14 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: rand(2, 96),
        size: rand(14, 30),
        duration: rand(9, 17),
        delay: rand(0, 14),
        drift: rand(-60, 60),
        spin: rand(-30, 30),
        color: HEART_COLORS[i % HEART_COLORS.length],
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="animate-rise-heart absolute bottom-0 select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            color: h.color,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`,
            '--spin': `${h.spin}deg`,
            filter: 'drop-shadow(0 0 6px rgba(255,140,170,0.5))',
          }}
        >
          ❤
        </span>
      ))}
    </div>
  )
}

/** Small plush bears that gently bob, rotate, and drift in place. */
function FloatingBears() {
  const bears = useMemo(
    () => [
      { top: '8%', left: '6%', size: 46, duration: 6.5, r1: -8, r2: 8 },
      { top: '14%', left: '84%', size: 38, duration: 7.5, r1: 6, r2: -6 },
      { top: '68%', left: '4%', size: 34, duration: 8, r1: -5, r2: 9 },
      { top: '76%', left: '88%', size: 44, duration: 6, r1: 8, r2: -8 },
      { top: '42%', left: '92%', size: 28, duration: 9, r1: -6, r2: 6 },
      { top: '38%', left: '2%', size: 26, duration: 7, r1: 5, r2: -5 },
    ],
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden sm:block">
      {bears.map((b, i) => (
        <span
          key={i}
          className="animate-bob-bear absolute select-none opacity-80"
          style={{
            top: b.top,
            left: b.left,
            fontSize: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            '--r1': `${b.r1}deg`,
            '--r2': `${b.r2}deg`,
            filter: 'drop-shadow(0 6px 10px rgba(178,58,92,0.18))',
          }}
        >
          🧸
        </span>
      ))}
    </div>
  )
}

/** Hearts that burst outward from the button on tap. */
function BurstHearts({ hearts }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 z-30">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="animate-burst-heart absolute select-none"
          style={{
            fontSize: `${h.size}px`,
            color: h.color,
            '--bx': `${h.bx}px`,
            '--by': `${h.by}px`,
            '--br': `${h.br}deg`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [bounce, setBounce] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [burst, setBurst] = useState([])

  const handleForgive = useCallback(() => {
    setBounce(true)
    setShowBadge(true)
    setTimeout(() => setBounce(false), 900)
    setTimeout(() => setShowBadge(false), 1400)

    const newHearts = Array.from({ length: 18 }).map(() => ({
      id: Math.random().toString(36).slice(2),
      size: rand(16, 30),
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      bx: rand(-170, 170),
      by: rand(-220, -60),
      br: rand(-40, 40),
    }))
    setBurst((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setBurst((prev) => prev.filter((h) => !newHearts.some((n) => n.id === h.id)))
    }, 1200)
  }, [])

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush via-petal to-rose px-4 py-10">
      <AmbientHearts />
      <FloatingBears />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <h1
          className="font-display px-2 text-[13vw] font-extrabold leading-none tracking-tight text-berry drop-shadow-[0_4px_18px_rgba(255,92,138,0.45)] sm:text-6xl md:text-7xl"
          style={{ textShadow: '0 0 26px rgba(255,255,255,0.6)' }}
        >
          ԿՆԵՐԵՍ
          <span className="ml-1 align-middle">🥺</span>
        </h1>

        <div className="relative mt-6 flex w-full items-center justify-center sm:mt-8">
          <div className="animate-pulse-glow absolute h-[70%] w-[70%] rounded-full bg-rose/60 blur-3xl" />
          <img
            src="/teddy.png"
            alt="Խնդրում եմ ներիր ինձ՝ ես բերել եմ ծաղիկներ"
            className={`relative z-10 w-[78%] max-w-[340px] rounded-[2rem] object-cover shadow-glow sm:max-w-[380px] ${
              bounce ? 'animate-cute-bounce' : ''
            }`}
            draggable="false"
          />

          {showBadge && (
            <span className="animate-pop-in absolute -top-2 right-2 z-20 rounded-full bg-white/70 px-3 py-1.5 text-xl shadow-soft backdrop-blur-md sm:right-6">
              🥺❤️
            </span>
          )}
        </div>

        <div className="relative mt-8 sm:mt-10">
          <BurstHearts hearts={burst} />
          <button
            onClick={handleForgive}
            className="relative z-10 rounded-full border border-white/60 bg-white/30 px-10 py-4 text-xl font-bold text-plum shadow-soft backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/50 hover:shadow-glow active:scale-95 sm:px-12 sm:py-5 sm:text-2xl"
          >
            ԿՆԵՐԵՍ🥺 ❤️
          </button>
        </div>
      </main>
    </div>
  )
}
