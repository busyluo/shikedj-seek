/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { AgentProvinceUpdateComponent } from 'app/entities/agent-province/agent-province-update.component';
import { AgentProvinceService } from 'app/entities/agent-province/agent-province.service';
import { AgentProvince } from 'app/shared/model/agent-province.model';

describe('Component Tests', () => {
    describe('AgentProvince Management Update Component', () => {
        let comp: AgentProvinceUpdateComponent;
        let fixture: ComponentFixture<AgentProvinceUpdateComponent>;
        let service: AgentProvinceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentProvinceUpdateComponent]
            })
                .overrideTemplate(AgentProvinceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgentProvinceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentProvinceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgentProvince(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agentProvince = entity;
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
                    const entity = new AgentProvince();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agentProvince = entity;
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
