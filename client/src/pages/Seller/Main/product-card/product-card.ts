import {Component, Input} from '@angular/core';
import {Product} from "../../../../core/model/Product";

/**
 * Generated class for the ProductCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html'
})
export class ProductCardComponent {

  text: string;

  @Input() product: Product

  constructor() {
  }

}
