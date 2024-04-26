import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-satuan-barang',
  templateUrl: './satuan-barang.component.html',
  styleUrls: ['./satuan-barang.component.scss'],
})
export class SatuanBarangComponent {
  satuanBarang!: any;
  displaySatuanBarang!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllSatuanBarang();
  }
  getAllSatuanBarang() {
    this.apiService.getAllSatuan().subscribe((res: any) => {
      this.satuanBarang = res.data;
      this.entires = this.satuanBarang.length;
      this.calculateTotalPages();
      this.updateDisplaySatuanBarang();
    });
  }
  // TOOGLE MODAL
  toogleModal(category_toogle: number, satuan: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_SATUAN',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-satuan');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_SATUAN',
        data: satuan,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-satuan');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: satuan,
        funct: 'removeSatuan',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-satuan');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllSatuanBarang();
      const modal = document.querySelector('#modal-satuan');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplaySatuanBarang() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displaySatuanBarang = this.satuanBarang.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplaySatuanBarang();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplaySatuanBarang();
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
