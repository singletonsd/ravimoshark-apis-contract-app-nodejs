import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { Clients } from "./clients";
import { ImportedMachines } from "./importedMachines";
import { Location } from "./location";

@Entity("Contracts")
export class Contracts {

    @Column("int", {
        name: "RefContract",
        nullable: false,
        primary: true
    })
    public refContract?: number;

    @ManyToOne(() => Clients, (clients: Clients) => clients.contracts, { nullable: false })
    @JoinColumn({ name: "RefClient" })
    public client?: Promise<Clients | null>;

    @RelationId((contracts: Contracts) => contracts.client)
    public refClient?: Promise<Array<string>>;

    @Column("varchar", {
        length: 100,
        name: "Identification",
        nullable: true
    })
    public identification?: string | null;

    @Column("datetimeoffset", {
        name: "DateDebut",
        nullable: true
    })
    public dateDebut?: Date | null;

    @Column("datetimeoffset", {
        name: "DateFin",
        nullable: true
    })
    public dateFin?: Date | null;

    @Column("nvarchar", {
        length: 100,
        name: "Reconduction",
        nullable: true
    })
    public reconduction?: string | null;

    @Column("float", {
        name: "Loyer",
        nullable: true,
        precision: 53
    })
    public loyer?: number | null;

    @Column("float", {
        name: "Miniconso",
        nullable: true,
        precision: 53
    })
    public miniconso?: number | null;

    @Column("bit", {
        default: () => "(0)",
        name: "Reviewed",
        nullable: false
    })
    public reviewed?: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "Valid",
        nullable: false
    })
    public valid?: boolean;

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

    @OneToMany(() => ImportedMachines, (importedMachines: ImportedMachines) => importedMachines.refContract)
    public importedMachines?: Promise<Array<ImportedMachines>>;

    @OneToMany(() => Location, (location: Location) => location.refContract, { })
    public locations?: Promise<Array<Location>>;

    public constructor(init?: Partial<Contracts>) {
        Object.assign(this, init);
    }
}
