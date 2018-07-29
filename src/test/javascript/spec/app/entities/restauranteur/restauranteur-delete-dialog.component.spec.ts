/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SeekTestModule } from '../../../test.module';
import { RestauranteurDeleteDialogComponent } from 'app/entities/restauranteur/restauranteur-delete-dialog.component';
import { RestauranteurService } from 'app/entities/restauranteur/restauranteur.service';

describe('Component Tests', () => {
    describe('Restauranteur Management Delete Component', () => {
        let comp: RestauranteurDeleteDialogComponent;
        let fixture: ComponentFixture<RestauranteurDeleteDialogComponent>;
        let service: RestauranteurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SeekTestModule],
                declarations: [RestauranteurDeleteDialogComponent]
            })
                .overrideTemplate(RestauranteurDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RestauranteurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestauranteurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
