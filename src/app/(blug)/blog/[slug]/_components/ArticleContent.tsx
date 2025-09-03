import React from "react"
import hljs from "highlight.js"

import "./styles.css"
import "highlight.js/styles/github-dark.css"

const ArticleContent = ({ html }: { html: string }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll<HTMLElement>("pre.highlight").forEach(block => {
        hljs.highlightElement(block)
      })
    }
  }, [html])

  return (
    <div
      ref={containerRef}
      className="content prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default ArticleContent
