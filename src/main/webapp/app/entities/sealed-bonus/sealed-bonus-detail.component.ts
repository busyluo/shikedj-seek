import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISealedBonus } from 'app/shared/model/sealed-bonus.model';

@Component({
    selector: 'jhi-sealed-bonus-detail',
    templateUrl: './sealed-bonus-detail.component.html'
})
export class SealedBonusDetailComponent implements OnInit {
    sealedBonus: ISealedBonus;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sealedBonus }) => {
            this.sealedBonus = sealedBonus;
        });
    }

    previousState() {
        window.history.back();
    }
}
