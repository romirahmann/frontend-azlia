import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRakGudangComponent } from './modal-rak-gudang.component';

describe('ModalRakGudangComponent', () => {
  let component: ModalRakGudangComponent;
  let fixture: ComponentFixture<ModalRakGudangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRakGudangComponent]
    });
    fixture = TestBed.createComponent(ModalRakGudangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
