import { Department } from "./department";
import { Student } from "./student";

export interface DepartmentStudents{
    id:string;
    tcNo:Student;
    entranceDate:Date;
    department:Department;
}