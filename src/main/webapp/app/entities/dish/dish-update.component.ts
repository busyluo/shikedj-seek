import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDish } from 'app/shared/model/dish.model';
import { DishService } from './dish.service';
import { ICuisine } from 'app/shared/model/cuisine.model';
import { CuisineService } from 'app/entities/cuisine';

@Component({
    selector: 'jhi-dish-update',
    templateUrl: './dish-update.component.html'
})
export class DishUpdateComponent implements OnInit {
    private _dish: IDish;
    isSaving: boolean;

    cuisines: ICuisine[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private dishService: DishService,
        private cuisineService: CuisineService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dish }) => {
            this.dish = dish;
        });
        this.cuisineService.query().subscribe(
            (res: HttpResponse<ICuisine[]>) => {
                this.cuisines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dish.id !== undefined) {
            this.subscribeToSaveResponse(this.dishService.update(this.dish));
        } else {
            this.subscribeToSaveResponse(this.dishService.create(this.dish));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDish>>) {
        result.subscribe((res: HttpResponse<IDish>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCuisineById(index: number, item: ICuisine) {
        return item.id;
    }
    get dish() {
        return this._dish;
    }

    set dish(dish: IDish) {
        this._dish = dish;
    }
}
