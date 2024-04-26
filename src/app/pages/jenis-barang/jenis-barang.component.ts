import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-jenis-barang',
  templateUrl: './jenis-barang.component.html',
  styleUrls: ['./jenis-barang.component.scss'],
})
export class JenisBarangComponent {
  jenisBarang!: any;
  displayJenisBarang!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllJenisBarang();
  }
  getAllJenisBarang() {
    this.apiService.getAllJenis().subscribe((res: any) => {
      this.jenisBarang = res.data;
      this.entires = this.jenisBarang.length;
      this.calculateTotalPages();
      this.updateDisplayJenisBarang();
    });
  }
  // TOOGLE MODAL
  toogleModal(category_toogle: number, jenis: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_JENIS',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-jenis');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_JENIS',
        data: jenis,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-jenis');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: jenis,
        funct: 'removeJenis',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-jenis');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllJenisBarang();
      const modal = document.querySelector('#modal-jenis');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayJenisBarang() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayJenisBarang = this.jenisBarang.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayJenisBarang();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayJenisBarang();
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
