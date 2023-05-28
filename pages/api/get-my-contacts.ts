import { getXataClient } from '@/src/xata';
import { getServers } from 'dns';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next'
const xata = getXataClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    try {
        const record = await xata.db.contacts
            .filter("manager", session!.user!.email!)
            .getAll();
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error });
    }
}
