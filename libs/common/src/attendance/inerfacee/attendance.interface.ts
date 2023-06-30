export interface IAttendance {
    id: string;
    empoloyee_id: string;
    date_time: Date;
    check_in: Date;
    check_out: Date;
    leave_reason: string;
    overtime_status: boolean;
}
