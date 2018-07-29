import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from './restaurant.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';
import { IRestaurantType } from 'app/shared/model/restaurant-type.model';
import { RestaurantTypeService } from 'app/entities/restaurant-type';
import { IAgentArea } from 'app/shared/model/agent-area.model';
import { AgentAreaService } from 'app/entities/agent-area';
import { IRestauranteur } from 'app/shared/model/restauranteur.model';
import { RestauranteurService } from 'app/entities/restauranteur';

@Component({
    selector: 'jhi-restaurant-update',
    templateUrl: './restaurant-update.component.html'
})
export class RestaurantUpdateComponent implements OnInit {
    private _restaurant: IRestaurant;
    isSaving: boolean;

    locations: ILocation[];

    restauranttypes: IRestaurantType[];

    agentareas: IAgentArea[];

    restauranteurs: IRestauranteur[];
    openTime: string;
    closeTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private restaurantService: RestaurantService,
        private locationService: LocationService,
        private restaurantTypeService: RestaurantTypeService,
        private agentAreaService: AgentAreaService,
        private restauranteurService: RestauranteurService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ restaurant }) => {
            this.restaurant = restaurant;
        });
        this.locationService.query({ filter: 'restaurant-is-null' }).subscribe(
            (res: HttpResponse<ILocation[]>) => {
                if (!this.restaurant.location || !this.restaurant.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.restaurant.location.id).subscribe(
                        (subRes: HttpResponse<ILocation>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.restaurantTypeService.query().subscribe(
            (res: HttpResponse<IRestaurantType[]>) => {
                this.restauranttypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.agentAreaService.query().subscribe(
            (res: HttpResponse<IAgentArea[]>) => {
                this.agentareas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.restauranteurService.query().subscribe(
            (res: HttpResponse<IRestauranteur[]>) => {
                this.restauranteurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.restaurant.openTime = moment(this.openTime, DATE_TIME_FORMAT);
        this.restaurant.closeTime = moment(this.closeTime, DATE_TIME_FORMAT);
        if (this.restaurant.id !== undefined) {
            this.subscribeToSaveResponse(this.restaurantService.update(this.restaurant));
        } else {
            this.subscribeToSaveResponse(this.restaurantService.create(this.restaurant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurant>>) {
        result.subscribe((res: HttpResponse<IRestaurant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }

    trackRestaurantTypeById(index: number, item: IRestaurantType) {
        return item.id;
    }

    trackAgentAreaById(index: number, item: IAgentArea) {
        return item.id;
    }

    trackRestauranteurById(index: number, item: IRestauranteur) {
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
    get restaurant() {
        return this._restaurant;
    }

    set restaurant(restaurant: IRestaurant) {
        this._restaurant = restaurant;
        this.openTime = moment(restaurant.openTime).format(DATE_TIME_FORMAT);
        this.closeTime = moment(restaurant.closeTime).format(DATE_TIME_FORMAT);
    }
}
