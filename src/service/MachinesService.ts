"use strict";

import { getConnection } from "typeorm";
import { Machine } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "MachinesService";

export class MachinesService {
    // tslint:disable:object-literal-sort-keys

    /**
     *  Check if a machine exits.
     * @param id
     */
    public static exists(id: number): Promise<boolean> {
        const FUNCTION_NAME = "exists";
        return new Promise<boolean>(async (resolve, reject) => {
            const previous = await getConnection().manager.findOne(Machine, {
                where: { id },
                select: [ "id" ]
            });
            if (!previous) {
                LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME,
                VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT, id);
                resolve(false);
                return;
            }
            resolve(true);
            return;
        });
    }

    /**
     * Add one machine.
     * Add one machine.
     *
     * body Machines  (optional)
     * returns Machines
     */
    public static add(item: Machine): Promise<Machine> {
        return new Promise((resolve, reject) => {
        const examples = {};
        examples["application/json"] = {
            refContract: "refContract",
            piece: "piece",
            id: 7,
            numSerie: "numSerie"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
        });
    }

    /**
     * Delete one machine.
     * Delete one machine.
     *
     * id Long id to delete or search
     * no response value expected for this operation
     */
    public static delete(id) {
        return new Promise((resolve, reject) => {
        resolve();
        });
    }

    /**
     * Edit one machine.
     * Edit one machine.
     *
     * body Machines  (optional)
     * returns Machines
     */
    public static edit(item: Machine): Promise<Machine> {
        const FUNCTION_NAME = "edit";
        return new Promise(async (resolve, reject) => {
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, item.id);
            LoggerUtility.debug(SERVICE_NAME, FUNCTION_NAME, item);
            if (!item.id) {
                LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME,
                "id not valid", VALID_RESPONSES.ERROR.VALIDATION.ID,
                item.id);
                reject(VALID_RESPONSES.ERROR.VALIDATION.ID);
                return;
            }
            const previous = await getConnection().manager.findOne(Machine, {
                where: { id: item.id },
                select: ["id"]
            });
            if (!previous) {
                LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME,
                VALID_RESPONSES.ERROR.NOT_EXIST.IMPORTED_MACHINE,
                item.id);
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.IMPORTED_MACHINE);
                return;
            }
            const editedItem = await getConnection().manager.save(Machine, item);
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME,
                "edited", editedItem.id
            );
            // if (editedItem.machine) {
            //     if (editedItem.machine.id) {
            //         editedItem.machine = await MachinesService.edit(editedItem.machine);
            //     } else {
            //         editedItem.machine = await MachinesService.add(editedItem.machine);
            //     }
            // }
            resolve(editedItem);
            return;
        });
    }

    /**
     * Get one Machine.
     * Get one machine.
     *
     * id Long id to delete or search
     * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
     * returns Machines
     */
    public static getById(params: ParametersIdDeleted): Promise<Machine> {
        const FUNCTION_NAME = "getById";
        return new Promise(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const prevAccount: Machine = await getConnection().manager
            .findOne(Machine
            , DatabaseUtilities.getFindOneObject(params.id, params.deleted, Machine));
        if (!prevAccount) {
            LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME
                , "not exists with id", params.id, "and deleted", params.deleted.toString());
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE);
            return;
        }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "got", prevAccount.id);
        resolve(prevAccount);
        return;
    });
    }

    /**
     * Get all machines.
     * Get all machines.
     *
     * skipParam Integer number of item to skip
     * limit Integer max records to return
     * orderBy String order by property. (optional)
     * filterBy String filter data. (optional)
     * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
     * metadata Boolean If metadata is needed (for pagination controls) (optional)
     * returns inline_response_200_2
     */
    public static get(params: ParametersComplete): Promise<{metadata: Metadata, items: Array<Machine>}> {
        const FUNCTION_NAME = "get";
        return new Promise(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const object = DatabaseUtilities.getFindObject(params, Machine);
        if (!object) {
            LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "order param malformed", params.orderBy);
            reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
            return;
        }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "with", object);
        const [accounts, total] = await getConnection().manager.findAndCount(Machine, object);
        if (!accounts || !accounts.length) {
            LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "empty result");
            resolve();
            return;
        }
        const apiAccounts = accounts;
        // for (const us of accounts) {
        //     apiAccounts.push(new Accounts(null, us));
        // }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "got ", apiAccounts.length);
        resolve(Utilities.getMetadataFormat(apiAccounts, total, params));
        return;
    });
    }
}
