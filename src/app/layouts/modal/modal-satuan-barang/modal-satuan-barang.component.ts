import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-satuan-barang',
  templateUrl: './modal-satuan-barang.component.html',
  styleUrls: ['./modal-satuan-barang.component.scss'],
})
export class ModalSatuanBarangComponent {
  formAddSatuan!: FormGroup;
  formEditSatuan!: FormGroup;
  selectedFile!: File;
  filename!: string;
  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'ADD_SATUAN') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_SATUAN') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalSatuanBarangComponent | undefined =
      this.dataReceived?.funct;
    if (
      typeof functionToExecute === 'string' &&
      typeof this[functionToExecute] === 'function'
    ) {
      // Panggil fungsi jika ditemukan
      this[functionToExecute]();
    } else {
      // Penanganan jika nama fungsi tidak valid atau tidak ditemukan
      console.log('Function does not exist or is not a function');
    }
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
  // ADD ABSENSI
  createFormAdd() {
    this.formAddSatuan = this.fb.group({
      nama_satuan_barang: ['', Validators.required],
    });
  }
  submitAdd() {
    // console.log(this.formAddSupplier.value);
    this.apiService
      .insertSatuan(this.formAddSatuan.value)
      .subscribe((res: any) => {
        console.log('Add Successfully');
        this.closeModal();
      });
  }
  // EDIT SUPPLIER
  createFormEdit() {
    const data = this.dataReceived.data;
    this.formEditSatuan = this.fb.group({
      nama_satuan_barang: data.nama_satuan_barang,
    });
  }
  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.id_satuan_barang;
    this.apiService
      .updateSatuan(id, this.formEditSatuan.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeSatuan() {
    const data = this.dataReceived.data;
    const newData = {
      is_deleted: 1,
    };
    this.apiService
      .updateSatuan(data.id_satuan_barang, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
