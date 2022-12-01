import { GroceryService, IGrocery } from './grocery.service';
import { ProductService } from './product.service';
import { Injectable } from '@angular/core';

enum KEYS {
  products = 'products',
  grocery = 'grocery',
}
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private productService: ProductService,
    private groceryService: GroceryService
  ) {}

  public save() {
    const products = this.productService.products;
    const grocery = this.groceryService.activeGrocery;
    localStorage.setItem(KEYS.products, JSON.stringify(products));
    localStorage.setItem(KEYS.grocery, JSON.stringify(grocery));
  }

  public retrieve() {
    const init: IGrocery = {
      date: new Date().toISOString(),
      title: 'Grocery',
      productList: [],
      _id: '',
    };
    const grocery = localStorage.getItem(KEYS.grocery);
    const products = localStorage.getItem(KEYS.products);
    this.productService.products = JSON.parse(products || '[]');
    this.groceryService.activeGrocery = JSON.parse(
      grocery || JSON.stringify(init)
    );
  }
}
