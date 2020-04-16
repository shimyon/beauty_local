export class WaybillModel {
    Count: number;
    Id: string;
    TripDateTime: Date;
    TripDateTimeFormat: string;
    TripTime: string;
    ClientId: string;
    ZoneGroup: string;
    ZoneGroupId: string;
    Site: string;
    SiteId: string;
    Client: string;
    BookedAt: Date;
    BookedAtFormat: string;
    NoOfPassenger: number;
    TotalSeats: number;
    TripType: string;
    constructor() {
        this.NoOfPassenger = 0;
        this.TotalSeats = 0;
    }
}
