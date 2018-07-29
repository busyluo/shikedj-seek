import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealOrder } from 'app/shared/model/meal-order.model';

@Component({
    selector: 'jhi-meal-order-detail',
    templateUrl: './meal-order-detail.component.html'
})
export class MealOrderDetailComponent implements OnInit {
    mealOrder: IMealOrder;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealOrder }) => {
            this.mealOrder = mealOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
