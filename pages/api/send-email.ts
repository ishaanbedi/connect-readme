
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { getXataClient } from '@/src/xata';
const xata = getXataClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sessionemail = req.body.sessionEmail;
    const records = await xata.db.nextauth_users
        .filter("email", sessionemail as string)
        .getAll();
    const recID = records[0].id;
    const credits: number = records[0].credits;
    if (credits === 0) {
        res.status(200).json({ success: false, error: "You have no credits left. Please reach out to me at credits@ishaanbedi.in." });
    } else {
        const newCredits = credits - 1;
        await xata.db.nextauth_users.update(`${recID}`, {
            credits: newCredits
        });
    }
    const { email, name, interests } = req.body;
    const headers = {
        'Authorization': process.env.SECURITY_KEY
    };

    const queryParams = {
        email: email,
        name: name,
        interests: interests
    };
    await axios.post(`${process.env.BACKEND_URL}`, null, { headers, params: queryParams });
    res.status(200).json(
        {
            success: true,
            message: `Sent! Please check your inbox. You have ${credits - 1} AI credits left.`
        }
    );
}
