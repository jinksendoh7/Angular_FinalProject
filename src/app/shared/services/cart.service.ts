import { Inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable, Observer } from 'rxjs';
import { ProductsService } from './products.service';
import { CartItem } from '../models/cart-item';
import { LocalStorageService } from './storage.service';


const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _storage: Storage;
  private _subscriptionObservable: Observable<ShoppingCart>;
  private _subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private _products: Product[] = [];

  constructor(
    private _productService: ProductsService,
    private _storageService: LocalStorageService,
  ) {
    this._storage = this._storageService.get();
      this._productService.getProducts().subscribe((products) => this._products = products);
    this._subscriptionObservable = new Observable<ShoppingCart>(
      (observer: Observer<ShoppingCart>) => {
        this._subscribers.push(observer);
        observer.next(this.retrieve());
        return () => {
          this._subscribers = this._subscribers.filter(
            (obs) => obs !== observer
          );
        };
      }
    );
  }



  public get(): Observable<ShoppingCart> {
    return this._subscriptionObservable;
  }

  public removeItem(productId:string, qty: number): string{
    const cart = this.retrieve();
    let current = this._products.find((p) => p.id === productId);
    let item = cart.items.filter((p) => p.productId !== productId);
    cart.items = item;
    console.log(current,'CURRENT')
    if(current){
       this._productService.updateQuantity(current, current.quantity + qty)
    }


    let message = 'The item was removed in your shopping cart.';
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
    return message;
  }
  public addItem(product: Product, quantity: number): string {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.id);

    if (item === undefined) {
      item = new CartItem();
      item.id = product.id,
      item.productId = product.id;
      item.name = product.name;
      item.pictureUrl = product.pictureUrl;
      item.description = product.description;
      item.price = product.price;
      cart.items.push(item);
      item.itemLeftQty = product.quantity - 1
    }
    else{
      item.itemLeftQty = product.quantity- 1
    }

    this._productService.updateQuantity(product, product.quantity - quantity);

    item.quantity += quantity;
    let message = 'Item added in your shopping cart.';


    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
    return message;
  }

  public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  private calculateCart(cart: ShoppingCart): void {
    console.log(cart,'<<');
    cart.itemsTotal = cart.items
      .map(
        (item) =>
          item.quantity *
          this._products.find((p) => p.id === item.productId)!.price
      )
      .reduce((previous, current) => previous + current, 0);
;
  }

  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this._storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
  }

  private save(cart: ShoppingCart): void {
    this._storage.setItem(CART_KEY, JSON.stringify(cart));
  }


  private dispatch(cart: ShoppingCart): void {
    this._subscribers.forEach((sub) => {
      try {
        sub.next(cart);
      } catch (e) {
        //
      }
    });
  }
}
