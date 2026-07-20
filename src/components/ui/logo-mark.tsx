import React from "react"

/**
 * Line-art version of the site logo (rounded square + K), drawn with
 * currentColor strokes so it adapts to any theme. Used as a neutral
 * placeholder for images and loading states.
 */
const LogoMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 96 96"
    fill="none"
    stroke="currentColor"
    strokeWidth={5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <rect x="12" y="12" width="72" height="72" rx="18" />
    <path d="M36 30v36" />
    <path d="M62 30 40 52" />
    <path d="M46 46l16 20" />
  </svg>
)

export { LogoMark }
