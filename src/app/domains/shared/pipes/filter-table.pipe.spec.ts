import { FilterTablePipe } from './filter-table.pipe';
import { Product } from '../../../models/product';

describe('FilterTablePipe', () => {
  let pipe: FilterTablePipe;

  beforeEach(() => {
    pipe = new FilterTablePipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same list if searchTerm is empty', () => {
    const products: Product[] = [
      { id: '1', name: 'Product Alpha', description: 'Description Alpha', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
      { id: '2', name: 'Product Beta', description: 'Description Beta', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
    ];

    const result = pipe.transform(products, '');
    expect(result).toEqual(products);
  });

  it('should return the same list if searchTerm length is less than 3', () => {
    const products: Product[] = [
      { id: '1', name: 'Product Alpha', description: 'Description Alpha', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
      { id: '2', name: 'Product Beta', description: 'Description Beta', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
    ];

    const result = pipe.transform(products, 'pr');
    expect(result).toEqual(products);
  });

  it('should filter products by searchTerm', () => {
    const products: Product[] = [
      { id: '1', name: 'Product Alpha', description: 'Description Alpha', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
      { id: '2', name: 'Product Beta', description: 'Description Beta', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
    ];

    const result = pipe.transform(products, 'beta');
    expect(result).toEqual([
      { id: '2', name: 'Product Beta', description: 'Description Beta', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
    ]);
  });

  it('should return an empty list if no products match the searchTerm', () => {
    const products: Product[] = [
      { id: '1', name: 'Product Alpha', description: 'Description Alpha', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
      { id: '2', name: 'Product Beta', description: 'Description Beta', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
    ];

    const result = pipe.transform(products, 'berry');
    expect(result).toEqual([]);
  });


  it('should handle case where searchTerm is found in product name', () => {
    const products: Product[] = [
      { id: '1', name: 'Product Alpha', description: 'Description Alpha', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
      { id: '2', name: 'Product Beta', description: 'Description Beta', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
    ];

    const result = pipe.transform(products, 'Alpha');
    expect(result).toEqual([
      { id: '1', name: 'Product Alpha', description: 'Description Alpha', logo: 'google.com' , date_release: '2024-01-01', date_revision: '2025-01-01' },
    ]);
  });
});
