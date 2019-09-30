import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { StorageService } from '../service/auth/storage.service';
import { WeekDay } from '@angular/common';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos: Todo[];
  username: string;
  message: string;
  constructor(private todoService: TodoDataService, 
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.username = this.storageService.getUsername();
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos(this.username).subscribe(
      response => {
        console.log(response);
        this.todos = response;
        this.todos.forEach(todo => {
          let td = new Date(todo.targetDate);
          let cd = new Date();
          if(cd.getDate() >= td.getDate() && cd.getTime() > td.getTime()) {
            console.log("CD : " + cd + ", TD : " + td);
            let updatedTodo = new Todo(todo.id, todo.description, true, todo.targetDate);
            this.todoService.updateTodo(this.username, todo.id, updatedTodo).subscribe(
              data => {
                console.log("Todo " + todo.id + " is updated!");
              },
              error => {
                console.log(error.error.message);
              }
            );
          }
          else {
            console.log("CD : " + cd + ", TD : " + td);
            let updatedTodo = new Todo(todo.id, todo.description, false, todo.targetDate);
            this.todoService.updateTodo(this.username, todo.id, updatedTodo).subscribe(
              data => {
                console.log("Todo " + todo.id + " is updated!");
              },
              error => {
                console.log(error.error.message);
              }
            );
          }
        });
      }
    );
  }

  deleteTodo(id : number) {
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        this.message = `Todo ${id} is deleted successfully!`;
        console.log(`Todo ${id} is deleted successfully!`);
        this.refreshTodos();
      }
    );
  }

  updateTodo(id : number) {
    this.router.navigate(['todos', id])
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }

}
