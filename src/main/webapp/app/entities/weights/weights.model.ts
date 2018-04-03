import { BaseEntity, User } from './../../shared';

export class Weights implements BaseEntity {
    constructor(
        public id?: number,
        public time?: any,
        public weight?: number,
        public user?: User,
    ) {
    }
}
