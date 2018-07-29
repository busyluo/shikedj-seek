import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRestaurantType } from 'app/shared/model/restaurant-type.model';

@Component({
    selector: 'jhi-restaurant-type-detail',
    templateUrl: './restaurant-type-detail.component.html'
})
export class RestaurantTypeDetailComponent implements OnInit {
    restaurantType: IRestaurantType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ restaurantType }) => {
            this.restaurantType = restaurantType;
        });
    }

    previousState() {
        window.history.back();
    }
}
