import { District } from "./district";
import { Kind } from "./kind";

export interface College{
    id:string;
    collegeName:string;
    kind:Kind;
    district:District;
    createDate:Date;
}