"use strict";

import { getConnection } from "typeorm";
import { Clients } from "../databases/entities";
import { DatabaseUtilities } from "../databases/utils/DatabaseUtils";
import { LoggerUtility } from "../utils/LoggerUtility";
import { ParametersComplete, Utilities } from "../utils/utilities";
import { VALID_RESPONSES } from "../utils/ValidResponses";

const SERVICE_NAME = "ClientsService";
export class ClientsService {

  /**
   *  Check if a location exits.
   * @param id
   */
  public static exists(refClient: string): Promise<boolean> {
    const FUNCTION_NAME = "exists";
    const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
    return new Promise<boolean>(async (resolve, reject) => {
        const previous = await getConnection().manager.findOne(Clients, {
            select: [ "refClient" ],
            where: { refClient }
        });
        if (!previous) {
            LoggerUtility.warn(`${logHeader} ${VALID_RESPONSES.ERROR.NOT_EXIST.CLIENT} ${refClient}`);
            resolve(false);
            return;
        }
        resolve(true);
        return;
    });
  }

  /**
   * Get all clients.
   * Get all clients.
   *
   * skipParam Integer number of item to skip
   * limit Integer max records to return
   * orderBy String order by property. (optional)
   * filterBy String filter data. (optional)
   * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
   * metadata Boolean If metadata is needed (for pagination controls) (optional)
   * returns inline_response_200
   */
  public static get(
    params: ParametersComplete
  ) {
    const FUNCTION_NAME = "get";
    const logHeader = `${SERVICE_NAME}: ${FUNCTION_NAME} -`;
    return new Promise(async (resolve, reject) => {
      LoggerUtility.info(`${logHeader}`);
      const object = DatabaseUtilities.getFindObject(params, Clients);
      if (!object) {
          LoggerUtility.warn(`${logHeader} order param malformed`, params.orderBy);
          reject(VALID_RESPONSES.ERROR.PARAMS.MALFORMED.ORDERBY);
          return;
      }
      LoggerUtility.info(`${logHeader} with`, object);
      const [items, total] = await getConnection().manager.findAndCount(Clients, object);
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
