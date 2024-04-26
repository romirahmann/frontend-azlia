import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSatuanBarangComponent } from './modal-satuan-barang.component';

describe('ModalSatuanBarangComponent', () => {
  let component: ModalSatuanBarangComponent;
  let fixture: ComponentFixture<ModalSatuanBarangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSatuanBarangComponent]
    });
    fixture = TestBed.createComponent(ModalSatuanBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
