import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [DatePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit {
  // Inyectando el servicio
  private userService = inject(ApiService)

  // Propiedad para listado de usuarios
  userList: User[] = []

  ngOnInit(){
    this.userService.getUsers().subscribe(
      {
        next: (users) => {
          this.userList = users
          console.table(this.userList)
        },
        error: (error) => {
          console.log(error.message)
        }
      }
    )
  }

}
