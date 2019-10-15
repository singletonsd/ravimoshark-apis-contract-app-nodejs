"use strict";

import { getConnection } from "typeorm";
import { Contracts } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Deleted, Metadata, RefContract } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";
import { ImportedMachinesService } from "./ImportedMachinesService";
import { LocationsService } from "./LocationsService";

const SERVICE_NAME = "ContractsService";

export class ContractsService {

    /**
     *  Check if a contract exits.
     * @param refContract
     */
    public static exists(refContract: number): Promise<boolean> {
        const FUNCTION_NAME = "exists";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<boolean>(async (resolve) => {
            const previous = await getConnection().manager.findOne(Contracts, {
                select: ["refContract"], where: { refContract }});
            if (!previous) {
                LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT} ${refContract}`);
                resolve(false);
                return;
            }
            resolve(true);
            return;
        });
    }

    /**
     * Add one contract.
     * Add one contract.
     *
     * body Contracts  (optional)
     * returns Contracts
     */
    public static add(item: Contracts): Promise<Contracts> {
        // TODO: contracts add.
        const FUNCTION_NAME = "add";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<Contracts>((resolve, reject) => {
        const examples = {};
        examples["application/json"] = {
            // valid: true,
            // refContract: 2,
            // identification: "identification",
            // dateDebut: "2000-01-23",
            // loyer: 9.301444,
            // miniconso: 3.6160767,
            // client: "client",
            // reviewed: true,
            // machines: [
            // {
            //     refContract: "refContract",
            //     piece: "piece",
            //     id: 7,
            //     numSerie: "numSerie"
            // },
            // {
            //     refContract: "refContract",
            //     piece: "piece",
            //     id: 7,
            //     numSerie: "numSerie"
            // }
            // ],
            // dateFin: "2000-01-23",
            // reconduction: "reconduction"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
        });
    }

    /**
     * Delete one contract.
     * Delete one contract.
     *
     * refContract Long id to delete or search
     * no response value expected for this operation
     */
    public static delete(refContract: ParametersIdDeleted) {
        // TODO: contracts delete.
        const FUNCTION_NAME = "delete";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise((resolve, reject) => {
        resolve();
        });
    }

  /**
   * Edit one contract.
   * Edit one contract.
   *
   * body Contracts  (optional)
   * returns Contracts
   */
    public static edit(contract: Contracts): Promise<Contracts> {
        const FUNCTION_NAME = "edit";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<Contracts>(async (resolve, reject) => {
            LoggerUtility.info(`${logHeader} ${contract.refContract}`);
            LoggerUtility.debug(`${logHeader}`, contract);
            if (!contract.refContract) {
                LoggerUtility.warn(`${logHeader} id not valid ${VALID_RESPONSES.ERROR.VALIDATION.ID} ${contract.refContract}`);
                reject(VALID_RESPONSES.ERROR.VALIDATION.ID);
                return;
            }
            if (!await this.exists(contract.refContract)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT);
                return;
            }
            const importedMachines = contract.importedMachines;
            delete contract.importedMachines;
            const locations = contract.locations;
            delete contract.locations;
            const editedContract = await getConnection().manager.save(Contracts, contract);
            LoggerUtility.info(`${logHeader} success ${editedContract.refContract}`);
            await Promise.all(importedMachines.map(async (imported) => {
                if (imported.id) {
                    await ImportedMachinesService.edit(imported);
                } else {
                    await ImportedMachinesService.add(imported);
                }
            }));
            LoggerUtility.info(`${logHeader} finished imported ${editedContract.refContract}`);
            await Promise.all(locations.map(async (location) => {
                if (!location.id) {
                    await LocationsService.add(location);
                } else {
                    await LocationsService.edit(location);
                }
            }));
            LoggerUtility.info(`${logHeader} finished locations ${editedContract.refContract}`);
            resolve(await this.getById({ id: editedContract.refContract, deleted: Deleted.ALL }));
            return;
        });
    }

    /**
     * Get one contract.
     * Get one contract.
     *
     * refContract Long id to delete or search
     * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
     * returns Contracts
     */
    public static getById(params: ParametersIdDeleted): Promise<Contracts> {
        const FUNCTION_NAME = "getById";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<Contracts>(async (resolve, reject) => {
        LoggerUtility.info(`${logHeader}`);
        LoggerUtility.debug(`${logHeader} with`, params);
        const previous: Contracts = await getConnection().manager.findOne(Contracts,
            DatabaseUtilities.getFindOneObject(params.id, params.deleted, Contracts));
        if (!previous) {
            LoggerUtility.warn(`${logHeader} not exists with id=${params.id} and deleted=${params.deleted.toString()}`);
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT);
            return;
        }
        LoggerUtility.info(`${logHeader} got ${previous.refContract}`);
        resolve(previous);
        return;
        });
    }

    /**
     * Get all contracts.
     * Get all contracts.
     *
     * skipParam Integer number of item to skip
     * limit Integer max records to return
     * orderBy String order by property. (optional)
     * filterBy String filter data. (optional)
     * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
     * metadata Boolean If metadata is needed (for pagination controls) (optional)
     * returns inline_response_200
     */
    public static get(params: ParametersComplete): Promise<{metadata: Metadata, items: Array<Contracts>}> {
        const FUNCTION_NAME = "get";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<{metadata: Metadata, items: Array<Contracts>}>(async (resolve, reject) => {
        LoggerUtility.info(`${logHeader}`);
        const object = DatabaseUtilities.getFindObject(params, Contracts);
        if (!object) {
            LoggerUtility.warn(`${logHeader} order param malformed ${params.orderBy}`);
            reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
            return;
        }
        LoggerUtility.debug(`${logHeader} with`, object);
        const [items, total] = await getConnection().manager.findAndCount(
            Contracts,
            object
        );
        if (!items || !items.length) {
            LoggerUtility.warn(`${logHeader} empty result`);
            resolve();
            return;
        }
        LoggerUtility.info(`${logHeader} got ${items.length}`);
        resolve(Utilities.getMetadataFormat(items, total, params));
        return;
        });
    }
}
