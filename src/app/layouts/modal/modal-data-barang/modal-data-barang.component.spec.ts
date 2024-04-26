import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDataBarangComponent } from './modal-data-barang.component';

describe('ModalDataBarangComponent', () => {
  let component: ModalDataBarangComponent;
  let fixture: ComponentFixture<ModalDataBarangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDataBarangComponent]
    });
    fixture = TestBed.createComponent(ModalDataBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
