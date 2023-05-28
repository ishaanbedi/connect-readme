import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from '@/src/xata';
const xata = getXataClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, interests, notifications, email } = req.body;
    var birthday = new Date(req.body.birthday);
    var anniversary = new Date(req.body.anniversary);
    try {
        const record = await xata.db.contacts.create({
            name: name,
            birthday: birthday,
            anniversary: anniversary,
            interests: interests,
            notifications: notifications,
            manager: email,
        });
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error });
    }
}
