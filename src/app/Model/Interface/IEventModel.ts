export interface IApiResp {
    message: string;
    result: boolean;
    data: any;
};

export interface IEvent {
    eventId: number;
    eventName: string;
    startDate: string;
    startTime: string;
    endDate: string;
    organizerName: string;
    userId: number;
    price: number;
    location: string;
    imageUrl: string;
    organizerId: number;
};

// Class
export class User {
    UserId: number;
    Name: string;
    Email: string;
    Password: string;
    ContactNo: string;
    Role: string;

    constructor() {
        this.UserId = 0;
        this.Name = '';
        this.Email = '';
        this.Password = '';
        this.ContactNo = '';
        this.Role = "Admin";
    }
};

export class loginClass {
    UserId: number;
    Password: string;
    ContactNo: string;

    constructor() {
        this.UserId = 0;
        this.Password = '';
        this.ContactNo = '';
    }
};
