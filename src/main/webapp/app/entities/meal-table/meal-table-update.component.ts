import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMealTable } from 'app/shared/model/meal-table.model';
import { MealTableService } from './meal-table.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant';

@Component({
    selector: 'jhi-meal-table-update',
    templateUrl: './meal-table-update.component.html'
})
export class MealTableUpdateComponent implements OnInit {
    private _mealTable: IMealTable;
    isSaving: boolean;

    restaurants: IRestaurant[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mealTableService: MealTableService,
        private restaurantService: RestaurantService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealTable }) => {
            this.mealTable = mealTable;
        });
        this.restaurantService.query().subscribe(
            (res: HttpResponse<IRestaurant[]>) => {
                this.restaurants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealTable.id !== undefined) {
            this.subscribeToSaveResponse(this.mealTableService.update(this.mealTable));
        } else {
            this.subscribeToSaveResponse(this.mealTableService.create(this.mealTable));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMealTable>>) {
        result.subscribe((res: HttpResponse<IMealTable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRestaurantById(index: number, item: IRestaurant) {
        return item.id;
    }
    get mealTable() {
        return this._mealTable;
    }

    set mealTable(mealTable: IMealTable) {
        this._mealTable = mealTable;
    }
}
