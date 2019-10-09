"use strict";

import { getConnection } from "typeorm";
import { Location } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Deleted, Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";
import { ContractsService } from "./ContractsService";
import { MachinesService } from "./MachinesService";

const SERVICE_NAME = "LocationsService";

export class LocationsService {

    /**
     *  Check if a location exits.
     * @param id
     */
    public static exists(id: number): Promise<boolean> {
        const FUNCTION_NAME = "exists";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<boolean>(async (resolve, reject) => {
            const previous = await getConnection().manager.findOne(Location, {
                select: [ "id" ],
                where: { id }
            });
            if (!previous) {
                LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT} ${id}`);
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
    public static add(item: Location): Promise<Location> {
        const FUNCTION_NAME = "add";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<Location>(async (resolve, reject) => {
            LoggerUtility.info(`${logHeader}`);
            LoggerUtility.debug(`${logHeader}`, item);
            if (! await ContractsService.exists(item.refContract || item.contract.refContract)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT);
                return;
            }
            const machineId = item.machine ? item.machine.id : item.machineId;
            if (!machineId) {
                item.machine = await MachinesService.add(item.machine);
            } else if (! await MachinesService.exists(machineId)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE);
                return;
            }
            const newItem = await getConnection().manager.save(Location, item);
            LoggerUtility.info(`${logHeader} success ${newItem.id}`);
            LoggerUtility.debug(`${logHeader}`, newItem);
            resolve(this.getById({ id: newItem.id, deleted: Deleted.ALL }));
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
        const FUNCTION_NAME = "delete";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
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
        const FUNCTION_NAME = "edit";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<Location>(async (resolve, reject) => {
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, item.id);
            LoggerUtility.debug(SERVICE_NAME, FUNCTION_NAME, item);
            if (!ContractsService.exists(item.refContract || item.contract.refContract)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT);
                return;
            }
            const machineId = item.machine ? item.machine.id : item.machineId;
            if (machineId && !MachinesService.exists(machineId)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE);
                return;
            }
            if (!MachinesService.existsSerialNumber(item.machine.serialNumber)) {
                reject(VALID_RESPONSES.ERROR.EXIST.MACHINE);
                return;
            }
            const editedItem = await getConnection().manager.save(Location, item);
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "success", editedItem.id);
            resolve(this.getById({ id: editedItem.id, deleted: Deleted.ALL }));
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
    public static getById(params: ParametersIdDeleted): Promise<Location> {
        const FUNCTION_NAME = "getById";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<Location>(async (resolve, reject) => {
        LoggerUtility.info(`${logHeader}`);
        const previous: Location = await getConnection().manager
            .findOne(Location
            , DatabaseUtilities.getFindOneObject(params.id, params.deleted, Location));
        if (!previous) {
            LoggerUtility.warn(`${logHeader} not exists with id=${params.id} and deleted=${params.deleted.toString()}`);
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE);
            return;
        }
        LoggerUtility.info(`${logHeader} got ${previous.id}`);
        resolve(previous);
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
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<{metadata: Metadata, items: Array<Location>}> (async (resolve, reject) => {
        LoggerUtility.info(`${logHeader}`);
        const object = DatabaseUtilities.getFindObject(params, Location);
        if (!object) {
            LoggerUtility.warn(`${logHeader} order param malformed ${params.orderBy}`);
            reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
            return;
        }
        LoggerUtility.info(`${logHeader} with`, object);
        const [items, total] = await getConnection().manager.findAndCount(Location, object);
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
