"use strict";

import { getConnection } from "typeorm";
import { ImportedMachines } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Deleted, Metadata } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";
import { LocationsService } from "./LocationsService";
import { MachinesService } from "./MachinesService";

const SERVICE_NAME = "ImportedMachinesService";

export class ImportedMachinesService {
  // tslint:disable:object-literal-sort-keys

    /**
     *  Check if a imported machine exits.
     * @param id
     */
    public static exists(id: number): Promise<boolean> {
        const FUNCTION_NAME = "exists";
        return new Promise<boolean>(async (resolve, reject) => {
            const previous = await getConnection().manager.findOne(ImportedMachines, {
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
     * Add one imported Machine.
     * Add one imported Machine.
     *
     * body ImportedMachines  (optional)
     * returns ImportedMachines
     */
    public static add(item: ImportedMachines): Promise<ImportedMachines> {
        const FUNCTION_NAME = "add";
        return new Promise<ImportedMachines>(async (resolve, reject) => {
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, item.id);
            LoggerUtility.debug(SERVICE_NAME, FUNCTION_NAME, item);
            const editedItem = await getConnection().manager.save(ImportedMachines, item);
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME,
                "edited", editedItem.id
            );
            if (editedItem.machine) {
                if (editedItem.machine.id) {
                    await MachinesService.edit(editedItem.machine);
                } else {
                    await LocationsService.add({ contract: item.contract, machine: editedItem.machine});
                }
            }
            resolve(this.getById({ id: editedItem.id, deleted: Deleted.ALL }));
            return;
        });
  }

    /**
     * Delete one imported Machine.
     * Delete one imported Machine.
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
     * Edit one imported Machine.
     * Edit one imported Machine.
     *
     * body ImportedMachines  (optional)
     * returns ImportedMachines
     */
    public static edit(item: ImportedMachines): Promise<ImportedMachines> {
        const FUNCTION_NAME = "edit";
        return new Promise<ImportedMachines>(async (resolve, reject) => {
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, item.id);
            LoggerUtility.debug(SERVICE_NAME, FUNCTION_NAME, item);
            if (!item.id) {
                LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME,
                "id not valid", VALID_RESPONSES.ERROR.VALIDATION.ID,
                item.refContract);
                reject(VALID_RESPONSES.ERROR.VALIDATION.ID);
                return;
            }
            const previous = await getConnection().manager.findOne(ImportedMachines, {
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
            const editedItem = await getConnection().manager.save(ImportedMachines, item);
            LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME,
                "edited", editedItem.id
            );
            if (editedItem.machine) {
                if (editedItem.machine.id) {
                    await MachinesService.edit(editedItem.machine);
                } else {
                    await LocationsService.add({ contract: item.contract, machine: editedItem.machine});
                }
            }
            resolve(this.getById({ id: editedItem.id, deleted: Deleted.ALL }));
            return;
        });
    }

    /**
     * Get one imported Machine.
     * Get one imported Machine.
     *
     * id Long id to delete or search
     * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
     * returns Machines
     */
    public static getById(params: ParametersIdDeleted): Promise<ImportedMachines> {
        const FUNCTION_NAME = "getById";
        return new Promise<ImportedMachines>(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const prevAccount: ImportedMachines = await getConnection().manager.findOne(
            ImportedMachines,
            DatabaseUtilities.getFindOneObject(
            params.id,
            params.deleted,
            ImportedMachines
            )
        );
        if (!prevAccount) {
            LoggerUtility.warn(
            SERVICE_NAME,
            FUNCTION_NAME,
            "not exists with id",
            params.id,
            "and deleted",
            params.deleted.toString()
            );
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.IMPORTED_MACHINE);
            return;
        }
        LoggerUtility.info(
            SERVICE_NAME,
            FUNCTION_NAME,
            "got",
            prevAccount.refContract
        );
        resolve(prevAccount);
        return;
        });
    }

  /**
   * Get all imported Machines.
   * Get all imported Machines.
   *
   * skipParam Integer number of item to skip
   * limit Integer max records to return
   * orderBy String order by property. (optional)
   * filterBy String filter data. (optional)
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * metadata Boolean If metadata is needed (for pagination controls) (optional)
   * returns inline_response_200_1
   */
  public static get(params: ParametersComplete): Promise<{metadata: Metadata, items: Array<ImportedMachines>}> {
    const FUNCTION_NAME = "get";
    return new Promise<{metadata: Metadata, items: Array<ImportedMachines>}> (async (resolve, reject) => {
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
      const object = DatabaseUtilities.getFindObject(params, ImportedMachines);
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
        ImportedMachines,
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
