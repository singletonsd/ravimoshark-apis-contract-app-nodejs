import { Column, Entity, Index, OneToMany } from "typeorm";
import { Machine } from "./machine";

@Entity("Pieces")
@Index("UQ_Pieces_RefArticle", ["refArticle"], { unique: true })
export class Pieces {
    @Column("nvarchar", {
        length: 100,
        name: "RefArticle",
        nullable: false,
        primary: true
    })
    public refArticle?: string;

    @Column("nvarchar", {
        length: 100,
        name: "DesignationArticle",
        nullable: true
    })
    public designationArticle?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Statut",
        nullable: true
    })
    public statut?: string | null;

    @Column("float", {
        name: "PrixVente",
        nullable: true,
        precision: 53
    })
    public prixVente?: number | null;

    @Column("float", {
        name: "UniteVente",
        nullable: true,
        precision: 53
    })
    public uniteVente?: number | null;

    @Column("nvarchar", {
        length: 100,
        name: "IntituleFamille",
        nullable: true
    })
    public intituleFamille?: string | null;

    @Column("float", {
        name: "DernierPrixAchat",
        nullable: true,
        precision: 53
    })
    public dernierPrixAchat?: number | null;

    @Column("nvarchar", {
        length: 100,
        name: "Conditionnement",
        nullable: true
    })
    public conditionnement?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "DetergentType",
        nullable: true
    })
    public detergentType?: string | null;

    @Column("float", {
        name: "Poids",
        nullable: true,
        precision: 53
    })
    public poids?: number | null;

    @Column("float", {
        name: "PoidSuc",
        nullable: true,
        precision: 53
    })
    public poidSuc?: number | null;

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

    @OneToMany(() => Machine, (machine: Machine) => machine.refArticle)
    public machines?: Promise<Array<Machine>>;

    public constructor(init?: Partial<Pieces>) {
      Object.assign(this, init);
    }
}
