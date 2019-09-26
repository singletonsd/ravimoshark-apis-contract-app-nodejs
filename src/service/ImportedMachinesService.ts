"use strict";

import { Deleted, ImportedMachines, RefContract } from "src/models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "ImportedMachinesService";

export class ImportedMachinesService {
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
  public static getImportedMachineById(id, deleted) {
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
    skip: number, limit: number,
    orderBy: string, filter: string,
    deleted: Deleted, metadata: boolean
  ) {
    return new Promise((resolve, reject) => {
      const examples = {};
      examples["application/json"] = {
        metadata: {
          next: 5,
          last: 5,
          prev: 6,
          self: 1,
          first: 0
        },
        items: [
          {
            MachineId: 6,
            refContract: "rexport class ContractsService {efContract",
            identification: "identification",
            reviewed: true,
            id: 0
          },
          {
            MachineId: 6,
            refContract: "refContract",
            identification: "identification",
            reviewed: true,
            id: 0
          }
        ]
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }
}