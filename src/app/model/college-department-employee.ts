import { CollegeEmployee } from "./college-employee";
import { Department } from "./department";
import { Expertise } from "./expertise";

export interface CollegeDepartmentEmployee{
    id:string;
    employeeNo:CollegeEmployee
    department:Department;
    expertise:Expertise;
}