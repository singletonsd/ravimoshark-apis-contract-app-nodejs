import { BaseEntity, FindManyOptions, FindOneOptions, ObjectType } from "typeorm";
import { Deleted, Reviewed, Valid } from "../../models";
import { LoggerUtility } from "../../utils/LoggerUtility";
import { ParametersComplete } from "../../utils/utilities";
import { Clients, Contracts, ImportedMachines, Location, Machine, Pieces } from "../entities";

export class DatabaseUtilities {
  public static getFindOneObject(
    id: number,
    deleted: Deleted,
    entity: ObjectType<BaseEntity>,
    relations?: Array<string>,
    idUser?: number
  ): FindOneOptions {
    const whereObject: { id: number; idUser?: number } = { id };
    if (idUser) {
      whereObject.idUser = idUser;
    }
    const object: FindOneOptions<typeof entity> = {
      where: this.addDeletedParam(deleted, whereObject)
    };
    object.relations = this.addRelations(entity, relations);
    return object;
  }

  public static getFindObject(
    params: ParametersComplete,
    entity: ObjectType<BaseEntity>,
    relations?: Array<string>,
    selections?: Array<string>): FindManyOptions {
    let whereObject: { idUser?: number } = {};
    if (params.filterBy) {
      try {
        whereObject = JSON.parse(params.filterBy);
      } catch (e) {
        LoggerUtility.warn("orderBy parameter provided is not in JSON format.", params.orderBy);
      }
    }
    whereObject = this.addRefClientParam(params.refClient, entity, whereObject);
    const object: FindManyOptions<typeof entity> = {
      skip: params.skip,
      take: params.limit,
      where: this.addDeletedParam(params.deleted, whereObject)
    };
    if (params.reviewed) {
      this.addReviewedParam(params.reviewed, object.where);
    }
    if (params.valid) {
      this.addValidParam(params.valid, object.where);
    }
    this.addRefContractParam(params.refContract, entity, object.where);
    if (params.orderBy) {
      let order: object;
      try {
        order = JSON.parse(params.orderBy);
      } catch (e) {
        order = { id: params.orderBy };
      }
      if (order) {
        object.order = order;
      } else {
        return null;
      }
    }
    object.relations = this.addRelations(entity, relations);
    // object.select = this.addSelections(entity, selections);
    return object;
  }

  public static addRefClientParam(refClient: string, entity: ObjectType<BaseEntity>, params: any): object {
    if (!params) {
      params = {};
    }
    if (!refClient) {
      return params;
    }
    if (entity === Clients) {
      params.refClient = refClient;
    } else if (entity === Contracts) {
      params.client = refClient;
    } else if (entity === Machine) {
      params.contract = { refClient };
    }
    return params;
  }

  public static addRefContractParam(refContract: string, entity: ObjectType<BaseEntity>, params: any): object {
    if (!params) {
      params = {};
    }
    if (!refContract) {
      return params;
    }
    if (entity === Contracts) {
      params.refContract = refContract;
    } else if (entity === Location) {
      params.contract = { refContract };
    } else if (entity === Machine) {
      // TODO: put this condition.
      // params.contract = { refContract };
    }
    return params;
  }

  public static addDeletedParam(deleted: Deleted, params: any): object {
    if (!params) {
      params = {};
    }
    switch (deleted) {
      case Deleted.ALL:
        break;
      case Deleted.DELETED:
        params.deleted = true;
        break;
      case Deleted.ACTIVE:
        params.deleted = false;
        break;
    }
    return params;
  }

  public static addValidParam(valid: Valid, params: any): object {
    if (!params) {
      params = {};
    }
    if (valid === Valid.INVALID) {
      params.valid = false;
    } else if ( valid === Valid.VALID) {
      params.valid = true;
    }
    return params;
  }

  public static addParam(parameter: string, value: string, params: any): object {
    if (!params) {
      params = {};
    }
    if (value) {
      params[parameter] = value;
    }
    return params;
  }

  public static addReviewedParam(reviewed: Reviewed, params: any): object {
    if (!params) {
      params = {};
    }
    if (reviewed === Reviewed.UNREVIEWED) {
      params.reviewed = false;
    } else if ( reviewed === Reviewed.REVIEWED) {
      params.reviewed = true;
    }
    return params;
  }

  public static addRelations(
    entity: ObjectType<BaseEntity>,
    relations?: Array<string>
  ): Array<string> {
    let finalRelations: Array<string>;
    if (relations) {
      finalRelations = relations;
    } else if (entity === Clients) {
      finalRelations = [];
    } else if (entity === Contracts) {
      finalRelations = [
        "client",
        "locations",
        "locations.machine",
        "locations.machine.piece",
        "importedMachines",
        "importedMachines.machine"
      ];
    } else if (entity === ImportedMachines) {
      finalRelations = ["contract", "machine", "machine.piece"];
    } else if (entity === Location) {
      finalRelations = [
        "machine",
        "machine.piece",
        "contract",
        "contract.client"
      ];
    } else if (entity === Machine) {
      finalRelations = ["piece", "locations"];
    } else if (entity === Pieces) {
      finalRelations = [];
    }
    return finalRelations;
  }

  public static addSelections(
    entity: ObjectType<BaseEntity>,
    relations?: Array<string>
  ): Array<string> {
    let finalSelections: Array<string> = new Array<string>();
    if (relations) {
      finalSelections.push(...relations);
    } else if (entity === Clients) {
      finalSelections = [];
    } else if (entity === Contracts) {
      // finalSelections.filter((key) => !key.includes("__"));
      finalSelections = ["refContract", "client.refClient"];
    } else if (entity === ImportedMachines) {
      finalSelections = ["refContract", "machine", "machine.refArticle"];
    } else if (entity === Location) {
      finalSelections = [
        "MachineId",
        "MachineId.RefArticle",
        "RefContract",
        "RefContract.RefClient"
      ];
    } else if (entity === Machine) {
      finalSelections = ["locations", "refArticle"];
    } else if (entity === Pieces) {
      finalSelections = [];
    }
    return finalSelections;
  }
}
