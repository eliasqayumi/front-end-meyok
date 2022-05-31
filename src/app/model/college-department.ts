import { College } from "./college";
import { Department } from "./department";

export interface CollegeDepartment {
    id: string;
    college: College;
    department: Department;
    openingDate:Date;
    status:boolean;
}