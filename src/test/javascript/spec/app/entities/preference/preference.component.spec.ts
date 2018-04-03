/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TwentyOnePointsTestModule } from '../../../test.module';
import { PreferenceComponent } from '../../../../../../main/webapp/app/entities/preference/preference.component';
import { PreferenceService } from '../../../../../../main/webapp/app/entities/preference/preference.service';
import { Preference } from '../../../../../../main/webapp/app/entities/preference/preference.model';

describe('Component Tests', () => {

    describe('Preference Management Component', () => {
        let comp: PreferenceComponent;
        let fixture: ComponentFixture<PreferenceComponent>;
        let service: PreferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointsTestModule],
                declarations: [PreferenceComponent],
                providers: [
                    PreferenceService
                ]
            })
            .overrideTemplate(PreferenceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PreferenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PreferenceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Preference(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.preferences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
