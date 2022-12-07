import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { ProductsService } from '../../../shared/services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  active: any = 'All';
  allProducts: Product[] = []
  allCount: number = 0;
  public isLoading: boolean =  false;


  categories = ['All','Bags','Hats','Jackets','Shirts'];
  constructor(private _productsService: ProductsService) {
    this.isLoading = true;
    setTimeout(()=>{
      this._productsService.getProducts().subscribe((products) => {
        this.products = products
        this.allProducts = this.products;
      });
      this.isLoading = false}, 2000)
  }


  handleFilter = (val: string)=>{
  this.active = val;
  this.isLoading = true;
      setTimeout(()=>{
          if(this.active != 'All'){
              this.products = this.allProducts.filter((d: Product) =>d.category === this.active );
          }
          else{
            this.products = this.allProducts;
          }
          this.isLoading =false;
      }, 2000)


  }

  ngOnInit() {

  }

}
