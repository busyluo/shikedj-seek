/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SeekTestModule } from '../../../test.module';
import { AgentProvinceComponent } from 'app/entities/agent-province/agent-province.component';
import { AgentProvinceService } from 'app/entities/agent-province/agent-province.service';
import { AgentProvince } from 'app/shared/model/agent-province.model';

describe('Component Tests', () => {
    describe('AgentProvince Management Component', () => {
        let comp: AgentProvinceComponent;
        let fixture: ComponentFixture<AgentProvinceComponent>;
        let service: AgentProvinceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [AgentProvinceComponent],
                providers: []
            })
                .overrideTemplate(AgentProvinceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgentProvinceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgentProvinceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AgentProvince(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agentProvinces[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
