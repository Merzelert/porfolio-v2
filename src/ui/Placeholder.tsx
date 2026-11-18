import type { CSSProperties } from 'react'
import type { Asset } from '../content/site'

interface PlaceholderProps {
  asset: Asset
  className?: string
  style?: CSSProperties
}

/**
 * Renders the final image when `asset.src` exists, otherwise a labeled dashed slot
 * with the same size and position, so layouts and animations work before the art does.
 */
export function Placeholder({ asset, className = '', style }: PlaceholderProps) {
  if (asset.src) {
    return <img src={asset.src} alt={asset.label} className={`asset ${className}`} style={style} draggable={false} />
  }

  return (
    <div className={`asset asset--empty ${className}`} style={style} role="img" aria-label={`${asset.label} (placeholder)`}>
      <span>{asset.label}</span>
    </div>
  )
}
