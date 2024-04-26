import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBarangComponent } from './data-barang.component';

describe('DataBarangComponent', () => {
  let component: DataBarangComponent;
  let fixture: ComponentFixture<DataBarangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataBarangComponent]
    });
    fixture = TestBed.createComponent(DataBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
