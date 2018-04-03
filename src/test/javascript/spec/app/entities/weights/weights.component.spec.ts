/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TwentyOnePointsTestModule } from '../../../test.module';
import { WeightsComponent } from '../../../../../../main/webapp/app/entities/weights/weights.component';
import { WeightsService } from '../../../../../../main/webapp/app/entities/weights/weights.service';
import { Weights } from '../../../../../../main/webapp/app/entities/weights/weights.model';

describe('Component Tests', () => {

    describe('Weights Management Component', () => {
        let comp: WeightsComponent;
        let fixture: ComponentFixture<WeightsComponent>;
        let service: WeightsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointsTestModule],
                declarations: [WeightsComponent],
                providers: [
                    WeightsService
                ]
            })
            .overrideTemplate(WeightsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeightsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeightsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Weights(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.weights[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
