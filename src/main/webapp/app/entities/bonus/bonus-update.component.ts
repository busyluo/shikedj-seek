import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBonus } from 'app/shared/model/bonus.model';
import { BonusService } from './bonus.service';
import { IMealOrder } from 'app/shared/model/meal-order.model';
import { MealOrderService } from 'app/entities/meal-order';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-bonus-update',
    templateUrl: './bonus-update.component.html'
})
export class BonusUpdateComponent implements OnInit {
    private _bonus: IBonus;
    isSaving: boolean;

    orders: IMealOrder[];

    customers: ICustomer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bonusService: BonusService,
        private mealOrderService: MealOrderService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bonus }) => {
            this.bonus = bonus;
        });
        this.mealOrderService.query({ filter: 'bonus-is-null' }).subscribe(
            (res: HttpResponse<IMealOrder[]>) => {
                if (!this.bonus.order || !this.bonus.order.id) {
                    this.orders = res.body;
                } else {
                    this.mealOrderService.find(this.bonus.order.id).subscribe(
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
        if (this.bonus.id !== undefined) {
            this.subscribeToSaveResponse(this.bonusService.update(this.bonus));
        } else {
            this.subscribeToSaveResponse(this.bonusService.create(this.bonus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBonus>>) {
        result.subscribe((res: HttpResponse<IBonus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get bonus() {
        return this._bonus;
    }

    set bonus(bonus: IBonus) {
        this._bonus = bonus;
    }
}
