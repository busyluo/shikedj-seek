/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeekTestModule } from '../../../test.module';
import { AgentAdminDetailComponent } from 'app/entities/agent-admin/agent-admin-detail.component';
import { AgentAdmin } from 'app/shared/model/agent-admin.model';

describe('Component Tests', () => {
    describe('AgentAdmin Management Detail Component', () => {
        let comp: AgentAdminDetailComponent;
        let fixture: ComponentFixture<AgentAdminDetailComponent>;
        const route = ({ data: of({ agentAdmin: new AgentAdmin(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentAdminDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgentAdminDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgentAdminDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agentAdmin).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
