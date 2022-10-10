import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

import { Lead } from '../../src/models/lead';
import { User } from '../../src/models/user';

const cloudtalkBaseUrl = "https://my.cloudtalk.io/api";
const cloudtalkContactsEndpoint = cloudtalkBaseUrl + "/contacts/add.json";

export default async function main(req:NextApiRequest, res:NextApiResponse)
{
    const body:Record<string, any> = req.body;
    const uid:string = body["uid"];
    const user:User | null = User.get(uid);

    if(!user) return res.status(404).send("User not found.");

    await axios.put(
        cloudtalkContactsEndpoint,
        {
            "name": body["name"],
            "ContactNumber": [ { "public_number": body["phoneNumber"] } ],
            "ContactEmail": [ { "email": body["email"] } ],
            "ContactsTag": [ { "name": "call-widget-lead" } ]
        }
    )
}