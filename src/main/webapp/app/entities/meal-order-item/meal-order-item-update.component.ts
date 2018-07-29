import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMealOrderItem } from 'app/shared/model/meal-order-item.model';
import { MealOrderItemService } from './meal-order-item.service';
import { IDish } from 'app/shared/model/dish.model';
import { DishService } from 'app/entities/dish';
import { IMealOrder } from 'app/shared/model/meal-order.model';
import { MealOrderService } from 'app/entities/meal-order';

@Component({
    selector: 'jhi-meal-order-item-update',
    templateUrl: './meal-order-item-update.component.html'
})
export class MealOrderItemUpdateComponent implements OnInit {
    private _mealOrderItem: IMealOrderItem;
    isSaving: boolean;

    dishes: IDish[];

    mealorders: IMealOrder[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mealOrderItemService: MealOrderItemService,
        private dishService: DishService,
        private mealOrderService: MealOrderService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mealOrderItem }) => {
            this.mealOrderItem = mealOrderItem;
        });
        this.dishService.query({ filter: 'mealorderitem-is-null' }).subscribe(
            (res: HttpResponse<IDish[]>) => {
                if (!this.mealOrderItem.dish || !this.mealOrderItem.dish.id) {
                    this.dishes = res.body;
                } else {
                    this.dishService.find(this.mealOrderItem.dish.id).subscribe(
                        (subRes: HttpResponse<IDish>) => {
                            this.dishes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mealOrderService.query().subscribe(
            (res: HttpResponse<IMealOrder[]>) => {
                this.mealorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mealOrderItem.id !== undefined) {
            this.subscribeToSaveResponse(this.mealOrderItemService.update(this.mealOrderItem));
        } else {
            this.subscribeToSaveResponse(this.mealOrderItemService.create(this.mealOrderItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMealOrderItem>>) {
        result.subscribe((res: HttpResponse<IMealOrderItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDishById(index: number, item: IDish) {
        return item.id;
    }

    trackMealOrderById(index: number, item: IMealOrder) {
        return item.id;
    }
    get mealOrderItem() {
        return this._mealOrderItem;
    }

    set mealOrderItem(mealOrderItem: IMealOrderItem) {
        this._mealOrderItem = mealOrderItem;
    }
}
