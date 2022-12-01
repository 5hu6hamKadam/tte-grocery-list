import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

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
  constructor(private toastController: ToastController) {}

  public getSearchedProduct(query: string) {
    return (
      this.products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      ) || []
    );
  }

  public async addProduct(product: IProduct) {
    const productIndex = this.products.findIndex(
      (p) => p.title === product.title
    );
    if (productIndex < 0) {
      this.products.push(product);
      const toast = await this.toastController.create({
        message: 'Added new Product',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      });

      await toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Product already present in list!',
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      });

      await toast.present();
    }
  }
}
