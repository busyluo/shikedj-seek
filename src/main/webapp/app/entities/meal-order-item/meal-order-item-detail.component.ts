import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealOrderItem } from 'app/shared/model/meal-order-item.model';

@Component({
    selector: 'jhi-meal-order-item-detail',
    templateUrl: './meal-order-item-detail.component.html'
})
export class MealOrderItemDetailComponent implements OnInit {
    mealOrderItem: IMealOrderItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealOrderItem }) => {
            this.mealOrderItem = mealOrderItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
