import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RakGudangComponent } from './rak-gudang.component';

describe('RakGudangComponent', () => {
  let component: RakGudangComponent;
  let fixture: ComponentFixture<RakGudangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RakGudangComponent]
    });
    fixture = TestBed.createComponent(RakGudangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
