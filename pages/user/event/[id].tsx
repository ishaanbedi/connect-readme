import { getXataClient } from '@/src/xata';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
const UserEvent = (
    { record, credits }: { record: any, credits: number }
) => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const sendEmail = async () => {
        setLoading(true);
        const { data } = await axios.post("/api/send-email", {
            email: record[0].manager,
            name: record[0].name,
            interests: record[0].interests,
            sessionEmail: session!.user!.email,

        });
        if (data.error) {
            alert(data.error);
            return;
        }
        alert(data.message);
        setLoading(false);
    }
    return (
        <div>
            <Head>
                <title>{record[0].name} | Special Dayz</title>
            </Head>
            <div className="p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Contact Details
                </h1>
                <div className="flex flex-col space-y-2">
                    <div>
                        <span className="font-bold">Name: </span>
                        <span>{record[0].name}</span>
                    </div>
                    {record[0].birthday && (
                        <div>
                            <span className="font-bold">Birthday: </span>
                            <span>{new Date(record[0].birthday).toLocaleDateString()}</span>
                        </div>
                    )}
                    <div>
                        <span className="font-bold">Interests: </span>
                        <span>{record[0].interests}</span>
                    </div>
                    {record[0].anniversary && (
                        <div>
                            <span className="font-bold">Anniversary: </span>
                            <span>{new Date(record[0].anniversary).toLocaleDateString()}</span>
                        </div>
                    )}
                    <div>
                        {credits !== 0 && (
                            <>
                                <button
                                    disabled={loading}
                                    className="btn btn-outline" onClick={sendEmail}>
                                    Get Gift Ideas on email
                                </button>
                            </>
                        )}
                        {credits === 0 && (
                            <div className="text-left">
                                <span className="font-bold">
                                    You have no AI credits left to facilitate the AI Gift Ideas service.
                                </span>
                                <br />
                                <span className="font-bold">
                                    Reach out to me at{" "}
                                    <Link href="mailto:credits@ishaanbedi.in" target="_blank" className="link">
                                        credits@ishaanbedi.in
                                    </Link>{" "}
                                    to get more credits for free.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const xata = getXataClient();
    const session = await getSession({ ctx });
    const id = ctx.query.id as string;
    const records = await xata.db.contacts
        .filter("id", id)
        .getAll();
    if (records[0].manager !== session?.user?.email) {
        return {
            notFound: true
        }
    }
    const records1 = await xata.db.nextauth_users
        .filter("email", session?.user?.email as string)
        .getAll();
    return {
        props: {
            record: JSON.parse(JSON.stringify(records)),
            credits: records1[0].credits
        }
    }
}

export default UserEvent;