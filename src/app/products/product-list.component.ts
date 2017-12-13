import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from './product'; 
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls : ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string = '';
    filteredProducts : IProduct[];
    products: IProduct[];

    constructor(private _productService: ProductService)
    {
        this.listFilter = 'cart';
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('OnInit');
        
        this._productService.getProducts()
                .subscribe( products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                            error => this.errorMessage = <any>error);

    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
                    product.productName.toLocaleLowerCase().indexOf(filterBy) != -1);
    }

    onRatingClicked(message: string) : void {
        console.log(message);
    }
}