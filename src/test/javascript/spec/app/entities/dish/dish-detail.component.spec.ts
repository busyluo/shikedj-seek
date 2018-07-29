/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { DishDetailComponent } from 'app/entities/dish/dish-detail.component';
import { Dish } from 'app/shared/model/dish.model';

describe('Component Tests', () => {
    describe('Dish Management Detail Component', () => {
        let comp: DishDetailComponent;
        let fixture: ComponentFixture<DishDetailComponent>;
        const route = ({ data: of({ dish: new Dish(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [DishDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DishDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DishDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dish).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
