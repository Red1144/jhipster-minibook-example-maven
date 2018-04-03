import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointsSharedModule } from '../../shared';
import { TwentyOnePointsAdminModule } from '../../admin/admin.module';
import {
    WeightsService,
    WeightsPopupService,
    WeightsComponent,
    WeightsDetailComponent,
    WeightsDialogComponent,
    WeightsPopupComponent,
    WeightsDeletePopupComponent,
    WeightsDeleteDialogComponent,
    weightsRoute,
    weightsPopupRoute,
    WeightsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...weightsRoute,
    ...weightsPopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointsSharedModule,
        TwentyOnePointsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WeightsComponent,
        WeightsDetailComponent,
        WeightsDialogComponent,
        WeightsDeleteDialogComponent,
        WeightsPopupComponent,
        WeightsDeletePopupComponent,
    ],
    entryComponents: [
        WeightsComponent,
        WeightsDialogComponent,
        WeightsPopupComponent,
        WeightsDeleteDialogComponent,
        WeightsDeletePopupComponent,
    ],
    providers: [
        WeightsService,
        WeightsPopupService,
        WeightsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsWeightsModule {}
