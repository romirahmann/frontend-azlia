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
  selector: 'app-modal-rak-gudang',
  templateUrl: './modal-rak-gudang.component.html',
  styleUrls: ['./modal-rak-gudang.component.scss'],
})
export class ModalRakGudangComponent {
  formAddRak!: FormGroup;
  formEditRak!: FormGroup;
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
      if (this.dataReceived.category === 'ADD_RAK') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_RAK') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalRakGudangComponent | undefined =
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
    this.formAddRak = this.fb.group({
      no_rak: ['', Validators.required],
      deskripsi_rak: ['', Validators.required],
    });
  }
  submitAdd() {
    // console.log(this.formAddSupplier.value);
    this.apiService.insertRak(this.formAddRak.value).subscribe((res: any) => {
      console.log('Add Successfully');
      this.closeModal();
    });
  }
  // EDIT SUPPLIER
  createFormEdit() {
    const data = this.dataReceived.data;
    this.formEditRak = this.fb.group({
      no_rak: data.no_rak,
      deskripsi_rak: data.deskripsi_rak,
    });
  }
  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.id_rak;
    this.apiService
      .updateRak(id, this.formEditRak.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeRak() {
    const data = this.dataReceived.data;
    const newData = {
      is_deleted: 1,
    };
    this.apiService.updateRak(data.id_rak, newData).subscribe((res: any) => {
      console.log('Delete Successfully');
      this.closeModal();
    });
  }
}
