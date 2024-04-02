
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
export default async function handle(req: any, res: any) {
  const { textId, userEmail, accuracy, wpm } = req.body;
  const result = await prisma.completedTestingText.create({
    data: {
      testingText: {connect:{id: textId}},
      user: {connect: {email: userEmail}},
      accuracy: accuracy,
      wpm: wpm,
    },
  });
  res.json(result);
}