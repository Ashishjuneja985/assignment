import { Component } from '@angular/core';
import { TaskSevicesService } from 'src/app/services/task-sevices.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  taskData:any=[]
  selectedFilter:any;
  selectedValue:string | undefined;
  constructor(private svc:TaskSevicesService) {
    
  }

  ngOnInit(): void {
    this.getData();
  }
  
  getData()
  {
    this.svc.getData().subscribe(data => {
      this.taskData = data;
      console.log(this.taskData)
    });
  }
  async deleteTask(id: any) {
    
    Swal.fire({
      title: 'Are you sure you want to delete the task?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "black",
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {

       this.svc.deleteData(id).subscribe(
        response => {
          console.log('Data deleted successfully:', response);
          this.getData();
        },
        error => {
          console.error('Error adding data:', error);
        }
      );
      }
    })
  }
  sortByTitle() {
    this.taskData.sort((a:any, b:any) => {
      // First, compare by title
      const titleComparison = a.title.localeCompare(b.title);

      // If titles are the same, compare by selectedDate
      if (titleComparison === 0) {
        return a.selectedDate.localeCompare(b.selectedDate);
      }

      return titleComparison;
    });
  }
  sortTasksBySelectedDate(): void {
    this.taskData.sort((a:any, b:any) => {
      const dateA = new Date(a.selectedDate);
      const dateB = new Date(b.selectedDate);
      return dateA.getTime() - dateB.getTime();
    });
  }
  onSelectedValueChange(): void {
    console.log(this.selectedValue) 
    this.selectedFilter=this.selectedValue
  }
  reset()
  {
    this.ngOnInit();
    this.selectedFilter='';
  }
}
