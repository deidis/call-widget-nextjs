export class Agent
{
    public constructor(
        id:string, 
        firstName:string, 
        lastName:string, 
        email:string, 
        dailyPriceLimit:any, 
        isDailyLimitOk:boolean, 
        statusOutbound:boolean, 
        extension:string, 
        availabilityStatus:string, 
        associatedNumbers:Array<string>, 
        name:string
    )
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dailyPriceLimit = dailyPriceLimit;
        this.isDailyLimitOk = isDailyLimitOk;
        this.statusOutbound = statusOutbound;
        this.extension = extension;
        this.availabilityStatus = availabilityStatus;
        this.associatedNumbers = associatedNumbers;
        this.name = name;
    }

    public id:string;
    public firstName:string;
    public lastName:string;
    public email:string;
    public dailyPriceLimit:any;
    public isDailyLimitOk:boolean;
    public statusOutbound:boolean;
    public extension:string;
    public availabilityStatus:string;
    public associatedNumbers:Array<string>;
    public name:string;

    // Returns true if the agent is available.
    public isAvailable():boolean { return this.availabilityStatus == "online"; }

    // Convert an agent JSON to an agent object.
    public static fromJson(map:Record<string, any>):Agent
    {
        return new Agent(
            map["id"],
            map["firstname"],
            map["lastname"],
            map["email"],
            map["daily_price_limit"],
            map["is_daily_limit_ok"],
            map["status_outbound"],
            map["extension"],
            map["availability_status"],
            map["associated_numbers"],
            map["name"]
        );
    }
}