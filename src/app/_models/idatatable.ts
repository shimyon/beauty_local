export interface Idatatable<T> {
    Total: number,
    iTotalRecords: number,
    iTotalDisplayRecords: number,
    Data: T[],
    aaData: T[]
}
