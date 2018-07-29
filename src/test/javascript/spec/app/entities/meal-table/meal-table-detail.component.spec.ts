/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { MealTableDetailComponent } from 'app/entities/meal-table/meal-table-detail.component';
import { MealTable } from 'app/shared/model/meal-table.model';

describe('Component Tests', () => {
    describe('MealTable Management Detail Component', () => {
        let comp: MealTableDetailComponent;
        let fixture: ComponentFixture<MealTableDetailComponent>;
        const route = ({ data: of({ mealTable: new MealTable(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [MealTableDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MealTableDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealTableDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mealTable).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
