import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDish } from 'app/shared/model/dish.model';

@Component({
    selector: 'jhi-dish-detail',
    templateUrl: './dish-detail.component.html'
})
export class DishDetailComponent implements OnInit {
    dish: IDish;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dish }) => {
            this.dish = dish;
        });
    }

    previousState() {
        window.history.back();
    }
}
