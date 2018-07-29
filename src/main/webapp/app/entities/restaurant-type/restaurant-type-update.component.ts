import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRestaurantType } from 'app/shared/model/restaurant-type.model';
import { RestaurantTypeService } from './restaurant-type.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant';

@Component({
    selector: 'jhi-restaurant-type-update',
    templateUrl: './restaurant-type-update.component.html'
})
export class RestaurantTypeUpdateComponent implements OnInit {
    private _restaurantType: IRestaurantType;
    isSaving: boolean;

    restaurants: IRestaurant[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private restaurantTypeService: RestaurantTypeService,
        private restaurantService: RestaurantService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ restaurantType }) => {
            this.restaurantType = restaurantType;
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
        if (this.restaurantType.id !== undefined) {
            this.subscribeToSaveResponse(this.restaurantTypeService.update(this.restaurantType));
        } else {
            this.subscribeToSaveResponse(this.restaurantTypeService.create(this.restaurantType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurantType>>) {
        result.subscribe((res: HttpResponse<IRestaurantType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get restaurantType() {
        return this._restaurantType;
    }

    set restaurantType(restaurantType: IRestaurantType) {
        this._restaurantType = restaurantType;
    }
}
