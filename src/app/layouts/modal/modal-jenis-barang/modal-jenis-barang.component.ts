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
  selector: 'app-modal-jenis-barang',
  templateUrl: './modal-jenis-barang.component.html',
  styleUrls: ['./modal-jenis-barang.component.scss'],
})
export class ModalJenisBarangComponent {
  formAddJenis!: FormGroup;
  formEditJenis!: FormGroup;
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
      if (this.dataReceived.category === 'ADD_JENIS') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_JENIS') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalJenisBarangComponent | undefined =
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
    this.formAddJenis = this.fb.group({
      nama_jenis_barang: ['', Validators.required],
      deskripsi_barang: ['', Validators.required],
    });
  }
  submitAdd() {
    // console.log(this.formAddSupplier.value);
    this.apiService
      .insertJenis(this.formAddJenis.value)
      .subscribe((res: any) => {
        console.log('Add Successfully');
        this.closeModal();
      });
  }
  // EDIT SUPPLIER
  createFormEdit() {
    const data = this.dataReceived.data;
    this.formEditJenis = this.fb.group({
      nama_jenis_barang: data.nama_jenis_barang,
      deskripsi_barang: data.deskripsi_barang,
    });
  }
  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.id_jenis_barang;
    this.apiService
      .updateJenis(id, this.formEditJenis.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeJenis() {
    const data = this.dataReceived.data;
    const newData = {
      is_deleted: 1,
    };
    this.apiService
      .updateJenis(data.id_jenis_barang, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
