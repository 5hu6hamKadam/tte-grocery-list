import { StorageService } from './../services/storage.service';
import { IProduct, ProductService } from './../services/product.service';
import { GroceryService, IGrocery } from './../services/grocery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.page.html',
  styleUrls: ['./grocery.page.scss'],
})
export class GroceryPage implements OnInit {
  public grocery: IGrocery;
  public isGroceryVisible = true;
  public searchText = '';
  public searchedProducts: IProduct[] = [];
  public newProduct!: IProduct;
  public isModelOpen = false;
  public units = ['kg', 'gm', 'l', 'ml', 'dozen', 'units'];

  constructor(
    private groceryService: GroceryService,
    private productService: ProductService,
    private storageService: StorageService
  ) {
    this.grocery = this.groceryService.activeGrocery;
  }

  ngOnInit() {}

  public getTotalPrice() {
    return (
      this.grocery.productList?.reduce(
        (acc, i) =>
          acc +
          ((i.quantity && i.currentPrice && i.quantity * i.currentPrice) || 0),
        0
      ) || 0
    );
  }

  public setIsGrocery(value: boolean) {
    this.isGroceryVisible = value;
  }

  public getSearchedProduct(): void {
    this.searchedProducts = this.productService.getSearchedProduct(
      this.searchText
    );
  }

  public async onProductAdd(product: IProduct) {
    this.searchText = '';
    this.searchedProducts = [];
    await this.groceryService.addProduct(product);
  }

  public async onProductDelete(product: IProduct) {
    await this.groceryService.deleteProduct(product);
  }

  public openModel() {
    this.newProduct = {
      title: this.searchText,
      unit: 'kg',
    };
    this.isModelOpen = true;
  }
  public closeModel() {
    this.searchText = '';
    this.isModelOpen = false;
  }

  public addProduct() {
    this.productService.addProduct(this.newProduct);
    this.newProduct = {
      title: '',
      unit: 'kg',
    };
  }

  public save() {
    this.storageService.save();
  }
}
