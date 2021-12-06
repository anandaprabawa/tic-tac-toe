import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NameDialogComponent } from './name-dialog.component';

describe('NameDialogComponent', () => {
  let component: NameDialogComponent;
  let fixture: ComponentFixture<NameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDialogComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
