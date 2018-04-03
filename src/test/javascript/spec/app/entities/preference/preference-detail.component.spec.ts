/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TwentyOnePointsTestModule } from '../../../test.module';
import { PreferenceDetailComponent } from '../../../../../../main/webapp/app/entities/preference/preference-detail.component';
import { PreferenceService } from '../../../../../../main/webapp/app/entities/preference/preference.service';
import { Preference } from '../../../../../../main/webapp/app/entities/preference/preference.model';

describe('Component Tests', () => {

    describe('Preference Management Detail Component', () => {
        let comp: PreferenceDetailComponent;
        let fixture: ComponentFixture<PreferenceDetailComponent>;
        let service: PreferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointsTestModule],
                declarations: [PreferenceDetailComponent],
                providers: [
                    PreferenceService
                ]
            })
            .overrideTemplate(PreferenceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferenceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Preference(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.preference).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
