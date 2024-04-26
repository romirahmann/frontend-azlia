import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJenisBarangComponent } from './modal-jenis-barang.component';

describe('ModalJenisBarangComponent', () => {
  let component: ModalJenisBarangComponent;
  let fixture: ComponentFixture<ModalJenisBarangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalJenisBarangComponent]
    });
    fixture = TestBed.createComponent(ModalJenisBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
