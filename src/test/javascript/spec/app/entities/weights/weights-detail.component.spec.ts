/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TwentyOnePointsTestModule } from '../../../test.module';
import { WeightsDetailComponent } from '../../../../../../main/webapp/app/entities/weights/weights-detail.component';
import { WeightsService } from '../../../../../../main/webapp/app/entities/weights/weights.service';
import { Weights } from '../../../../../../main/webapp/app/entities/weights/weights.model';

describe('Component Tests', () => {

    describe('Weights Management Detail Component', () => {
        let comp: WeightsDetailComponent;
        let fixture: ComponentFixture<WeightsDetailComponent>;
        let service: WeightsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointsTestModule],
                declarations: [WeightsDetailComponent],
                providers: [
                    WeightsService
                ]
            })
            .overrideTemplate(WeightsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeightsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeightsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Weights(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.weights).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
