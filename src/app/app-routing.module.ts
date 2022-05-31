import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './component/city/city.component';
import { CollegeComponent } from './component/college/college.component';
import { KindComponent } from './component/kind/kind.component';
import { DistrictComponent } from './component/district/district.component';
import { TitleComponent } from './component/title/title.component';
import { TermComponent } from './component/term/term.component';
import { TaskComponent } from './component/task/task.component';
import { SubjectComponent } from './component/subject/subject.component';
import { StudentComponent } from './component/student/student.component';
import { ExpertiseComponent } from './component/expertise/expertise.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { DepartmentComponent } from './component/department/department.component';
import { CollegeEmployeeComponent } from './component/college-employee/college-employee.component';
import { CollegeDepartmentComponent } from './component/college-department/college-department.component';
import { CollegeDepartmentEmployeeComponent } from './component/college-department-employee/college-department-employee.component';
import { CollegeDepartmentEmployeesTeachSubjectComponent } from './component/college-department-employees-teach-subject/college-department-employees-teach-subject.component';
import { CollegeDepartmentSubjectComponent } from './component/college-department-subject/college-department-subject.component';
import { DepartmentStudentsStudentComponent as DepartmentStudentsComponent } from './component/department-student/department-student.component';
import { StudentsTakeSubjectComponent } from './component/student-take-subject/students-take-subject.component';
import { PageNotFoundComponent } from './component/page-not-foound/page-not-found.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { CollegeDepartmentListComponent } from './component/college-department-list/college-department-list.component';
import { CityDistrictsListComponent } from './component/city-districts-list/city-districts-list.component';



const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'cities', component: CityComponent },
  { path: 'cities/:id', component: CityDistrictsListComponent },
  { path: 'districts', component: DistrictComponent },
  { path: 'colleges', component: CollegeComponent },
  { path: 'colleges/department', component: CollegeDepartmentComponent },
  { path: 'college/department/:id', component:CollegeDepartmentListComponent},
  { path: 'colleges/department/employee', component: CollegeDepartmentEmployeeComponent },
  { path: 'colleges/department/employees/teach/subject', component: CollegeDepartmentEmployeesTeachSubjectComponent },
  { path: 'colleges/department/subject', component: CollegeDepartmentSubjectComponent},
  { path: 'colleges/employee', component: CollegeEmployeeComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'departments/students', component: DepartmentStudentsComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'expertises', component: ExpertiseComponent },
  { path: 'kinds', component: KindComponent },
  { path: 'students', component: StudentComponent },
  { path: 'students/take/subject', component: StudentsTakeSubjectComponent },
  { path: 'subjects', component: SubjectComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'terms', component: TermComponent },
  { path: 'titles', component: TitleComponent },


  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  CityComponent,
  CollegeComponent,
  KindComponent,
  DistrictComponent,
  TitleComponent,
  TermComponent,
  TaskComponent,
  SubjectComponent,
  StudentsTakeSubjectComponent,
  StudentComponent,
  ExpertiseComponent,
  EmployeeComponent,
  DepartmentStudentsComponent,
  DepartmentComponent,
  CollegeEmployeeComponent,
  CollegeDepartmentSubjectComponent,
  CollegeDepartmentEmployeesTeachSubjectComponent,
  CollegeDepartmentEmployeeComponent,
  CollegeDepartmentComponent,
  PageNotFoundComponent,
  HomePageComponent,
  CollegeDepartmentListComponent,
  CityDistrictsListComponent

  
]