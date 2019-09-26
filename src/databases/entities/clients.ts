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
    public abrege?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Prenom",
        nullable: true
    })
    public prenom?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Nom",
        nullable: true
    })
    public nom?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Etat",
        nullable: true
    })
    public etat?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Groupe",
        nullable: true
    })
    public groupe?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "StatutGroupe",
        nullable: true
    })
    public statutGroupe?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Statut",
        nullable: true
    })
    public statut?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "RaisonSociale",
        nullable: true
    })
    public raisonSociale?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "TypeClient",
        nullable: true
    })
    public typeClient?: string | null;

    @Column("int", {
        name: "Score",
        nullable: true
    })
    public score?: number | null;

    @Column("int", {
        name: "Secteur",
        nullable: true
    })
    public secteur?: number | null;

    @Column("int", {
        name: "Frequence",
        nullable: true
    })
    public frequence?: number | null;

    @Column("binary", {
        length: 64,
        name: "PasswordHash",
        nullable: true
    })
    public passwordHash?: Buffer | null;

    @Column("nvarchar", {
        length: 36,
        name: "Salt",
        nullable: true
    })
    public salt?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Email",
        nullable: true
    })
    public email?: string | null;

    @Column("bit", {
        default: () => "(0)",
        name: "CheckEmail",
        nullable: false
    })
    public checkEmail?: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "ForgotPadawan",
        nullable: false
    })
    public forgotPadawan?: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "Interdit",
        nullable: false
    })
    public interdit?: boolean;

    @Column("datetimeoffset", {
        name: "LastSuccessfulAttempt",
        nullable: true
    })
    public lastSuccessfulAttempt?: Date | null;

    @Column("nvarchar", {
        length: 100,
        name: "IdFacebook",
        nullable: true
    })
    public idFacebook?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "IdGoogle",
        nullable: true
    })
    public idGoogle?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Siret",
        nullable: true
    })
    public siret?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "TvaIntraco",
        nullable: true
    })
    public tvaIntraco?: string | null;

    @Column("nvarchar", {
        length: 100,
        name: "Civilite",
        nullable: true
    })
    public civilite?: string | null;

    @Column("int", {
        default: () => "(0)",
        name: "NbConnectionAttempt",
        nullable: false
    })
    public nbConnectionAttempt?: number;

    @Column("nvarchar", {
        length: 100,
        name: "ValidationKey",
        nullable: true
    })
    public validationKey?: string | null;

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

    @Column("nvarchar", {
        length: 100,
        name: "TempEmail",
        nullable: true
    })
    public tempEmail?: string | null;

    @OneToMany(() => Contracts, (contracts: Contracts) => contracts.refClient)
    public contracts?: Promise<Array<Contracts>>;

    public constructor(init?: Partial<Clients>) {
        Object.assign(this, init);
    }
}
