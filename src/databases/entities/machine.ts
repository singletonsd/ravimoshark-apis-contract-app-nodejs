import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { ImportedMachines } from "./importedMachines";
import { Location } from "./location";
import { Pieces } from "./pieces";

@Entity("Machine")
@Index("UQ_Machine_NumSerie", ["numSerie"], { unique: true })
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
    public numSerie?: string;

    @ManyToOne(() => Pieces, (pieces: Pieces) => pieces.machines, { nullable: false })
    @JoinColumn({ name: "RefArticle" })
    public refArticle?: Promise<Pieces | null>;

    @RelationId((machine: Machine) => machine.refArticle)
    public refArticleId?: Promise<Array<string>>;

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
    public importedMachines?: Promise<Array<ImportedMachines>>;

    @OneToMany(() => Location, (location: Location) => location.machine)
    public locations?: Promise<Array<Location>>;

    public constructor(init?: Partial<Machine>) {
        Object.assign(this, init);
    }
}
