import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task'

@Injectable({
  providedIn: 'root'
})
export class TaskSevicesService {
  private baseUrl = 'http://localhost:3000/addTask'
  constructor(private http: HttpClient) { }

  addData(data: Task): Observable<any> {
    const url = `${this.baseUrl}`; // Replace with the appropriate endpoint on your JSON server
    return this.http.post(url, data);
  }
  getData(): Observable<any[]> {
    const url = `${this.baseUrl}`; 
    return this.http.get<any[]>(url);
  }
  deleteData(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
  getDataById(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`; // आपके एंडपॉइंट का नाम यहां डालें
    return this.http.get(url);
  }
  updateData(id: number, data: Task): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, data);
  }
}
