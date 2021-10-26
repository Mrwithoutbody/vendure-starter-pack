import { DeepPartial, VendureEntity } from "@vendure/core";
import { Column, Entity } from 'typeorm';

@Entity()
export class PhysicalAddress extends VendureEntity {
    constructor(init?: DeepPartial<PhysicalAddress>) {
        super(init);
    }

    @Column()
    street!: string;
}
