import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { AuthenticationService } from '../service/auth/authentication.service';
import { StorageService } from '../service/auth/storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  username: string;
  todo: Todo;
  id: number;
  constructor(private todoService: TodoDataService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.username = this.storageService.getUsername();
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.todo.id != -1) {
      this.todoService.retrieveTodo(this.username, this.id).subscribe(
        response => {
          this.todo = response
        }
      );
    }
  }

  saveTodo() {
    if(this.id == -1) {
      this.todoService.createTodo(this.username, this.todo).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos']);
        }
      );
    }
    else {
      this.todoService.updateTodo(this.username, this.id, this.todo).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos']);
        }
      );
    }
  }

}
