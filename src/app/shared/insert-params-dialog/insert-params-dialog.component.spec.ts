import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertParamsDialogComponent } from './insert-params-dialog.component';

describe('InsertParamsDialogComponent', () => {
  let component: InsertParamsDialogComponent;
  let fixture: ComponentFixture<InsertParamsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertParamsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertParamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
