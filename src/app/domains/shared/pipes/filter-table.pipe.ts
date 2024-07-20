import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../models/product';


@Pipe({
  name: 'filter',
  standalone: true // Hacer el pipe standalone
})
export class FilterTablePipe implements PipeTransform {

  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm || searchTerm.length < 3) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
