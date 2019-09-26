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
        EXIST: "error.exist",
        NOT_DELETED: "error.not_deleted",
        NOT_EXIST: {
            CONTRACT: "error.not_exist.account",
            IMPORTED_MACHINE: "error.not_exist.delivery",
            MACHINE: "error.not_exist.carrier"
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
            ACCOUNT: {
                ID: "error.validation.account.id"
            },
            CARRIER: {
                ID: "error.validation.carrier.id"
            },
            DELIVERY: {
                REFERENCE: "error.validation.delivery.reference",
                VALUES: "error.validation.delivery.values"
            },
            ID: "error.validation.id",
            JOURNEY: {
                DELIVERIES: "error.validation.journey.deliveries",
                LOCATION_END: "error.validation.journey.location_end",
                LOCATION_START: "error.validation.journey.location_start"
            },
            LOCATION: {
                ID: "error.validation.location.id"
            },
            MEMBERSHIP: {
                ROLE: "error.validation.membership.role"
            },
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
