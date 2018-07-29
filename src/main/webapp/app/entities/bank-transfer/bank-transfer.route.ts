import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankTransfer } from 'app/shared/model/bank-transfer.model';
import { BankTransferService } from './bank-transfer.service';
import { BankTransferComponent } from './bank-transfer.component';
import { BankTransferDetailComponent } from './bank-transfer-detail.component';
import { BankTransferUpdateComponent } from './bank-transfer-update.component';
import { BankTransferDeletePopupComponent } from './bank-transfer-delete-dialog.component';
import { IBankTransfer } from 'app/shared/model/bank-transfer.model';

@Injectable({ providedIn: 'root' })
export class BankTransferResolve implements Resolve<IBankTransfer> {
    constructor(private service: BankTransferService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bankTransfer: HttpResponse<BankTransfer>) => bankTransfer.body));
        }
        return of(new BankTransfer());
    }
}

export const bankTransferRoute: Routes = [
    {
        path: 'bank-transfer',
        component: BankTransferComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bankTransfer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-transfer/:id/view',
        component: BankTransferDetailComponent,
        resolve: {
            bankTransfer: BankTransferResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bankTransfer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-transfer/new',
        component: BankTransferUpdateComponent,
        resolve: {
            bankTransfer: BankTransferResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bankTransfer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bank-transfer/:id/edit',
        component: BankTransferUpdateComponent,
        resolve: {
            bankTransfer: BankTransferResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bankTransfer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankTransferPopupRoute: Routes = [
    {
        path: 'bank-transfer/:id/delete',
        component: BankTransferDeletePopupComponent,
        resolve: {
            bankTransfer: BankTransferResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'seekApp.bankTransfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
