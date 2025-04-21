import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanListComponent } from './bean-list.component';

describe('BeanListComponent', () => {
  let component: BeanListComponent;
  let fixture: ComponentFixture<BeanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeanListComponent]
    });
    fixture = TestBed.createComponent(BeanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
