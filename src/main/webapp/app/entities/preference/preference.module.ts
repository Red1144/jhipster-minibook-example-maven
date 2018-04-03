import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointsSharedModule } from '../../shared';
import { TwentyOnePointsAdminModule } from '../../admin/admin.module';
import {
    PreferenceService,
    PreferencePopupService,
    PreferenceComponent,
    PreferenceDetailComponent,
    PreferenceDialogComponent,
    PreferencePopupComponent,
    PreferenceDeletePopupComponent,
    PreferenceDeleteDialogComponent,
    preferenceRoute,
    preferencePopupRoute,
    PreferenceResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...preferenceRoute,
    ...preferencePopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointsSharedModule,
        TwentyOnePointsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PreferenceComponent,
        PreferenceDetailComponent,
        PreferenceDialogComponent,
        PreferenceDeleteDialogComponent,
        PreferencePopupComponent,
        PreferenceDeletePopupComponent,
    ],
    entryComponents: [
        PreferenceComponent,
        PreferenceDialogComponent,
        PreferencePopupComponent,
        PreferenceDeleteDialogComponent,
        PreferenceDeletePopupComponent,
    ],
    providers: [
        PreferenceService,
        PreferencePopupService,
        PreferenceResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsPreferenceModule {}
