import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor( private store: AngularFirestore) {}

  @Output() event = new EventEmitter();
  products = this.store.collection('Products').valueChanges(
    {
      idField: 'id'
    }
  ) as Observable<Product[]>;


  getProducts() : Observable<Product[]> {
    return this.products;
  }

  updateQuantity(product: Product, qtyLeft: number): void{
    product.quantity = qtyLeft;
    console.log(product.id, qtyLeft,'QTY');
    this.store.collection('Products').doc(product.id).update(product);

  }
}
