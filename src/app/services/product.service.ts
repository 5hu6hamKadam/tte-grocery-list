import { Injectable } from '@angular/core';

export interface IProduct {
  title: string;
  unit: 'kg' | 'gm' | 'l' | 'ml' | 'dozen' | 'units';
  quantity?: number;
  minPrice?: number;
  minPriceDate?: number;
  currentPrice?: number;
  isPurchased?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: IProduct[] = [
    {
      title: 'Sugar',
      unit: 'kg',
      minPrice: 20,
      quantity: 1,
    },
    {
      title: 'Oil',
      unit: 'l',
      minPrice: 20,
      quantity: 20,
    },
    {
      title: 'Banana',
      unit: 'dozen',
      minPrice: 20,
      quantity: 1,
    },
    {
      title: 'tomato',
      unit: 'dozen',
      minPrice: 20,
      quantity: 1,
    },
    {
      title: 'ginger',
      unit: 'dozen',
      minPrice: 20,
      quantity: 1,
    },
  ];
  constructor() {}

  public getSearchedProduct(query: string) {
    return (
      this.products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      ) || []
    );
  }

  public addProduct(product: IProduct) {
    const productIndex = this.products.findIndex(
      (p) => p.title === product.title
    );
    if (productIndex < 0) {
      this.products.push(product);
    }
  }
}
