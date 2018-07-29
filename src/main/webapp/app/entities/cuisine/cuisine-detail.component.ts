import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICuisine } from 'app/shared/model/cuisine.model';

@Component({
    selector: 'jhi-cuisine-detail',
    templateUrl: './cuisine-detail.component.html'
})
export class CuisineDetailComponent implements OnInit {
    cuisine: ICuisine;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cuisine }) => {
            this.cuisine = cuisine;
        });
    }

    previousState() {
        window.history.back();
    }
}
