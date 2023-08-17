import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

const routes: Routes = [
  {
    path:'',component:CreateTaskComponent
  },
  {
    path:'create',component:CreateTaskComponent
  },
  {
    path:'list',component:TaskListComponent
  },
  {
    path:'create/:id',component:CreateTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
