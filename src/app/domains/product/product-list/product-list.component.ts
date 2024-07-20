import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';
import { FilterTablePipe } from '../../shared/pipes/filter-table.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PopupComponent } from '../../shared/popup/popup.component';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterTablePipe,
    PaginationComponent,
    PopupComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class TableComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private modalService = inject(ModalService);
  products:Product[] = [];
  searchTerm = signal<string>('');
  recordsPerPage = signal<number>(5);
  filterTable:string = '';
  currentPage = signal<number>(1);
  contextMenuProduct: Product | null = null;
  isMenuVisible: boolean = false;
  selectedProduct: Product | null = null;


  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.data;
      },
      error: () => {},
    });
  }

  goCreate(): void {
    this.router.navigate(['/product/create']);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage() - 1) * this.recordsPerPage();
    const endIndex = startIndex + this.recordsPerPage();
    return this.products.slice(startIndex, endIndex);
  }


  toggleMenu(product: Product, event: MouseEvent): void {
    event.stopPropagation(); // Evita que el clic en el botón cierre el menú
    if (this.selectedProduct === product) {
      this.isMenuVisible = !this.isMenuVisible; // Alterna la visibilidad
    } else {
      this.isMenuVisible = true;
      this.selectedProduct = product; // Establece el producto seleccionado
    }
  }

  isMenuOpen(product: Product): boolean {
    return this.contextMenuProduct === product;
  }

  editProduct(product: Product): void {
    this.router.navigate(['/product/edit', product.id]);
  }

  showModal(product: Product): void {
    this.selectedProduct = product;
    this.modalService.open();
  }

  deleteProduct(): void {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== this.selectedProduct?.id);
          this.selectedProduct = null;
        },
        error: () => {}
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!(event.target as HTMLElement).closest('.container-context')) {
      this.isMenuVisible = false;
    }
  }

}
