// TODO: improve format to apply a translation.
export const VALID_RESPONSES = {
    ERROR: {
        AUTH: {
            TOKEN: {
                APP: "error.auth.token.app",
                USER: "error.auth.token.user"
            },
            UNPRIVILEGED: "error.auth.unprivileged"
        },
        EMAIL: {
            NOT_REGISTERED: "error.email.not_registered",
            NOT_VERIFIED: "error.email.not_verified",
            VERIFICATION: {
                TOKEN: {
                    EXPIRED: "error.email.verification.token.expired",
                    UNRECOGNIZED: "error.email.verification.token.unrecognized"
                }
            }
        },
        EXIST: {
            CONTRACT: "error.exist.contract",
            IMPORTED_MACHINE: "error.exist.importedMachine",
            MACHINE: "error.exist.machine"
        },
        NOT_DELETED: "error.not_deleted",
        NOT_EXIST: {
            CLIENT: "error.not_exist.client",
            CONTRACT: "error.not_exist.contract",
            IMPORTED_MACHINE: "error.not_exist.importedMachine",
            MACHINE: "error.not_exist.machine",
            PIECE: "error.not_exist.piece"
        },
        PARAMS: {
            MALFORMED: {
                ORDERBY: "error.params.malformed.orderby"
            },
            MISSING: "error.params.missing"
        },
        PASSWORD: {
            INSECURE: "error.password.insecure",
            MATCHED: "error.password.matched",
            NOT_MATCHED: "error.password.not_matched",
            RESET: "error.password.reset",
            VERIFICATION: {
                TOKEN: {
                    EXPIRED: "error.email.verification.token.expired",
                    UNRECOGNIZED: "error.email.verification.token.unrecognized"
                }
            }
        },
        UNRECOGNIZED: "error.unrecognized",
        VALIDATION: {
            CONTRACT: {
                REF_CONTRACT: "error.validation.contract.refContract"
            },
            ID: "error.validation.id",
            NAME: "error.validation.name",
            URL: "error.validation.url",
            USER: {
                EMAIL: "error.validation.user.email",
                ID: "error.validation.user.id",
                PASSWORD: "error.validation.user.password",
                REGISTERED: {
                    EMAIL: "error.validation.user.registered.email",
                    IDENTIFICATION: "error.validation.user.registered.identification"
                },
                ROLE: "error.validation.user.role"
            }
        }
    }
};
