import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../shared/models/product';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  products: Product[] = [];
  product: Product | null | undefined = null;
  argument2: any;

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _route: ActivatedRoute
  ) {}

  addToCart(product: Product) {
    this._cartService.addItem(product, 1);
  }

  ngOnInit() {
    const routeParams = this._route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.argument2 = routeParams.get('argument2');

    this._productsService.getProducts().subscribe((products) => this.products = products);
    this.product = this.products.find(
      (product) => product.id === productIdFromRoute
    );
  }
}
