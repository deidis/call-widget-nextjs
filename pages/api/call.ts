import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

import { Agent } from '../../src/models/agent';
import { User } from '../../src/models/user';

const cloudtalkBaseUrl = "https://my.cloudtalk.io/api";
const cloudtalkAgentsEndpoint = cloudtalkBaseUrl + "/agents/index.json";
const cloudtalkCallEndpoint = cloudtalkBaseUrl + "/calls/create.json";

export default async function main(req:NextApiRequest, res:NextApiResponse)
{
    var error = null;

    try
    {
        const body:Record<string, any> = req.body;
        const uid:string = body["uid"];
        const phoneNumber:string = body["phoneNumber"];

        // Get the client's secrets from the database.
        const user:User | null = User.get(uid);
        if(!user) throw "The given user id is invalid.";

        // Make requests to CloudTalk with the secrets above.
        const headers:Record<string, string> = { "Authorization": "Basic " + Buffer.from(`${user.cloudtalkId}:${user.cloudtalkSecret}`).toString("base64") };
        const availableAgent:Agent | null = await getAgent(headers);

        if(!availableAgent) throw "No agents are available at this time.";

        // Make a call to the agent.
        await axios.post(
            cloudtalkCallEndpoint,
            { "agent_id": availableAgent.id, "callee_number": phoneNumber },
            { headers: headers }
        );
    }
    catch(e)
    {
        error = e;
        console.log(e);
    }

    // Send information back to the widget.
    res.send({"success": error ? false : true, "error": error || null});
}

async function getAgent(headers:Record<string, string>):Promise<Agent | null>
{
    // Get the agents.
    var availableAgent:Agent | null = null;
    var page:number = 1;
    var totalPageCount:number = 1;
    // Loops through all the agents.
    // Stops when the first available agent is found.
    while(availableAgent == null)
    {
        if(page != 1 && page >= totalPageCount && !availableAgent) { break; }

        var agentsResponse = await axios.get(cloudtalkAgentsEndpoint + `?page=${page}`, { headers: headers });

        agentsResponse["data"]["responseData"]["data"].every((e:Record<any, any>) => {
            var a = Agent.fromJson(e["Agent"]);
            if(a.isAvailable())
            {
                availableAgent = a;
                return false;
            }

            return true;
        });

        page++;
        totalPageCount = parseInt(agentsResponse["data"]["responseData"]["pageCount"]);
    }

    return availableAgent;
}