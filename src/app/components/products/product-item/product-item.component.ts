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
    const message = this._cartService.addItem(product, 1);
    this._snackBar.open(message, 'OK');
  }
  ngOnInit() {}



}
