import Image from "next/image"
import BlogIcon from "@/assets/blog.svg"
import PackageIcon from "@/assets/packages.svg"
import ProjectIcon from "@/assets/projects.svg"
import ResumeIcon from "@/assets/resume.svg"

import { Box, BoxContent, Boxes, BoxTitle } from "@/components/ui/boxes"
import FAQChat from "@/components/faq-chat"
import Footer from "@/components/navigations/footer"
import NavBar from "@/components/navigations/nav-bar"
import Socials from "@/components/navigations/socials"

export default function Home() {
  const years = new Date().getFullYear() - 2016
  return (
    <div className="relative h-full min-h-screen w-full">
      <Image
        src="/bg.jpg"
        alt="bg"
        quality={100}
        fill
        className="bg-contain object-cover dark:invert"
      />
      <main className="px-4 pb-10 w-full max-w-4xl pt-[40px] mx-auto">
        <NavBar />
        <Boxes>
          <Box>
            <div className="flex flex-col gap-2 py-4">
              <span className="text-lg italic text-foreground">Welcome, friend!</span>
              <h1 className="pt-2 text-2xl text-foreground">
                I&apos;m <strong className="text-[3rem] font-bold">Kazem</strong>
              </h1>
            </div>
            <h3 className="text-xl font-bold">
              <span className="gradiant">Fullstack developer</span>
            </h3>
            <p className="text-md py-2 italic text-foreground">
              I&apos;ve been coding for over {years} years and have gained a wealth of professional
              knowledge along the way.
            </p>
          </Box>
          <Box isGlowing>
            <BoxTitle>
              <ResumeIcon className="dark:fill-white fill-black" />
              Resume
            </BoxTitle>
            <BoxContent>Do you want to know more about me?</BoxContent>
          </Box>
          <Box isGlowing>
            <BoxTitle>
              <BlogIcon className="dark:fill-white fill-black" />
              Blogs
            </BoxTitle>
            <BoxContent>My ideas and tutorials</BoxContent>
          </Box>
          <Box isGlowing>
            <BoxTitle>
              <PackageIcon className="dark:fill-white fill-black" />
              Packages
            </BoxTitle>
            <BoxContent>My creatures!</BoxContent>
          </Box>
          <Box isGlowing>
            <BoxTitle>
              <ProjectIcon className="dark:fill-white fill-black" />
              Projects
            </BoxTitle>
            <BoxContent>Some handy works</BoxContent>
          </Box>
          <Box>
            <Socials />
            <BoxTitle>Contact Me</BoxTitle>
            <BoxContent>
              Let me know if you are interested in my services and collaboration!
            </BoxContent>
          </Box>
        </Boxes>
      </main>
      <Footer />
    </div>
  )
}
