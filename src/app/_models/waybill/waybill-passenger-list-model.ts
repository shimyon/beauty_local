import { Idatatable } from "../idatatable";
import { WaybillPassengerModel } from "./waybill-passenger-model";

export class WaybillPassengerListModel implements Idatatable<WaybillPassengerModel> {
    Total: number;    
    iTotalRecords: number;
    iTotalDisplayRecords: number;
    Data: WaybillPassengerModel[];
    aaData: WaybillPassengerModel[];
}
