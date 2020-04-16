export class WaybillPassengerModel {
    Id: string
    WayBillId: string
    EmployeeNo: string
    Firstname: string
    Surname: string
    CellPhone: string
    Email: string
    Address: string
    Campaign: string
    Suburb: string
    ZoneSubGroup: string
    IsDropped?: boolean
    IsCollected?: boolean
    IsLatebooking?: boolean
    SignaturePath: string
    TotalSeats: number
}
