/** Small decorative pieces that loop with CSS only. */

export function Steam({ className = '' }: { className?: string }) {
  return (
    <svg className={`steam ${className}`} viewBox="0 0 40 48" aria-hidden="true">
      {[8, 20, 32].map((x, i) => (
        <path
          key={x}
          d={`M${x} 46 C${x - 6} 36 ${x + 6} 28 ${x} 18 C${x - 6} 10 ${x + 4} 4 ${x} 0`}
          style={{ animationDelay: `${i * -0.6}s` }}
        />
      ))}
    </svg>
  )
}

export function ScrollHint({ className = '' }: { className?: string }) {
  return (
    <div className={`scroll-hint ${className}`} aria-hidden="true">
      <span>scroll</span>
      <i />
    </div>
  )
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />
}

export function Caret() {
  return <span className="caret" aria-hidden="true" />
}
