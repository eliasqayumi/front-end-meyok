import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public tasks: Task[];
  public editTask: Task;
  public deleteTask: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
        this.tasks.sort(function(a:any,b:any){
          return a.id - b.id;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTask(addForm: NgForm): void {
    document.getElementById('add-Task-form').click();
    this.taskService.addTask(addForm.value).subscribe(
      (response: Task) => {
        this.getTasks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public search(key: string): void {
    const results: Task[] = [];
    for (const Task of this.tasks) {
      if (
        Task.id.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        Task.task.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
        results.push(Task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !key) {
      this.getTasks();
    }
  }


  public onOpenModal(task: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addTaskModal');
    }
    if (mode === 'edit') {
      this.editTask = task;
      button.setAttribute('data-target', '#updateTaskModal');
    }
    if (mode === 'delete') {
      this.deleteTask = task;
      button.setAttribute('data-target', '#deleteTaskModal');
    }
    container != null ? container.appendChild(button) : null;
    button.click();
  }
}