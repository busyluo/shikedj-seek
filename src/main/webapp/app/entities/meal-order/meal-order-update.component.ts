import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IMealOrder } from 'app/shared/model/meal-order.model';
import { MealOrderService } from './meal-order.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant';

@Component({
    selector: 'jhi-meal-order-update',
    templateUrl: './meal-order-update.component.html'
})
export class MealOrderUpdateComponent implements OnInit {
    private _mealOrder: IMealOrder;
    isSaving: boolean;

    restaurants: IRestaurant[];
    time: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private mealOrderService: MealOrderService,
        private restaurantService: RestaurantService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealOrder }) => {
            this.mealOrder = mealOrder;
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
        this.mealOrder.time = moment(this.time, DATE_TIME_FORMAT);
        if (this.mealOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.mealOrderService.update(this.mealOrder));
        } else {
            this.subscribeToSaveResponse(this.mealOrderService.create(this.mealOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMealOrder>>) {
        result.subscribe((res: HttpResponse<IMealOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get mealOrder() {
        return this._mealOrder;
    }

    set mealOrder(mealOrder: IMealOrder) {
        this._mealOrder = mealOrder;
        this.time = moment(mealOrder.time).format(DATE_TIME_FORMAT);
    }
}
