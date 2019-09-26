"use strict";

import { getConnection } from "typeorm";
import { Machine, Machine as MachineDB } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Deleted, Machines, RefContract } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "MachinesService";

export class MachinesService {
  // tslint:disable:object-literal-sort-keys
  /**
   * Add one machine.
   * Add one machine.
   *
   * body Machines  (optional)
   * returns Machines
   */
  public static addMachine(body) {
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
  public static deleteMachine(id) {
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
  public static editMachine(body) {
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
   * Get one Machine.
   * Get one machine.
   *
   * id Long id to delete or search
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * returns Machines
   */
  public static getMachineById(params: ParametersIdDeleted) {
    const FUNCTION_NAME = "getById";
    return new Promise(async (resolve, reject) => {
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
      const prevAccount: MachineDB = await getConnection().manager
        .findOne(MachineDB
          , DatabaseUtilities.getFindOneObject(params.id, params.deleted, MachineDB));
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
  public static getMachines(params: ParametersComplete) {
    const FUNCTION_NAME = "get";
    return new Promise(async (resolve, reject) => {
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
      const object = DatabaseUtilities.getFindObject(params, MachineDB);
      if (!object) {
          LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "order param malformed", params.orderBy);
          reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
          return;
      }
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "with", object);
      const [accounts, total] = await getConnection().manager.findAndCount(MachineDB, object);
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
