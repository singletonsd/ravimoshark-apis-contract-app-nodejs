"use strict";

import { ImportedMachinesService } from "../service";
import { CustomNext, CustomRequest, CustomResponse } from "../utils/customsHandlers";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { ResponsePayload } from "../utils/writer";

module.exports.addImportedMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull("body", req.swagger.params, res);
  if (!body) {
    return;
  }
  ImportedMachinesService.addImportedMachine(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.deleteImportedMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const id = Utilities.checkVariableNotNull("id", req.swagger.params, res);
  if (!id) {
    return;
  }
  ImportedMachinesService.deleteImportedMachine(id)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.editImportedMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull("body", req.swagger.params, res);
  if (!body) {
    return;
  }
  ImportedMachinesService.editImportedMachine(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getImportedMachineById = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const params: ParametersIdDeleted = Utilities.checkIdAndDelete(req.swagger.params, res);
  if (!params) {
    return;
  }
  ImportedMachinesService.getImportedMachineById(params)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.getImportedMachines = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const params: ParametersComplete = Utilities.checkAllParametersGet(req.swagger.params, res);
  if (!params) {
    return;
  }
  ImportedMachinesService.getImportedMachines(params)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};
