export class Appointment {
    AppointmentId: number; 
    CustomerId: number; 
    TenantId: number;
    StatusId: number;
    ApptDate: Date;
    Subject: string;
    Message: string;
    Services: string;
    ApptServiceIds:any;
}