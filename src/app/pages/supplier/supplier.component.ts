import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {
  suppliers!: any;
  displaySuplier!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllSupplier();
  }
  getAllSupplier() {
    this.apiService.getAllSupplier().subscribe((res: any) => {
      this.suppliers = res.data;
      this.entires = this.suppliers.length;
      this.calculateTotalPages();
      this.updateDisplaySupplier();
    });
  }

  // TOOGLE MODAL
  toogleModal(category_toogle: number, supplier: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_SUPPLIER',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-supplier');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_SUPPLIER',
        users: supplier,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-supplier');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        users: supplier,
        funct: 'removeSupplier',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-supplier');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllSupplier();
      const modal = document.querySelector('#modal-supplier');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplaySupplier() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displaySuplier = this.suppliers.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplaySupplier();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplaySupplier();
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
