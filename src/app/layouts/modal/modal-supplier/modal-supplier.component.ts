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
  selector: 'app-modal-supplier',
  templateUrl: './modal-supplier.component.html',
  styleUrls: ['./modal-supplier.component.scss'],
})
export class ModalSupplierComponent {
  formAddSupplier!: FormGroup;
  formEditSupplier!: FormGroup;
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
      if (this.dataReceived.category === 'ADD_SUPPLIER') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_SUPPLIER') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalSupplierComponent | undefined =
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
    this.formAddSupplier = this.fb.group({
      nama_supplier: ['', Validators.required],
      alamat_supplier: ['', Validators.required],
      no_telp: ['', [Validators.required]],
    });
  }
  submitAdd() {
    // console.log(this.formAddSupplier.value);
    this.apiService
      .insertSupplier(this.formAddSupplier.value)
      .subscribe((res: any) => {
        console.log('Add Successfully');
        this.closeModal();
      });
  }
  // EDIT SUPPLIER
  createFormEdit() {
    const data = this.dataReceived.users;
    this.formEditSupplier = this.fb.group({
      nama_supplier: [data.nama_supplier],
      alamat_supplier: [data.alamat_supplier],
      no_telp: [data.no_telp],
    });
  }
  submitEdit() {
    const data = this.dataReceived.users;
    const id = data.id_supplier;
    this.apiService
      .updateSupplier(id, this.formEditSupplier.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeSupplier() {
    const data = this.dataReceived.users;
    const newData = {
      is_deleted: 1,
    };
    this.apiService
      .updateSupplier(data.id_supplier, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
