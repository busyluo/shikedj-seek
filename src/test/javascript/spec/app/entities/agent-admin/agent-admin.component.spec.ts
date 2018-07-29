/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { AgentAdminComponent } from 'app/entities/agent-admin/agent-admin.component';
import { AgentAdminService } from 'app/entities/agent-admin/agent-admin.service';
import { AgentAdmin } from 'app/shared/model/agent-admin.model';

describe('Component Tests', () => {
    describe('AgentAdmin Management Component', () => {
        let comp: AgentAdminComponent;
        let fixture: ComponentFixture<AgentAdminComponent>;
        let service: AgentAdminService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentAdminComponent],
                providers: []
            })
                .overrideTemplate(AgentAdminComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgentAdminComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentAdminService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AgentAdmin(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agentAdmins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
