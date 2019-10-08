"use strict";

import { getConnection } from "typeorm";
import { Contracts } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Deleted, Metadata, RefContract } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import {
  ParametersComplete,
  ParametersIdDeleted,
  Utilities
} from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";
import { ImportedMachinesService } from "./ImportedMachinesService";
import { LocationsService } from "./LocationsService";

const SERVICE_NAME = "ContractsService";
// tslint:disable:object-literal-sort-keys
export class ContractsService {

    /**
     *  Check if a contract exits.
     * @param refContract
     */
    public static exists(refContract: number): Promise<boolean> {
        const FUNCTION_NAME = "exists";
        return new Promise<boolean>(async (resolve, reject) => {
            const previous = await getConnection().manager.findOne(Contracts, {
                where: { refContract },
                select: ["refContract"]
            });
            if (!previous) {
                LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME,
                VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT, refContract);
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
        return new Promise<Contracts>((resolve, reject) => {
        const examples = {};
        examples["application/json"] = {
            valid: true,
            refContract: 2,
            identification: "identification",
            dateDebut: "2000-01-23",
            loyer: 9.301444,
            miniconso: 3.6160767,
            client: "client",
            reviewed: true,
            machines: [
            {
                refContract: "refContract",
                piece: "piece",
                id: 7,
                numSerie: "numSerie"
            },
            {
                refContract: "refContract",
                piece: "piece",
                id: 7,
                numSerie: "numSerie"
            }
            ],
            dateFin: "2000-01-23",
            reconduction: "reconduction"
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
    public static delete(refContract: RefContract) {
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
        return new Promise<Contracts>(async (resolve, reject) => {
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, contract.refContract);
            LoggerUtility.debug(SERVICE_NAME, FUNCTION_NAME, contract);
            if (!contract.refContract) {
                LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME,
                "id not valid", VALID_RESPONSES.ERROR.VALIDATION.ID,
                contract.refContract);
                reject(VALID_RESPONSES.ERROR.VALIDATION.ID);
                return;
            }
            if (!this.exists(contract.refContract)) {
                reject(VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT);
                return;
            }
            const editedContract = await getConnection().manager.save(Contracts, contract);
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME,
                "edited", editedContract.refContract
            );
            contract.importedMachines.forEach(async (imported) => {
                if (imported.id) {
                    await ImportedMachinesService.edit(imported);
                } else {
                    await ImportedMachinesService.add(imported);
                }
            });
            contract.locations.forEach(async (location) => {
                if (!location.id) {
                    await LocationsService.add(location);
                } else {
                    await LocationsService.edit(location);
                }
            });
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
        return new Promise<Contracts>(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const previous: Contracts = await getConnection().manager.findOne(
            Contracts,
            DatabaseUtilities.getFindOneObject(
            params.id,
            params.deleted,
            Contracts
            )
        );
        if (!previous) {
            LoggerUtility.warn(
            SERVICE_NAME,
            FUNCTION_NAME,
            "not exists with id",
            params.id,
            "and deleted",
            params.deleted.toString()
            );
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.CONTRACT);
            return;
        }
        LoggerUtility.info(
            SERVICE_NAME,
            FUNCTION_NAME,
            "got",
            previous.refContract
        );
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
        return new Promise<{metadata: Metadata, items: Array<Contracts>}>(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const object = DatabaseUtilities.getFindObject(params, Contracts);
        if (!object) {
            LoggerUtility.warn(
            SERVICE_NAME,
            FUNCTION_NAME,
            "order param malformed",
            params.orderBy
            );
            reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
            return;
        }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "with", object);
        const [accounts, total] = await getConnection().manager.findAndCount(
            Contracts,
            object
        );
        if (!accounts || !accounts.length) {
            LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "empty result");
            resolve();
            return;
        }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "got ", accounts.length);
        resolve(Utilities.getMetadataFormat(accounts, total, params));
        return;
        });
    }
}
