import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBonus } from 'app/shared/model/bonus.model';

@Component({
    selector: 'jhi-bonus-detail',
    templateUrl: './bonus-detail.component.html'
})
export class BonusDetailComponent implements OnInit {
    bonus: IBonus;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bonus }) => {
            this.bonus = bonus;
        });
    }

    previousState() {
        window.history.back();
    }
}
