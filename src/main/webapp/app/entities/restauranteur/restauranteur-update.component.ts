import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRestauranteur } from 'app/shared/model/restauranteur.model';
import { RestauranteurService } from './restauranteur.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
    selector: 'jhi-restauranteur-update',
    templateUrl: './restauranteur-update.component.html'
})
export class RestauranteurUpdateComponent implements OnInit {
    private _restauranteur: IRestauranteur;
    isSaving: boolean;

    users: IUserExtra[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private restauranteurService: RestauranteurService,
        private userExtraService: UserExtraService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ restauranteur }) => {
            this.restauranteur = restauranteur;
        });
        this.userExtraService.query({ filter: 'restauranteur-is-null' }).subscribe(
            (res: HttpResponse<IUserExtra[]>) => {
                if (!this.restauranteur.user || !this.restauranteur.user.id) {
                    this.users = res.body;
                } else {
                    this.userExtraService.find(this.restauranteur.user.id).subscribe(
                        (subRes: HttpResponse<IUserExtra>) => {
                            this.users = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.restauranteur.id !== undefined) {
            this.subscribeToSaveResponse(this.restauranteurService.update(this.restauranteur));
        } else {
            this.subscribeToSaveResponse(this.restauranteurService.create(this.restauranteur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRestauranteur>>) {
        result.subscribe((res: HttpResponse<IRestauranteur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserExtraById(index: number, item: IUserExtra) {
        return item.id;
    }
    get restauranteur() {
        return this._restauranteur;
    }

    set restauranteur(restauranteur: IRestauranteur) {
        this._restauranteur = restauranteur;
    }
}
