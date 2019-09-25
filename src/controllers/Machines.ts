"use strict";

import { MachinesService } from "../service";
import { CustomNext, CustomRequest, CustomResponse } from "../utils/customsHandlers";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { ResponsePayload } from "../utils/writer";

module.exports.addMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull("body", req.swagger.params, res);
  MachinesService.addMachine(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.deleteMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const id = req.swagger.params.id.value;
  MachinesService.deleteMachine(id)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.editMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull("body", req.swagger.params, res);
  MachinesService.editMachine(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getMachineById = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const id = req.swagger.params.id.value;
  const deleted = req.swagger.params.deleted.value;
  MachinesService.getMachineById(id, deleted)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getMachines = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const params: ParametersComplete = Utilities.checkAllParametersGet(req.swagger.params, res);
  if (!params) {
    return;
  }
  MachinesService.getMachines(params.skip, params.limit, params.orderBy, params.filter
    , params.deleted, params.metadata)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};
