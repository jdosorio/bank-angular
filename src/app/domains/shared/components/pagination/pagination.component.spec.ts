import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent], // Importar el componente standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 25;
    component.itemsPerPage = 5;
    fixture.detectChanges();
    expect(component.totalPages).toBe(5);
  });

  it('should calculate pages array correctly', () => {
    component.totalItems = 25;
    component.itemsPerPage = 5;
    fixture.detectChanges();
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should not change page or emit event on invalid page change', () => {
    const spy = jest.spyOn(component.pageChange, 'emit');
    component.onPageChange(0); // Invalid page number
    expect(component.currentPage).toBe(1); // Should stay on the initial page
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should render pagination buttons based on total pages', () => {
    component.totalItems = 30;
    component.itemsPerPage = 10;
    fixture.detectChanges();
    const buttons = debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(5);
  });

  it('should handle page click correctly', () => {
    const spy = jest.spyOn(component, 'onPageChange');
    component.totalItems = 30;
    component.itemsPerPage = 10;
    fixture.detectChanges();
    const pageButtons = debugElement.queryAll(By.css('button'));
    pageButtons[1].nativeElement.click();
    expect(component.onPageChange).toHaveBeenCalledWith(1);
  });
});
