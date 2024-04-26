import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisBarangComponent } from './jenis-barang.component';

describe('JenisBarangComponent', () => {
  let component: JenisBarangComponent;
  let fixture: ComponentFixture<JenisBarangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JenisBarangComponent]
    });
    fixture = TestBed.createComponent(JenisBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
