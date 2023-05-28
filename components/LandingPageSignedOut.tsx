import React from 'react';
import { FaGift } from 'react-icons/fa';
import { HiOutlineCalendar } from 'react-icons/hi';
import { signIn } from "next-auth/react"
import Link from 'next/link';

const LandingPageSignedOut = () => {
    return (
        <section>
            <div className="flex justify-center pt-32 text-gray-50 text-center">
                <h1 className="lg:md:text-6xl text-3xl font-bold max-w-4xl">
                    <span
                        className={`text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-400`}
                    >
                        Welcome to <span className={`text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-lime-200`}>
                            Special Dayz
                        </span>{" "}
                    </span>
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center pt-6 px-2">
                <h2 className="text-gray-400 lg:md:sm:text-lg text-sm text-center max-w-2xl font-medium">
                    Special Dayz is a reminder service that helps you remember important dates like birthdays and anniversaries, complete with gift recommendations tailored to your loved ones&apos; interests.
                </h2>
            </div>
            <div className="flex flex-wrap items-center justify-center py-12 space-x-2">
                <div className="px-8">
                    <div className="grid gap-8 items-start justify-center">
                        <div className="relative group">
                            <div
                                className={`absolute -inset-0.5 bg-gradient-to-r from-teal-200 to-lime-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}
                            ></div>
                            <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600" onClick={() => signIn()}>
                                <span className="flex items-center px-2 space-x-5">
                                    <span className="text-gray-100 font-medium">
                                        Get Started Now
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-center text-gray-400 py-4 absolute bottom-0 w-full">
                Created by <Link href="https://www.ishaanbedi.in" className='link' target='blank'>Ishaan Bedi</Link> <br /> Built with Next.js, Tailwind CSS, Xata, and Novu
            </footer>
        </section>
    );
}

export default LandingPageSignedOut;