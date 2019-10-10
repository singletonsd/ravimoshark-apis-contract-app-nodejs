"use strict";

import { getConnection } from "typeorm";
import { Machine } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Deleted, Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";
import { PiecesService } from "./PiecesService";

const SERVICE_NAME = "MachinesService";

export class MachinesService {

    /**
     *  Check if a machine exits.
     * @param id
     */
    public static exists(id: number): Promise<boolean> {
        const FUNCTION_NAME = "exists";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<boolean>(async (resolve) => {
            const previous = await getConnection().manager.findOne(Machine, {
                select: [ "id" ],
                where: { id }
            });
            if (!previous) {
                LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE} ${id}`);
                resolve(false);
                return;
            }
            resolve(true);
            return;
        });
    }

    /**
     *  Check if a machine with a serial number exits.
     * @param serialNumber
     */
    public static existsSerialNumber(serialNumber: string, id?: number): Promise<boolean> {
        const FUNCTION_NAME = "existsSerialNumber";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise<boolean>(async (resolve) => {
            const previous = await getConnection().manager.findOne(Machine, {
                select: [ "id" ],
                where: { serialNumber, id }
            });
            if (!previous) {
                LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.MACHINE} ${serialNumber}`);
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
        const FUNCTION_NAME = "add";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise(async (resolve, reject) => {
            LoggerUtility.info(`${logHeader}`);
            LoggerUtility.debug(`${logHeader}`, item);
            if (! await PiecesService.exists(item.piece.refArticle)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.PIECE);
                return;
            }
            if (item.serialNumber && await MachinesService.existsSerialNumber(item.serialNumber)) {
                reject(VALID_RESPONSES.ERROR.EXIST.MACHINE);
                return;
            }
            if (item.serialNumber === "") {
                item.serialNumber = undefined;
            }
            const newItem = await getConnection().manager.save(Machine, item);
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
    public static edit(item: Machine): Promise<Machine> {
        const FUNCTION_NAME = "edit";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise(async (resolve, reject) => {
            LoggerUtility.info(`${logHeader} ${item.id}`);
            LoggerUtility.debug(`${logHeader}`, item);
            if (!item.id) {
                LoggerUtility.warn(`${logHeader} id not valid ${VALID_RESPONSES.ERROR.VALIDATION.ID}`, item.id);
                reject(VALID_RESPONSES.ERROR.VALIDATION.ID);
                return;
            }
            const previous = await getConnection().manager.findOne(Machine, {
                select: ["id"],
                where: { id: item.id }
            });
            if (!previous) {
                LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.IMPORTED_MACHINE} ${item.id}`);
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.IMPORTED_MACHINE);
                return;
            }
            const previousSerial = await getConnection().manager.findOne(Machine, {
                select: [ "id" ],
                where: { serialNumber: item.serialNumber }
            });
            if (previousSerial && previousSerial.id !== item.id) {
                LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.EXIST.MACHINE} with serial number${item.serialNumber}`);
                reject(VALID_RESPONSES.ERROR.EXIST.MACHINE);
                return;
            }
            const editedItem = await getConnection().manager.save(Machine, item);
            LoggerUtility.info(`${logHeader} edited`, editedItem.id
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
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const previous: Machine = await getConnection().manager
            .findOne(Machine
            , DatabaseUtilities.getFindOneObject(params.id, params.deleted, Machine));
        if (!previous) {
            LoggerUtility.warn(`${logHeader} not exists with id ${params.id} and deleted ${params.deleted.toString()}`);
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
    public static get(params: ParametersComplete): Promise<{metadata: Metadata, items: Array<Machine>}> {
        const FUNCTION_NAME = "get";
        const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
        return new Promise(async (resolve, reject) => {
        LoggerUtility.info(`${logHeader}`);
        const object = DatabaseUtilities.getFindObject(params, Machine);
        if (!object) {
            LoggerUtility.warn(`${logHeader} order param malformed ${params.orderBy}`);
            reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
            return;
        }
        LoggerUtility.info(`${logHeader} with`, object);
        const [items, total] = await getConnection().manager.findAndCount(Machine, object);
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
