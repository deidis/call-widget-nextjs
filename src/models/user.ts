export class User
{
    public constructor(uid:string, cloudtalkId:string, cloudtalkSecret:string)
    {
        this.uid = uid;
        this.cloudtalkId = cloudtalkId;
        this.cloudtalkSecret = cloudtalkSecret;
    }

    public uid:string = "";
    public cloudtalkId:string = "";
    public cloudtalkSecret:string = "";

    public create(cloudtalkId:string, cloudtalkSecret:string)
    {
        //TODO: Create in mysql db.
    }

    public static get(uid:string):User
    {
        //TODO: Get from db.
        return new User("", "", "");
    }
}