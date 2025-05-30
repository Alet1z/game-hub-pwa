import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Inyección de depencias
  private http =  inject(HttpClient)

  constructor() { }

  getUsers(){
    return this.http.get<User[]>('https://api.escuelajs.co/api/v1/users')
  }
}
