export class Lead
{
    public constructor(
        id:string,
        uid:string,
        phoneNumber:string,
        firstName:string,
        lastName:string,
        availableAt:number
    )
    {
        this.id = id;
        this.uid = uid;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.availableAt = availableAt;
    }

    public id:string = "";
    public uid:string = "";
    public phoneNumber:string = "";
    public firstName:string = "";
    public lastName:string = "";
    public availableAt:number = 0;

    public static create()
    {
        //TODO: mysql db
    }
}