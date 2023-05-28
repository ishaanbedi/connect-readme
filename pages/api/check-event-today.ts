import { getXataClient } from '@/src/xata';
import { getServers } from 'dns';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';

import type { NextApiRequest, NextApiResponse } from 'next'
const xata = getXataClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    const birthdays = [];
    const anniversaries = [];
    try {
        const record = await xata.db.contacts
            .filter("manager", session!.user!.email!)
            .getAll();
        const today = new Date();
        const todayString = today.toISOString().slice(5, 10);
        for (let i of record) {
            if (i.birthday !== null) {
                const birthday = i.birthday;
                const stringBirthday = birthday!.toISOString().slice(5, 10);
                if (stringBirthday === todayString) {
                    birthdays.push(i);
                }

            }
            if (i.anniversary !== null) {
                const anniversary = i.anniversary;
                const stringAnniversary = anniversary!.toISOString().slice(5, 10);
                if (stringAnniversary === todayString) {
                    anniversaries.push(i);
                }
            }
        }
        const todayRecords = { birthdays: birthdays, anniversaries: anniversaries }
        res.status(200).json(todayRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error });
    }
}
