import { College } from "./college";
import { Employee } from "./employee";

export interface CollegeEmployee{
    id:string;
    tcNo:Employee;
    college:College;
    entranceDate:Date;
    title:string;
    task:string;
}