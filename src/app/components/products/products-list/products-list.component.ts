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

  constructor(private _productsService: ProductsService) {}

  ngOnInit() {
    this._productsService.getProducts().subscribe((products) => this.products = products);
  }
}
