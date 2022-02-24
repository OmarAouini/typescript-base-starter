import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('companies')
export class Company extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    vat_code: string;
    @Column()
    email: string;
    @Column()
    phone_number: string;

}
