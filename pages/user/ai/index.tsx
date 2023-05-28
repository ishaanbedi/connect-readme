import { getXataClient } from '@/src/xata';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

const AIDashboard = (
    {
        credits
    }: {
        credits: number
    }
) => {
    return (
        <div className="container mx-auto h-screen pt-12 lg:md:sm:px-0 px-2">
            <Head>
                <title>Special Dayz AI Dashboard</title>
            </Head>
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">
                    Special Dayz AI Dashboard
                </h2>
                <p className="text-gray-100 mb-4">
                    Welcome to the AI Dashboard! We are excited to share with you our AI-powered gift suggestion feature.
                </p>
                <p className="text-gray-100 mb-4">
                    Our AI system works tirelessly to send you personalized gift suggestions for every special event day at exactly 12 AM. You can expect to receive these suggestions conveniently via email and in-app notifications, ensuring you never miss a chance to surprise your loved ones.
                </p>
                <p className="text-gray-100 mb-4">
                    We take pride in providing you with a seamless gifting experience. To make it even easier for you to plan ahead, we offer a special feature: &quot;Send Email Gift Ideas.&quot; Simply visit the page of the particular event you&apos;re preparing for and click the button. Our AI system will instantly compile and send you an email with creative gift ideas tailored to the occasion.
                </p>
                <p className="text-gray-100 mb-4">
                    Best of all, our automatic email gift suggestions on the event days are 100% free and unlimited! You can rely on our AI to assist you with a wide range of events and celebrations throughout the year, without any cost or limitations.
                </p>
                <p className="text-gray-100 mb-4">
                    Please note that manual requests for gift ideas via email are limited to 20 requests per account, which we refer to as 20 AI credits. Each time you click the &quot;Send Email Gift Ideas&quot; button, it will deduct one credit from your account. Once you have exhausted your requests, don&apos;t worry! Simply reach out to me at <a href="mailto:credits@ishaanbedi.in" className="link">credits@ishaanbedi.in</a>, and I will gladly increase your credits. In fact, I may even provide additional credits for free, depending on the available resources.
                </p>
                <p className="text-gray-100 mb-4">
                    We hope Special Dayz&apos;s AI gift suggestions service bring joy and convenience to your gifting experience. If you have any questions or need assistance, please don&apos;t hesitate to contact me at <a href="mailto:specialdayz@ishaanbedi.in" className="link">
                        specialdayz@ishaanbedi.in
                    </a>.
                </p>
                <p className="text-gray-100 mb-4">
                    Credits Remaining: {credits}
                </p>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const xata = getXataClient();
    const session = await getSession({ ctx });
    const id = ctx.query.id as string;
    const records1 = await xata.db.nextauth_users
        .filter("email", session?.user?.email as string)
        .getAll();
    return {
        props: {
            credits: records1[0].credits
        }
    }
}


export default AIDashboard;