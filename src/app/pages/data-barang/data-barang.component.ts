import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-data-barang',
  templateUrl: './data-barang.component.html',
  styleUrls: ['./data-barang.component.scss'],
})
export class DataBarangComponent {
  barang!: any;
  displaybarang!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllBarang();
  }
  getAllBarang() {
    this.apiService.getAllBarang().subscribe((res: any) => {
      this.barang = res.data;
      this.entires = this.barang.length;
      this.calculateTotalPages();
      this.updateDisplayBarang();
    });
  }

  // TOOGLE MODAL
  toogleModal(category_toogle: number, barang: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_BARANG',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-barang');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_BARANG',
        data: barang,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-barang');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: barang,
        funct: 'removeUser',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-barang');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllBarang();
      const modal = document.querySelector('#modal-barang');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayBarang() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displaybarang = this.barang.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayBarang();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayBarang();
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
