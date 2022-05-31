import { Subject } from "./Subject";
import { DepartmentStudents } from "./department-students";
import { StudentsTakeSubjectId } from "./students-take-subject-id";
import { Term } from "./term";
export interface StudentsTakeSubject{
    id:StudentsTakeSubjectId;
    studentNo:DepartmentStudents;
    subject:Subject;
    term:Term;
}