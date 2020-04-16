import { user } from "./user";
import { Idatatable } from "../idatatable";

export class Userlist implements Idatatable<user> {
    Total: number;    iTotalRecords: number;
    iTotalDisplayRecords: number;
    Data: user[];
    aaData: user[];
}
