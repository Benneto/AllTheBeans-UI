import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanDetailComponent } from './bean-detail.component';

describe('BeanDetailComponent', () => {
  let component: BeanDetailComponent;
  let fixture: ComponentFixture<BeanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeanDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
