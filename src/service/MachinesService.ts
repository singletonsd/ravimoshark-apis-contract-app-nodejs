"use strict";

import { Deleted, Machines, RefContract } from "src/models";
import { LoggerUtility } from "../utils/LoggerUtility";
import { Utilities } from "../utils/utilities";
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
  public static getMachineById(id, deleted) {
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
  public static getMachines(
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
          {skip,
            limit,
            orderBy,
            filter,
            deleted,
            metadata,
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
