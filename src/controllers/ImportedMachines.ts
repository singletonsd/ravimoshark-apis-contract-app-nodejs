"use strict";

import { ImportedMachinesService } from "../service";
import { CustomNext, CustomRequest, CustomResponse } from "../utils/customsHandlers";
import { ParametersComplete, ParametersIdDeleted, Utilities } from "../utils/utilities";
import { ResponsePayload } from "../utils/writer";

module.exports.addImportedMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull(req.swagger.params.undefined.originalValue, res);
  if (!body) {
    return;
  }
  ImportedMachinesService.add(body)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.deleteImportedMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const id = Utilities.checkIdAndDelete(req.swagger.params, res);
  if (!id) {
    return;
  }
  ImportedMachinesService.delete(id)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};

module.exports.editImportedMachine = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
  const body = Utilities.checkVariableNotNull(req.swagger.params.undefined.originalValue, res);
  if (!body) {
    return;
  }
  ImportedMachinesService.edit(body)
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
  ImportedMachinesService.getById(params)
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
  ImportedMachinesService.get(params)
    .then((response: any) => {
      ResponsePayload.response(res, response);
    }).catch((response: any) => {
      ResponsePayload.response400(res, response);
    });
};
