import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  transactions!: any;
  displayTransaction!: any;
  dataReceived: any;

  formFilter!: FormGroup;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}
  ngOnInit() {
    this.getAllTransaction();
    this.createFormFilter();
  }
  createFormFilter() {
    this.formFilter = this.fb.group({
      date: ['', Validators.required],
      tgl_kadaluarsa: ['', Validators.required],
      no_rak: ['', Validators.required],
    });
  }

  getAllTransaction() {
    this.apiService.getAllTransaction().subscribe((res: any) => {
      this.transactions = res.data;
      this.entires = this.transactions.length;
      this.calculateTotalPages();
      this.updateDisplayTransaction();
    });
  }

  filter() {
    // console.log(this.formFilter.controls['date'].valid);
    // BY KADALUARSA
    if (this.formFilter.controls['tgl_kadaluarsa'].valid) {
      let data = this.formFilter.value;
      let arrayKadaluarsa = data.tgl_kadaluarsa.split('-');
      let day = arrayKadaluarsa[2];
      let month = arrayKadaluarsa[1];
      let year = arrayKadaluarsa[0];

      this.apiService
        .getTransactionByKadaluarsa(month, year, day)
        .subscribe((res: any) => {
          this.transactions = res.data;
          this.entires = this.transactions.length;
          this.calculateTotalPages();
          this.updateDisplayTransaction();
        });
    }
    // BY DATE
    if (this.formFilter.controls['date'].valid) {
      let data = this.formFilter.value;
      let arrayDate = data.date.split('-');
      let month = arrayDate[1];
      let year = arrayDate[0];
      // console.log(day, month, year);
      this.apiService
        .getTransactionByDate(month, year)
        .subscribe((res: any) => {
          this.transactions = res.data;
          this.entires = this.transactions.length;
          this.calculateTotalPages();
          this.updateDisplayTransaction();
        });
    }
    // BY RAK
    if (this.formFilter.controls['no_rak'].valid) {
      let data = this.formFilter.value;
      let no_rak = data.no_rak;
      console.log(no_rak);
      // console.log(day, month, year);
      this.apiService.getTransactionByRak(no_rak).subscribe((res: any) => {
        this.transactions = res.data;
        this.entires = this.transactions.length;
        this.calculateTotalPages();
        this.updateDisplayTransaction();
      });
    }
  }

  // TOOGLE MODAL
  toogleModal(category_toogle: number, transaction: any) {
    if (category_toogle === 1) {
      let data = {
        category: 'REMOVE_MODAL',
        data: transaction,
        funct: 'removeTransaction',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-transaction');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllTransaction();
      const modal = document.querySelector('#modal-transaction');
      modal?.classList.toggle('hidden');
    }
  }

  toogleFilter() {
    const filter = document.querySelector('.sort');
    filter?.classList.toggle('hidden');
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayTransaction() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayTransaction = this.transactions.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayTransaction();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayTransaction();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
