import { Idatatable } from "../idatatable";
import { WaybillModel } from "./waybill.model";

export class WaybillListModel implements Idatatable<WaybillModel> {
    Total: number;
    iTotalRecords: number;
    iTotalDisplayRecords: number;
    Data: WaybillModel[];
    aaData: WaybillModel[];
}
