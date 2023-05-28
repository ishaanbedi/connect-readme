import { NextApiRequest, NextApiResponse } from 'next';
import { Novu } from '@novu/node';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const novu = new Novu(process.env.NOVU_ID as string);
        const session = await getSession({ req });
        if (!session || !session.user) {
            throw new Error('User not authenticated');
        }
        await novu.subscribers.identify(session.user.email as string, {
            email: session.user.email as string,
            firstName: session.user.name as string,
            avatar: session.user.image || '',
        });
        res.status(200).json({ success: session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error });
    }
}