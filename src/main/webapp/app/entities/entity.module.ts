import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwentyOnePointsPointsModule } from './points/points.module';
import { TwentyOnePointsWeightsModule } from './weights/weights.module';
import { TwentyOnePointsBloodPressureModule } from './blood-pressure/blood-pressure.module';
import { TwentyOnePointsPreferenceModule } from './preference/preference.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TwentyOnePointsPointsModule,
        TwentyOnePointsWeightsModule,
        TwentyOnePointsBloodPressureModule,
        TwentyOnePointsPreferenceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsEntityModule {}
