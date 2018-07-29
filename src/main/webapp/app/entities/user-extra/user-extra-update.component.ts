import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IUser, UserService } from 'app/core';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account';
import { IImage } from 'app/shared/model/image.model';
import { ImageService } from 'app/entities/image';

@Component({
    selector: 'jhi-user-extra-update',
    templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
    private _userExtra: IUserExtra;
    isSaving: boolean;

    users: IUser[];

    banks: IBankAccount[];

    images: IImage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userExtraService: UserExtraService,
        private userService: UserService,
        private bankAccountService: BankAccountService,
        private imageService: ImageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userExtra }) => {
            this.userExtra = userExtra;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.bankAccountService.query({ filter: 'userextra-is-null' }).subscribe(
            (res: HttpResponse<IBankAccount[]>) => {
                if (!this.userExtra.bank || !this.userExtra.bank.id) {
                    this.banks = res.body;
                } else {
                    this.bankAccountService.find(this.userExtra.bank.id).subscribe(
                        (subRes: HttpResponse<IBankAccount>) => {
                            this.banks = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.imageService.query({ filter: 'userextra-is-null' }).subscribe(
            (res: HttpResponse<IImage[]>) => {
                if (!this.userExtra.image || !this.userExtra.image.id) {
                    this.images = res.body;
                } else {
                    this.imageService.find(this.userExtra.image.id).subscribe(
                        (subRes: HttpResponse<IImage>) => {
                            this.images = [subRes.body].concat(res.body);
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
        if (this.userExtra.id !== undefined) {
            this.subscribeToSaveResponse(this.userExtraService.update(this.userExtra));
        } else {
            this.subscribeToSaveResponse(this.userExtraService.create(this.userExtra));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>) {
        result.subscribe((res: HttpResponse<IUserExtra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackBankAccountById(index: number, item: IBankAccount) {
        return item.id;
    }

    trackImageById(index: number, item: IImage) {
        return item.id;
    }
    get userExtra() {
        return this._userExtra;
    }

    set userExtra(userExtra: IUserExtra) {
        this._userExtra = userExtra;
    }
}
