import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../shared/models/product';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  products: Product[] = [];
  product: Product | null | undefined = null;
  argument2: any;
  isLoading: boolean = false;
  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  addToCart(product: Product) {
    const message = this._cartService.addItem(product, 1);
    this._snackBar.open(message, 'OK');
  }

  ngOnInit() {
    const routeParams = this._route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');
    this.argument2 = routeParams.get('argument2');
    this.isLoading = true;
    setTimeout(()=>{
      this._productsService.getProducts().subscribe((products) => {
        this.products = products
        this.product = this.products.find(
          (product) => product.id === productIdFromRoute
        );
          this.isLoading = false;
      });

    }, 2000)

  }
}
