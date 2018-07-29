import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICuisine } from 'app/shared/model/cuisine.model';
import { CuisineService } from './cuisine.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant';

@Component({
    selector: 'jhi-cuisine-update',
    templateUrl: './cuisine-update.component.html'
})
export class CuisineUpdateComponent implements OnInit {
    private _cuisine: ICuisine;
    isSaving: boolean;

    restaurants: IRestaurant[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private cuisineService: CuisineService,
        private restaurantService: RestaurantService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cuisine }) => {
            this.cuisine = cuisine;
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
        if (this.cuisine.id !== undefined) {
            this.subscribeToSaveResponse(this.cuisineService.update(this.cuisine));
        } else {
            this.subscribeToSaveResponse(this.cuisineService.create(this.cuisine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICuisine>>) {
        result.subscribe((res: HttpResponse<ICuisine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get cuisine() {
        return this._cuisine;
    }

    set cuisine(cuisine: ICuisine) {
        this._cuisine = cuisine;
    }
}
