"use client"

import React from "react"
import {useRouter} from "next/navigation"

import {cn} from "@/lib/utils"

interface IBox extends React.PropsWithChildren {
    url?: string
    height?: number
    isGlowing?: boolean
}

const Boxes = ({children}: React.PropsWithChildren) => {
    const cardsRef = React.useRef<HTMLDivElement>(null)
    const handleMouseEnter = () => {
        cardsRef.current?.childNodes?.forEach(el => {
            const child = el as HTMLDivElement
            child.style.setProperty("--border-opacity", "1")
        })
    }
    const handleMouseLeave = () => {
        cardsRef.current?.childNodes?.forEach(el => {
            const child = el as HTMLDivElement
            child.style.setProperty("--border-opacity", "0")
        })
    }
    const handleMouseOver = (e: any) => {
        cardsRef.current?.childNodes?.forEach(el => {
            const child = el as HTMLDivElement
            const x = child?.getBoundingClientRect().left
            child!.style.setProperty("--cursor-x", `${e.clientX - x}`)
        })
        cardsRef.current?.childNodes?.forEach(el => {
            const child = el as HTMLDivElement
            const y = child?.getBoundingClientRect().top!
            child!.style.setProperty("--cursor-y", `${e.clientY - y}`)
        })
    }
    return (
        <>
            <div className="cards-highlight absolute inset-0 z-50 overflow-visible pointer-events-none select-none"/>
            <div
                ref={cardsRef}
                onMouseMove={handleMouseOver}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative grid grid-cols-1 gap-4 py-10 text-white md:grid-cols-3 sm:grid-cols-2"
            >
                {children}
            </div>
        </>
    )
}

const Box = ({ url, isGlowing = false, height = 270, children }: IBox) => {
    const router = useRouter();
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = React.useState({ rotateX: 0, rotateY: 0, glareOpacity: 0 });

    React.useEffect(() => {
        const element = cardRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isGlowing) return; // Only apply tilt if glowing is enabled
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / centerX * 15;
            const rotateX = (y - centerY) / centerY * -15;

            const glareOpacity = 0.5 * (1 - Math.abs((x - centerX) / centerX)) + 0.1;

            setTilt({ rotateX, rotateY, glareOpacity });
        };

        const handleMouseLeave = () => {
            // Reset tilt and glow opacity
            setTilt({ rotateX: 0, rotateY: 0, glareOpacity: 0 });
            cardRef.current?.style.setProperty("--opacity", "0");
            element.style.transition = 'transform 0.3s ease-out';
        };

        const handleMouseEnter = () => {
            // Set glow opacity and a transition for the initial tilt
            cardRef.current?.style.setProperty("--opacity", "0.1");
            element.style.transition = 'transform 0.1s ease-out';
        };

        // The event listeners are added here
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseenter', handleMouseEnter);

        // Clean up function to remove event listeners on component unmount
        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isGlowing]);

    return (
        <div
            className={cn(url && "cursor-pointer", `min-h-[${height}px]`)}
            onClick={() => url && router.push(url)}
        >
            <div
                ref={cardRef}
                className={cn(
                    `min-h-[${height}px] h-full`,
                    "flex flex-col justify-start rounded-2xl relative flex-1 p-4 overflow-hidden",
                    isGlowing && "card-glow card-glass"
                )}
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transition: 'transform 0.3s ease-out'
                }}
            >
                {isGlowing && <div className="card-glow-highlight"/>}
                {isGlowing ? (
                    <div
                        className={cn(
                            "absolute top-[1px] bottom-[1px] left-[1px] right-[1px] rounded-[inherit] flex flex-col items-start justify-end"
                        )}
                    >
                        {children}
                    </div>
                ) : (
                    children
                )}
            </div>
            <svg className="hidden">
                <filter id="displacementFilter">
                    <feTurbulence type="turbulence"
                                  baseFrequency="0.00009"
                                  numOctaves="20"
                                  result="turbulence"/>

                    <feDisplacementMap in="SourceGraphic"
                                       in2="turbulence"
                                       scale="15" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
            </svg>
        </div>
    )
}

const BoxTitle = ({children}: React.PropsWithChildren) => (
    <h3 className="text-xl relative flex items-center gap-2 justify-start px-4 pb-2 overflow-hidden text-primary-foreground">
        {children}
    </h3>
)

const BoxContent = ({children}: React.PropsWithChildren) => (
    <div className="relative flex flex-col justify-start px-4 h-[85px] overflow-hidden text-gray-700 dark:text-gray-300">
        {children}
    </div>
)

export {Boxes, Box, BoxTitle, BoxContent}
