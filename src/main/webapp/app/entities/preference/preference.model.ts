import { BaseEntity, User } from './../../shared';

export const enum Units {
    'kg',
    'lb'
}

export class Preference implements BaseEntity {
    constructor(
        public id?: number,
        public weeklyGoal?: number,
        public weightUnits?: Units,
        public user?: User,
    ) {
    }
}
