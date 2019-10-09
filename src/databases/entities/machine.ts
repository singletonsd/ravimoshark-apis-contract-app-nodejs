import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { ImportedMachines } from "./importedMachines";
import { Location } from "./location";
import { Pieces } from "./pieces";

@Entity("Machine")
@Index("UQ_Machine_NumSerie", ["serialNumber"], { unique: true })
export class Machine {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    public id?: number;

    @Column("nvarchar", {
        name: "NumSerie",
        nullable: false
    })
    public serialNumber?: string;

    @ManyToOne(() => Pieces, (pieces: Pieces) => pieces.machines, { nullable: false })
    @JoinColumn({ name: "RefArticle" })
    public piece?: Pieces | null;

    @RelationId((machine: Machine) => machine.piece)
    public refArticle?: string;

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

    @OneToMany(() => ImportedMachines, (importedMachines: ImportedMachines) => importedMachines.machine)
    public importedMachines?: Array<ImportedMachines>;

    @OneToMany(() => Location, (location: Location) => location.machine)
    public locations?: Array<Location>;

    public constructor(init?: Partial<Machine>) {
        Object.assign(this, init);
    }
}
