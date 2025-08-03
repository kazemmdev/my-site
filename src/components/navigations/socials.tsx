"use client"

import React from "react"
import Link from "next/link"
import { ReactSVG } from "react-svg"

const socials = [
  { id: 3, type: "linkedIn", url: "https://www.linkedin.com/in/kazem-mirzaei" },
  { id: 2, type: "github", url: "https://github.com/kazemmdev" },
  { id: 4, type: "twitter", url: "https://twitter.com/kazemmdev" },
  {
    id: 1,
    type: "email",
    url: "kazemmdev@gmail.com?subject=Contacting you from your website&amp;body=Ask me a question, get help with one of my projects, or hire me for freelance and contract work!"
  }
]

const Socials = () => (
  <div className="z-20 py-14">
    <div className="h-full w-full flex items-center justify-center gap-5">
      {socials.map(({ type, url }, index) => (
        <Social key={index} type={type} url={url} />
      ))}
    </div>
  </div>
)

interface ISocial {
  type: string
  url: string
}

const Social: React.FC<ISocial> = ({ type, url }) => {
  const address = type.includes("mail") ? `mailto:${url}` : url
  return (
    <Link
      target="_blank"
      rel="noopener"
      href={address}
      className="h-8 w-8 transition shadow hover:shadow-lg hover:scale-110 duration-100 rounded"
    >
      <ReactSVG src={`/svg/${type}.svg`} wrapper="span" />
    </Link>
  )
}

export default Socials
