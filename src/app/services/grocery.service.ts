import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IProduct } from './product.service';

export interface IGrocery {
  _id: string;
  title: string;
  date: string;
  productList: IProduct[];
}

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  public activeGrocery: IGrocery = {
    _id: '1',
    date: new Date().toISOString(),
    title: 'Sample grocery',
    productList: [
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
    ],
  };
  constructor(private toastController: ToastController) {}

  public async addProduct(product: IProduct) {
    const productIndex = this.activeGrocery.productList.findIndex(
      (p) => p.title === product.title
    );
    if (productIndex < 0) {
      this.activeGrocery.productList.push(product);
      const toast = await this.toastController.create({
        message: 'Product added successfully!',
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
  public async deleteProduct(product: IProduct) {
    const productIndex = this.activeGrocery.productList.findIndex(
      (p) => p.title === product.title
    );
    if (productIndex < 0) {
      const toast = await this.toastController.create({
        message: 'Product not present in list!',
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    } else {
      this.activeGrocery.productList.splice(productIndex, 1);
      const toast = await this.toastController.create({
        message: 'Product deleted successfully!',
        duration: 1500,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
    }
  }
}
