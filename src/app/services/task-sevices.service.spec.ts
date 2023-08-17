import { TestBed } from '@angular/core/testing';

import { TaskSevicesService } from './task-sevices.service';

describe('TaskSevicesService', () => {
  let service: TaskSevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
