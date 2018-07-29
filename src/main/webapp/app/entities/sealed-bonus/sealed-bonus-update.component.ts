import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISealedBonus } from 'app/shared/model/sealed-bonus.model';
import { SealedBonusService } from './sealed-bonus.service';
import { IMealOrder } from 'app/shared/model/meal-order.model';
import { MealOrderService } from 'app/entities/meal-order';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-sealed-bonus-update',
    templateUrl: './sealed-bonus-update.component.html'
})
export class SealedBonusUpdateComponent implements OnInit {
    private _sealedBonus: ISealedBonus;
    isSaving: boolean;

    orders: IMealOrder[];

    customers: ICustomer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sealedBonusService: SealedBonusService,
        private mealOrderService: MealOrderService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sealedBonus }) => {
            this.sealedBonus = sealedBonus;
        });
        this.mealOrderService.query({ filter: 'sealedbonus-is-null' }).subscribe(
            (res: HttpResponse<IMealOrder[]>) => {
                if (!this.sealedBonus.order || !this.sealedBonus.order.id) {
                    this.orders = res.body;
                } else {
                    this.mealOrderService.find(this.sealedBonus.order.id).subscribe(
                        (subRes: HttpResponse<IMealOrder>) => {
                            this.orders = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sealedBonus.id !== undefined) {
            this.subscribeToSaveResponse(this.sealedBonusService.update(this.sealedBonus));
        } else {
            this.subscribeToSaveResponse(this.sealedBonusService.create(this.sealedBonus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISealedBonus>>) {
        result.subscribe((res: HttpResponse<ISealedBonus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMealOrderById(index: number, item: IMealOrder) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
    get sealedBonus() {
        return this._sealedBonus;
    }

    set sealedBonus(sealedBonus: ISealedBonus) {
        this._sealedBonus = sealedBonus;
    }
}
