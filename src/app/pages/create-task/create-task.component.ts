import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ TaskSevicesService } from '../../services/task-sevices.service'
import{ Task } from '../../task'
import { ActivatedRoute,Router } from '@angular/router';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  form: FormGroup;
taskId:any;
update:boolean=false;
taskDetails:Task | undefined;
paramdata:any;

  constructor(private fb: FormBuilder,private svc:TaskSevicesService, private route: ActivatedRoute,
    private router: Router,) {
    // Initialize the form group
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      selectedDate: ['', [Validators.required, this.futureDateValidator]]
    });
    
  }

  ngOnInit(): void {

    console.log(this.route.snapshot.params)
    this.paramdata=this.route.snapshot.params
    if(this.paramdata.id != null ||  this.paramdata.id != undefined)
    {
      this.taskId=this.paramdata.id
      console.log(this.taskId)
      this.update=true;
      this.getTaskDetails(this.taskId)
    }
  }

  // Submit function to handle form submission
  addTaskData() {
    if(this.form.invalid)
    {
      return
    }else{
      if (this.form.valid) {
        // Do something with the form values
        console.log(this.form.value);
          this.svc.addData(this.form.value).subscribe(
            response => {
              console.log('Data added successfully:', response);
              this.router.navigate(['/list']);
            },
            error => {
              console.error('Error adding data:', error);
            }
          );
      }
    }
    
  }
  updateTaskData()
  {
    if(this.form.invalid)
    {
      return
    }else{
      if (this.form.valid) {
        // Do something with the form values
        console.log(this.form.value);
          this.svc.updateData(this.taskId,this.form.value).subscribe(
            response => {
              console.log('Data added successfully:', response);
              this.router.navigate(['/list']);
            },
            error => {
              console.error('Error adding data:', error);
            }
          );
      }
    }

  }
  getTaskDetails(id:number)
  {
console.log(id)
this.svc.getDataById(id).subscribe(
  response => {
    console.log(response);
    this.taskDetails=response
    console.log(this.taskDetails)
    this.form = this.fb.group({
      title: [this.taskDetails?.title, [Validators.required]],
      description: [this.taskDetails?.description, [Validators.required]],
      selectedDate: [this.taskDetails?.selectedDate, [Validators.required,this.futureDateValidator]]
    });
  },
  error => {
    console.error('Error adding data:', error);
  }
);
  }
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return { pastDate: true };
    }
    
    
  
    return null;
  }

}

// if (selectedDate.getTime() < today.getTime()) {
//   return { pastDate: true };
// }