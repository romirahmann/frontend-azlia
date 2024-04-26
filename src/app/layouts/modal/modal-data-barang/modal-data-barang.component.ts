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
  selector: 'app-modal-data-barang',
  templateUrl: './modal-data-barang.component.html',
  styleUrls: ['./modal-data-barang.component.scss'],
})
export class ModalDataBarangComponent {
  formAddBarang!: FormGroup;
  formEditBarang!: FormGroup;
  jenisBarang!: any;
  satuanBarang!: any;

  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getAllJenis();
    this.getAllSatuan();
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'ADD_BARANG') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_BARANG') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalDataBarangComponent | undefined =
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
  getAllJenis() {
    this.apiService.getAllJenis().subscribe((res: any) => {
      this.jenisBarang = res.data;
    });
  }
  getAllSatuan() {
    this.apiService.getAllSatuan().subscribe((res: any) => {
      this.satuanBarang = res.data;
    });
  }

  // ADD ABSENSI
  createFormAdd() {
    this.formAddBarang = this.fb.group({
      kode_barang: ['', Validators.required],
      id_jenis_barang: ['', Validators.required],
      id_satuan_barang: ['', [Validators.required]],
      nama_barang: ['', [Validators.required]],
    });
  }
  submitAdd() {
    // console.log(this.formAddUser.value);
    this.apiService
      .insertBarang(this.formAddBarang.value)
      .subscribe((res: any) => {
        console.log('Add Successfully');
        this.closeModal();
      });
  }
  // EDIT USERS
  createFormEdit() {
    const data = this.dataReceived.data;
    console.log(data);
    this.formEditBarang = this.fb.group({
      kode_barang: [data.kode_barang],
      id_jenis_barang: [data.id_jenis_barang],
      id_satuan_barang: [data.id_satuan_barang],
      nama_barang: [data.nama_barang],
    });
  }
  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.barang_id;
    this.apiService
      .updateBarang(id, this.formEditBarang.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeUser() {
    const data = this.dataReceived.data;
    const newData = {
      is_deleted: 1,
    };
    this.apiService
      .updateBarang(data.barang_id, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
