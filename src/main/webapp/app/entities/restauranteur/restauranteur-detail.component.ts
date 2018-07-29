import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRestauranteur } from 'app/shared/model/restauranteur.model';

@Component({
    selector: 'jhi-restauranteur-detail',
    templateUrl: './restauranteur-detail.component.html'
})
export class RestauranteurDetailComponent implements OnInit {
    restauranteur: IRestauranteur;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ restauranteur }) => {
            this.restauranteur = restauranteur;
        });
    }

    previousState() {
        window.history.back();
    }
}
