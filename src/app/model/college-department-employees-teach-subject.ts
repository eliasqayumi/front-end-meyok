import { CollegeDepartmentEmployee } from "./college-department-employee";
import { CollegeDepartmentEmployeesTeachSubjectId } from "./college-department-employees-teach-subject-id";
import { Subject } from "./Subject";
import { Term } from "./term";

export interface CollegeDepartmentEmployeesTeachSubject{
    id:CollegeDepartmentEmployeesTeachSubjectId;
    subject:Subject;
    cde:CollegeDepartmentEmployee;
    term:Term;
}