import type { NextApiRequest, NextApiResponse } from 'next'
import {v4 as uuid} from 'uuid';

import { Lead } from '../../src/models/lead';
import { User } from '../../src/models/user';

export default async function main(req:NextApiRequest, res:NextApiResponse)
{
    const body:Record<string, any> = req.body;
    const uid:string = body["uid"];
    const user:User | null = User.get(uid);

    if(!user) return res.status(404).send("User not found.");

    const leadId:string = uuid();
    Lead.create();
}