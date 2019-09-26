"use strict";

import { Deleted, ImportedMachines, RefContract } from "src/models";
import { getConnection } from "typeorm";
import { ImportedMachines as ImportedMachinesDB } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "ImportedMachinesService";

export class ImportedMachinesService<T> {
  // tslint:disable:object-literal-sort-keys
  /**
   * Add one imported Machine.
   * Add one imported Machine.
   *
   * body ImportedMachines  (optional)
   * returns ImportedMachines
   */
  public static addImportedMachine(body: ImportedMachines) {
    return new Promise((resolve, reject) => {
      const examples = {};
      examples["application/json"] = {
        MachineId: 6,
        refContract: "refContract",
        identification: "identification",
        reviewed: true,
        id: 0
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

  /**
   * Delete one imported Machine.
   * Delete one imported Machine.
   *
   * id Long id to delete or search
   * no response value expected for this operation
   */
  public static deleteImportedMachine(id) {
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
  public static editImportedMachine(body: ImportedMachines) {
    return new Promise((resolve, reject) => {
      const examples = {};
      examples["application/json"] = {
        MachineId: 6,
        refContract: "refContract",
        identification: "identification",
        reviewed: true,
        id: 0
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
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
  public static getImportedMachineById(params: ParametersIdDeleted) {
    const FUNCTION_NAME = "getById";
    return new Promise(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const prevAccount: ImportedMachinesDB = await getConnection().manager
          .findOne(ImportedMachinesDB
            , DatabaseUtilities.getFindOneObject(params.id, params.deleted, ImportedMachinesDB));
        if (!prevAccount) {
            LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME
                , "not exists with id", params.id, "and deleted", params.deleted.toString());
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.IMPORTED_MACHINE);
            return;
        }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "got", prevAccount.refContract);
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
  public static getImportedMachines(
    params: ParametersComplete) {
    const FUNCTION_NAME = "get";
    return new Promise(async (resolve, reject) => {
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
      const object = DatabaseUtilities.getFindObject(params, ImportedMachinesDB);
      if (!object) {
          LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "order param malformed", params.orderBy);
          reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
          return;
      }
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "with", object);
      const [accounts, total] = await getConnection().manager.findAndCount(ImportedMachinesDB, object);
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
