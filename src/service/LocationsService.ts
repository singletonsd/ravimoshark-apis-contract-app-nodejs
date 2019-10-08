"use strict";

import { getConnection } from "typeorm";
import { Location } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";
import { ContractsService } from "./ContractsService";
import { Deleted } from "src/models/reviewed";

const SERVICE_NAME = "LocationsService";

export class LocationsService {
    // tslint:disable:object-literal-sort-keys
    /**
     * Add one machine.
     * Add one machine.
     *
     * body Machines  (optional)
     * returns Machines
     */
    public static add(item: Location): Promise<Location> {
        const FUNCTION_NAME = "add";
        return new Promise<Location>(async (resolve, reject) => {
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, item.id);
            LoggerUtility.debug(SERVICE_NAME, FUNCTION_NAME, item);
            if (!ContractsService.exists(item.refContract || item.contract.refContract)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT);
                return;
            }
            const editedItem = await getConnection().manager.save(Location, item);
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME,
                "edited", editedItem.id
            );
            if (editedItem.machine) {
                // if (editedItem.machine.id) {
                //     await MachinesService.edit(editedItem.machine);
                // } else {
                //     await LocationsService.add({ contract: item.contract, machine: editedItem.machine});
                // }
            }
            // resolve(this.getById({ id: editedItem.id, deleted: Deleted.ALL }));
            return;
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
    public static edit(item: Location): Promise<Location> {
        return new Promise<Location>((resolve, reject) => {
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
     * Get one Machine.
     * Get one machine.
     *
     * id Long id to delete or search
     * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
     * returns Machines
     */
    public static getById(params: ParametersIdDeleted): Promise<Location> {
        const FUNCTION_NAME = "getById";
        return new Promise<Location>(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const prevAccount: Location = await getConnection().manager
            .findOne(Location
            , DatabaseUtilities.getFindOneObject(params.id, params.deleted, Location));
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
    public static get(params: ParametersComplete): Promise<{metadata: Metadata, items: Array<Location>}> {
        const FUNCTION_NAME = "get";
        return new Promise<{metadata: Metadata, items: Array<Location>}> (async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const object = DatabaseUtilities.getFindObject(params, Location);
        if (!object) {
            LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "order param malformed", params.orderBy);
            reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
            return;
        }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "with", object);
        const [accounts, total] = await getConnection().manager.findAndCount(Location, object);
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
