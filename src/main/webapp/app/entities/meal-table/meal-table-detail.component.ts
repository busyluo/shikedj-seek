import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealTable } from 'app/shared/model/meal-table.model';

@Component({
    selector: 'jhi-meal-table-detail',
    templateUrl: './meal-table-detail.component.html'
})
export class MealTableDetailComponent implements OnInit {
    mealTable: IMealTable;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mealTable }) => {
            this.mealTable = mealTable;
        });
    }

    previousState() {
        window.history.back();
    }
}
