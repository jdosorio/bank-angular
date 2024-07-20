import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: ProductService;
  let router: Router;
  let route: ActivatedRoute;

  const mockProductService = {
    getProduct: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    verifyId: jest.fn(),
    verifyReleaseDate: jest.fn()
  };

  const mockRouter = {
    navigate: jest.fn()
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn()
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProductDetailComponent],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and set mode to create', () => {
    expect(component.productForm).toBeTruthy();
    expect(component.mode).toBe('create');
  });

  it('should disable date_revision field on init', () => {
    const dateRevisionControl = component.productForm.get('date_revision');
    expect(dateRevisionControl?.disabled).toBeTruthy();
  });

  it('should load product data on edit mode', () => {
    const product: Product = { id: '1', name: 'Test Product', description: 'Test Description', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' };
    mockActivatedRoute.snapshot.paramMap.get = jest.fn().mockReturnValue('1');
    mockActivatedRoute.snapshot.paramMap.get = jest.fn().mockReturnValue('edit');
    jest.spyOn(productService, 'getProduct').mockReturnValue(of(product));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.mode).toBe('edit');

  });

  it('should update a product when mode is edit', () => {
    const product: Product = { id: '1', name: 'Test Product', description: 'Test Description', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' };
    mockActivatedRoute.snapshot.paramMap.get = jest.fn().mockReturnValue('1');
    component.productForm.setValue(product);
    jest.spyOn(productService, 'updateProduct').mockReturnValue(of(null));

    component.saveProduct();

    expect(productService.updateProduct).toHaveBeenCalledWith('1', product);
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should update the review date correctly', () => {
    const releaseDate = '2024-01-01';
    component.updateReviewDate(releaseDate);

    const expectedDate = new Date(releaseDate);
    expectedDate.setFullYear(expectedDate.getFullYear() + 1);
    const expectedFormattedDate = component.formatDate(expectedDate);

    expect(component.productForm.get('date_revision')?.value).toBe(expectedFormattedDate);
  });

  it('should reset the form on cleanForm()', () => {
    component.cleanForm();

    expect(component.productForm.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null
    });
  });
});
