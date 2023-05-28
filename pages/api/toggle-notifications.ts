import type { NextApiRequest, NextApiResponse } from 'next'
import { getXataClient } from '@/src/xata';
const xata = getXataClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.body.id;
    const curr = req.body.curr;
    try {
        const record = await xata.db.contacts.update(id, {
            notifications: !curr,
        });
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error });
    }
}
