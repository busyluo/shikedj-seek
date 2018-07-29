/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { AgentAdminUpdateComponent } from 'app/entities/agent-admin/agent-admin-update.component';
import { AgentAdminService } from 'app/entities/agent-admin/agent-admin.service';
import { AgentAdmin } from 'app/shared/model/agent-admin.model';

describe('Component Tests', () => {
    describe('AgentAdmin Management Update Component', () => {
        let comp: AgentAdminUpdateComponent;
        let fixture: ComponentFixture<AgentAdminUpdateComponent>;
        let service: AgentAdminService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentAdminUpdateComponent]
            })
                .overrideTemplate(AgentAdminUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgentAdminUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentAdminService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgentAdmin(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agentAdmin = entity;
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
                    const entity = new AgentAdmin();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agentAdmin = entity;
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
