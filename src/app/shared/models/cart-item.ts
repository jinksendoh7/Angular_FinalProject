import { Product } from "./product";

export class CartItem {
  public productId: any;
  public id: string = '';
  public quantity: number = 0;
  public name: string = '';
  public pictureUrl: string = '';
  public description: string = '';
  public itemLeftQty: number = 0;
  public price: number = 0;
  public productInfo: Product[] = [];
}
