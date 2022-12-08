import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public cart: Observable<ShoppingCart> | null = null;
  public itemCount: number = 0;
  public cartItems: any;
  public grossTotal: number = 0;
  product: Product | null | undefined = null;

  private _cartSubscription: Subscription | null = null;

  public constructor(
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}

  public emptyCart(): void {
    this._cartService.empty();
  }

  addToCart(product:Product) {

    const message = this._cartService.addItem(product, 1);
    this._snackBar.open(message, 'OK');
  }
  removeToCart(productId: string){
    const message = this._cartService.removeItem(productId);
    this._snackBar.open(message, 'OK');
  }

  public ngOnInit(): void {
    this._productsService.getProducts().subscribe((products) => this.products = products);
    this.cart = this._cartService.get();
    this._cartSubscription = this.cart.subscribe((cart) => {
      this.cartItems = cart.items.map((item) => {
        this.grossTotal += (item.price * item.quantity);
        let product = this.products.find((p) => p.id == item.productId);

        return { ...product,
          id: item.productId,
          quantity: item.quantity,
          name: item.name,
          pictureUrl: item.pictureUrl,
          description: item.description,
          itemLeftQty: item.itemLeftQty,
          price: item.price,
          productData: item,
         };
      });
      this.itemCount = cart.items
        .map((x) => x.quantity)
          .reduce((p, n) => p + n, 0);
      console.log(cart)
    });

  }

  public ngOnDestroy(): void {
    if (this._cartSubscription) {
      this._cartSubscription.unsubscribe();
    }
  }
}
