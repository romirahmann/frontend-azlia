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
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.scss'],
})
export class ModalTransactionComponent {
  formAddTransactions!: FormGroup;
  formEditTransactions!: FormGroup;
  barang!: any;
  supplier!: any;
  rak!: any;
  categories!: any;

  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  executeTestingFunction() {
    const functionToExecute: keyof ModalTransactionComponent | undefined =
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

  // REMOVE
  removeTransaction() {
    const data = this.dataReceived.data;

    if (data.category_transaction_id === 1) {
      let newDataBarang = {
        stok: data.stok - data.jumlah_barang,
      };
      this.apiService
        .updateBarang(data.barang_id, newDataBarang)
        .subscribe((res: any) => {
          this.apiService
            .deleteTransaction(data.id_transaction)
            .subscribe((res: any) => {
              console.log('deleted Successfully');
              this.closeModal();
            });
        });
    }
    if (data.category_transaction_id === 2) {
      let newDataBarang = {
        stok: data.stok + data.jumlah_barang,
      };
      this.apiService
        .updateBarang(data.barang_id, newDataBarang)
        .subscribe((res: any) => {
          this.apiService
            .deleteTransaction(data.id_transaction)
            .subscribe((res: any) => {
              console.log('deleted Successfully');
              this.closeModal();
            });
        });
    } else {
      this.closeModal();
    }
  }
}
