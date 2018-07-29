/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { BonusPoolUpdateComponent } from 'app/entities/bonus-pool/bonus-pool-update.component';
import { BonusPoolService } from 'app/entities/bonus-pool/bonus-pool.service';
import { BonusPool } from 'app/shared/model/bonus-pool.model';

describe('Component Tests', () => {
    describe('BonusPool Management Update Component', () => {
        let comp: BonusPoolUpdateComponent;
        let fixture: ComponentFixture<BonusPoolUpdateComponent>;
        let service: BonusPoolService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [BonusPoolUpdateComponent]
            })
                .overrideTemplate(BonusPoolUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BonusPoolUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BonusPoolService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BonusPool(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bonusPool = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BonusPool();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.bonusPool = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
