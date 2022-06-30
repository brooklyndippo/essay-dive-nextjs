import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {prompt, wordcount, isRequired, content} = req.body

    try {
        await prisma.essay.create({
            data: {
                prompt,
                wordcount,
                isRequired,
                content,
            }
        })
        res.status(200).json({message: 'Essay Created'});
    } catch(error) {
        console.log('Failure');
}
}