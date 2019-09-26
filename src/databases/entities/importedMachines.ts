import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { Contracts } from "./contracts";
import { Machine } from "./machine";

@Entity("ImportedMachines")
export class ImportedMachines {

    @Column("int", {
        name: "id",
        nullable: false,
        primary: true
    })
    public id?: number;

    @Column("nvarchar", {
        name: "Identification",
        nullable: false
    })
    public identification?: string;

    @ManyToOne(() => Machine, (machine: Machine) => machine.importedMachines, {})
    @JoinColumn({ name: "MachineId" })
    public machine?: Machine | null;

    @RelationId((importedMachines: ImportedMachines) => importedMachines.machine)
    public machineId?: Promise<Array<number>>;

    @Column("bit", {
        default: () => "(0)",
        name: "Reviewed",
        nullable: false
    })
    public reviewed?: boolean;

    @ManyToOne(() => Contracts, (contracts: Contracts) => contracts.importedMachines, { nullable: false })
    @JoinColumn({ name: "RefContract" })
    public contract?: Contracts | null;

    @RelationId((importedMachines: ImportedMachines) => importedMachines.contract)
    public refContract?: Promise<Array<number>>;

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

    public constructor(init?: Partial<ImportedMachines>) {
        Object.assign(this, init);
    }
}
