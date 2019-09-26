"use strict";

import { getConnection } from "typeorm";
import { Contracts as ContractsDB } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { Contracts, Deleted, RefContract } from "../models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "ContractsService";
// tslint:disable:object-literal-sort-keys
export class ContractsService {
  /**
   * Add one contract.
   * Add one contract.
   *
   * body Contracts  (optional)
   * returns Contracts
   */
  public static addContract(body: Contracts) {
    return new Promise((resolve, reject) => {
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
  public static deleteContract(refContract: RefContract) {
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
  public static editContract(body: Contracts) {
    return new Promise((resolve, reject) => {
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
   * Get one contract.
   * Get one contract.
   *
   * refContract Long id to delete or search
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * returns Contracts
   */
  public static getContractById(refContract: number, deleted: Deleted) {
    const FUNCTION_NAME = "getById";
    return new Promise(async (resolve, reject) => {
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
        const prevAccount: ContractsDB = await getConnection().manager
            .findOne(ContractsDB, DatabaseUtilities.getFindOneObject(refContract, deleted, ContractsDB));
        if (!prevAccount) {
            LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME
                , "not exists with id", refContract.refContract, "and deleted", deleted.toString());
            reject(VALID_RESPONSES.ERROR.NOT_EXIST.ACCOUNT);
            return;
        }
        LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "got", prevAccount.refContract);
        resolve(prevAccount);
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
  public static getContracts(
    params: ParametersComplete
  ) {
    const FUNCTION_NAME = "get";
    return new Promise(async (resolve, reject) => {
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME);
      const object = DatabaseUtilities.getFindObject(params, ContractsDB);
      if (!object) {
          LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "order param malformed", orderBy);
          reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
          return;
      }
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "with", object);
      const [accounts, total] = await getConnection().manager.findAndCount(ContractsDB, object);
      if (!accounts || !accounts.length) {
          LoggerUtility.warn(SERVICE_NAME, FUNCTION_NAME, "empty result");
          resolve();
          return;
      }
      const apiAccounts = [];
      for (const us of accounts) {
          apiAccounts.push(new Contracts({ model: us}));
      }
      LoggerUtility.info(SERVICE_NAME, FUNCTION_NAME, "got ", accounts.length);
      resolve(Utilities.getMetadataFormat(accounts, total, params));
      return;
  });
  }
}
