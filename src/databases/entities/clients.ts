import { Column, Entity, Index, OneToMany } from "typeorm";
import { Contracts } from "./contracts";

@Entity("Clients")
@Index("UQ_Clients_RefClient", ["refClient"], { unique: true })
export class Clients {

    @Column("nvarchar", {
        length: 100,
        name: "RefClient",
        nullable: false,
        primary: true
    })
    public refClient?: string;

    @Column("nvarchar", {
        length: 100,
        name: "Abrege",
        nullable: true
    })
    public nickname?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Prenom",
        nullable: true,
        select: false
    })
    public prenom?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Nom",
        nullable: true
    })
    public name?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Etat",
        nullable: true,
        select: false
    })
    public etat?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Groupe",
        nullable: true
    })
    public group?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "StatutGroupe",
        nullable: true,
        select: false
    })
    public statutGroupe?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Statut",
        nullable: true,
        select: false
    })
    public statut?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "RaisonSociale",
        nullable: true,
        select: false
    })
    public raisonSociale?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "TypeClient",
        nullable: true,
        select: false
    })
    public typeClient?: string | null;

    @Column("int", {
        name: "Score",
        nullable: true,
        select: false
    })
    public score?: number | null;

    @Column("int", {
        name: "Secteur",
        nullable: true,
        select: false
    })
    public secteur?: number | null;

    @Column("int", {
        name: "Frequence",
        nullable: true,
        select: false
    })
    public frequence?: number | null;

    @Column("binary", {
        length: 64,
        name: "PasswordHash",
        nullable: true,
        select: false
    })
    public passwordHash?: Buffer | null;

    @Column("nvarchar", {
        length: 36,
        name: "Salt",
        nullable: true,
        select: false
    })
    public salt?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Email",
        nullable: true,
        select: false
    })
    public email?: string | null;

    @Column("bit", {
        default: () => "(0)",
        name: "CheckEmail",
        nullable: false,
        select: false
    })
    public checkEmail?: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "ForgotPadawan",
        nullable: false,
        select: false
    })
    public forgotPadawan?: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "Interdit",
        nullable: false,
        select: false
    })
    public interdit?: boolean;

    @Column("datetimeoffset", {
        name: "LastSuccessfulAttempt",
        nullable: true,
        select: false
    })
    public lastSuccessfulAttempt?: Date | null;

    @Column("nvarchar", {
        length: 100,
        name: "IdFacebook",
        nullable: true,
        select: false
    })
    public idFacebook?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "IdGoogle",
        nullable: true,
        select: false
    })
    public idGoogle?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Siret",
        nullable: true,
        select: false
    })
    public siret?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "TvaIntraco",
        nullable: true,
        select: false
    })
    public tvaIntraco?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Civilite",
        nullable: true,
        select: false
    })
    public civilite?: string | null;

    @Column("int", {
        default: () => "(0)",
        name: "NbConnectionAttempt",
        nullable: false,
        select: false
    })
    public nbConnectionAttempt?: number;

    @Column("nvarchar", {
        length: 100,
        name: "ValidationKey",
        nullable: true,
        select: false
    })
    public validationKey?: string | null;

    @Column("datetimeoffset", {
        default: () => "sysdatetimeoffset()",
        name: "__createdAt",
        nullable: false,
        select: false
    })
    public createdAt?: Date;

    @Column("datetimeoffset", {
        default: () => "sysdatetimeoffset()",
        name: "__updatedAt",
        nullable: false,
        select: false
    })
    public updatedAt?: Date;

    @Column("bit", {
        default: () => "(0)",
        name: "__deleted",
        nullable: false
    })
    public deleted?: boolean;

    @Column("nvarchar", {
        length: 100,
        name: "TempEmail",
        nullable: true,
        select: false
    })
    public tempEmail?: string | null;

    @OneToMany(() => Contracts, (contracts: Contracts) => contracts.refClient)
    public contracts?: Promise<Array<Contracts>>;

    public constructor(init?: Partial<Clients>) {
        Object.assign(this, init);
    }
}
