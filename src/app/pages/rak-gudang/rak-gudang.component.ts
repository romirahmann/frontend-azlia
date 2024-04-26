import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rak-gudang',
  templateUrl: './rak-gudang.component.html',
  styleUrls: ['./rak-gudang.component.scss'],
})
export class RakGudangComponent {
  rakBarang!: any;
  displayRakBarang!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllRakBarang();
  }
  getAllRakBarang() {
    this.apiService.getAllRak().subscribe((res: any) => {
      this.rakBarang = res.data;
      this.entires = this.rakBarang.length;
      this.calculateTotalPages();
      this.updateDisplayRakBarang();
    });
  }
  // TOOGLE MODAL
  toogleModal(category_toogle: number, rak: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_RAK',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-rak');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_RAK',
        data: rak,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-rak');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: rak,
        funct: 'removeRak',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-rak');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllRakBarang();
      const modal = document.querySelector('#modal-rak');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayRakBarang() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayRakBarang = this.rakBarang.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayRakBarang();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayRakBarang();
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
