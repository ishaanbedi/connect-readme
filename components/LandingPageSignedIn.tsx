import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaGift } from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const LandingPageSignedIn = () => {
    const { data: session, status } = useSession();
    const [birthdaysToday, setBirthdaysToday] = useState([] as any[]);
    const [anniversariesToday, setAnniversariesToday] = useState([] as any[]);
    const [loading, setLoading] = useState(true);
    const createSubscriber = async () => {
        try {
            await axios.post("/api/manage-novu-sub");
        } catch (err) {
            console.log(err);
        }
    };
    const getTodaysEvents = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/check-event-today");
            setBirthdaysToday(data.birthdays);
            setAnniversariesToday(data.anniversaries);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };
    useEffect(() => {
        if (status === "authenticated") {
            createSubscriber();
            getTodaysEvents();
        }
    }, [status]);
    const renderTodaysEvents = () => {
        if (birthdaysToday.length === 0 && anniversariesToday.length === 0) {
            return (
                <section>
                    <div className="flex justify-center text-gray-50 text-center">
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
                            Looks like you don&apos;t have any events today. Check back tomorrow!
                            <br />
                            You can also add new contacts to track their birthdays and anniversaries.
                        </h2>
                    </div>
                </section>
            );
        }
        return (
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Dashboard</h2>
                {birthdaysToday.length > 0 && (
                    <div className="text-lg md:text-xl text-center mb-8 pt-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            🎂 Birthdays Today 🎂
                        </h2>
                        <ul>
                            {birthdaysToday.map((birthday, index) => (
                                <Link href={`/user/event/${birthday.id}`} className="link" key={index}>
                                    <li key={index}>{birthday.name}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
                {anniversariesToday.length > 0 && (
                    <div className="text-lg md:text-xl text-center mb-8 pt-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            🎉 Anniversaries Today 🎉
                        </h2>
                        <ul>
                            {anniversariesToday.map((anniversary, index) => (
                                <Link href={`/user/event/${anniversary.id}`} className="link" key={index}>
                                    <li key={index}>{anniversary.name}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {loading && <AiOutlineLoading3Quarters className="animate-spin min-h-screen text-center mx-auto" />}
            {!loading && (
                <>
                    <div className="min-h-screen">
                        <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
                            <div className="mt-8">
                                {renderTodaysEvents()}
                            </div>
                            <div className="flex lg:md:sm:flex-row flex-col lg:md:sm:space-y-0 space-y-12 items-center justify-center py-12 space-x-2">
                                <Link href="/add-contact">
                                    <div className="px-8">
                                        <div className="grid gap-8 items-start justify-center">
                                            <div className="relative group">
                                                <div
                                                    className={`absolute -inset-0.5 bg-gradient-to-r from-teal-200 to-lime-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}
                                                ></div>
                                                <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                                                    <span className="flex items-center px-2 space-x-5">
                                                        <span className="text-gray-100 font-medium">
                                                            Add A New Contact
                                                        </span>
                                                    </span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/my-contacts">
                                    <div className="px-8">
                                        <div className="grid gap-8 items-start justify-center">
                                            <div className="relative group">
                                                <div
                                                    className={`absolute -inset-0.5 bg-gradient-to-r from-teal-200 to-lime-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}
                                                ></div>
                                                <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                                                    <span className="flex items-center px-2 space-x-5">
                                                        <span className="text-gray-100 font-medium">
                                                            Manage Contacts
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LandingPageSignedIn;
