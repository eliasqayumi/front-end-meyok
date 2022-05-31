import { Subject } from "./Subject";
import { CollegeDepartment } from "./college-department";
import { CollegeDepartmentSubjectId } from "./college-department-subject-id";

export interface CollegeDepartmentSubject{
    id:CollegeDepartmentSubjectId;
    colDep:CollegeDepartment;
    subject:Subject;
}