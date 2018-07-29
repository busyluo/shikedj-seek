import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBonusPool } from 'app/shared/model/bonus-pool.model';

@Component({
    selector: 'jhi-bonus-pool-detail',
    templateUrl: './bonus-pool-detail.component.html'
})
export class BonusPoolDetailComponent implements OnInit {
    bonusPool: IBonusPool;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bonusPool }) => {
            this.bonusPool = bonusPool;
        });
    }

    previousState() {
        window.history.back();
    }
}
