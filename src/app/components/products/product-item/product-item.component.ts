import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { Product } from '../../../shared/models/product';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  constructor(private route: Router,
    private _cartService: CartService,
    private _snackBar: MatSnackBar) {
  }
  @Input() product: Product | null = null;

  addToCart(product: Product) {
    this._snackBar.open('Items added in your cart', 'OK');
    this._cartService.addItem(product, 1);
  }
  ngOnInit() {}



}
