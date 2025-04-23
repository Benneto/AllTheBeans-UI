import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanDetailDialogComponent } from './bean-detail-dialog.component';

describe('BeanDetailDialogComponent', () => {
  let component: BeanDetailDialogComponent;
  let fixture: ComponentFixture<BeanDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeanDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeanDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
