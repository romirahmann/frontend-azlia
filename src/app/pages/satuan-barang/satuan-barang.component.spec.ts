import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatuanBarangComponent } from './satuan-barang.component';

describe('SatuanBarangComponent', () => {
  let component: SatuanBarangComponent;
  let fixture: ComponentFixture<SatuanBarangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatuanBarangComponent]
    });
    fixture = TestBed.createComponent(SatuanBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
