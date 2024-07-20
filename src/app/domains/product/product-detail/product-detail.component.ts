import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  fb = inject(FormBuilder);
  productForm: FormGroup;
  product!:Product;
  mode: 'create' | 'edit' = 'create'; // Modo predeterminado es 'create'

  constructor(
    private route: ActivatedRoute,
  ) {
    this.productForm = this.fb.group({
      id: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(10)], this.validateUniqueId.bind(this)],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required], this.validateReleaseDate.bind(this)],
      date_revision: ['', [Validators.required]]
    });


  }

  ngOnInit(): void {
    this.productForm.get('date_revision')?.disable();
    const id = this.route.snapshot.paramMap.get('id');
    const mode = this.route.snapshot.paramMap.get('mode');

    if (mode === 'edit' && id) {
      this.mode = mode;
      this.productForm.get('id')?.disable();
      this.productService.getProduct(id).subscribe(data => {
        this.productForm.patchValue(data);
      });
    } else if (mode === 'create') {
      this.mode = 'create';
    }
  }

  saveProduct(): void {
    this.productForm.get('date_revision')?.enable();
    this.productForm.get('id')?.enable();
    if (this.mode === 'create') {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else if (this.mode === 'edit') {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.productService.updateProduct(this.productForm.value.id, this.productForm.value).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }

  cleanForm(){
    this.productForm.reset();
  }

  validateUniqueId(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    return this.productService.verifyId(control.value).pipe(
      map((response) => response ? { uniqueId: true } : { uniqueId: false })
    );
  }

  validateReleaseDate(control: AbstractControl) {
    if (!control.value) {
      return null;
    }

    const dateParts = control.value.split('-');
    const selectedDate = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today ? of({ invalidReleaseDate: false }) : of({ invalidReleaseDate: true });
  }

  updateReviewDate(releaseDate: string): void {
    const date = new Date(releaseDate);
    date.setFullYear(date.getFullYear() + 1);
    this.productForm.get('date_revision')?.setValue(this.formatDate(date));
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
