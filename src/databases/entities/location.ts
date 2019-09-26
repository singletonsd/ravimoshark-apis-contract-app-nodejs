import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Contracts } from "./contracts";
import { Machine } from "./machine";

@Entity("Location")
export class Location {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @ManyToOne(() => Machine, (machine: Machine) => machine.locations, { nullable: false })
    @JoinColumn({ name: "MachineId" })
    public machine?: Promise<Machine | null>;

    @RelationId((location: Location) => location.machine)
    public machineId?: Promise<Array<number>>;

    @ManyToOne(() => Contracts, (contracts: Contracts) => contracts.locations, { nullable: false })
    @JoinColumn({ name: "RefContract" })
    public refContract?: Promise<Contracts | null>;

    @RelationId((location: Location) => location.refContract)
    public refContractId?: Promise<Array<number>>;

    @Column("datetimeoffset", {
        default: () => "sysdatetimeoffset()",
        name: "__createdAt",
        nullable: false
    })
    public createdAt?: Date;

    @Column("datetimeoffset", {
        default: () => "sysdatetimeoffset()",
        name: "__updatedAt",
        nullable: false
    })
    public updatedAt?: Date;

    @Column("bit", {
        default: () => "(0)",
        name: "__deleted",
        nullable: false
    })
    public deleted?: boolean;

    public constructor(init?: Partial<Location>) {
        Object.assign(this, init);
    }
}
