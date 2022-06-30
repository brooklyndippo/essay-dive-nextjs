import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const essayId = req.query.id

    if(req.method === 'DELETE') {
        const essay = await prisma.essay.delete({
            where: {id: Number(essayId)}
        })
        res.json(essay)
    } else {
        console.log("Note could not be deleted")
    }
}