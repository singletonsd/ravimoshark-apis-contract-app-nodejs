'use strict';

var utils = require('../utils/writer.js.js');
var Contracts = require('../service/ContractsService');

module.exports.addContract = function addContract (req, res, next) {
  var body = req.swagger.params['body'].value;
  Contracts.addContract(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteContract = function deleteContract (req, res, next) {
  var refContract = req.swagger.params['refContract'].value;
  Contracts.deleteContract(refContract)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editContract = function editContract (req, res, next) {
  var body = req.swagger.params['body'].value;
  Contracts.editContract(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getContractById = function getContractById (req, res, next) {
  var refContract = req.swagger.params['refContract'].value;
  var deleted = req.swagger.params['deleted'].value;
  Contracts.getContractById(refContract,deleted)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getContracts = function getContracts (req, res, next) {
  var skipParam = req.swagger.params['SkipParam'].value;
  var limit = req.swagger.params['limit'].value;
  var orderBy = req.swagger.params['orderBy'].value;
  var filterBy = req.swagger.params['filterBy'].value;
  var deleted = req.swagger.params['deleted'].value;
  var metadata = req.swagger.params['metadata'].value;
  Contracts.getContracts(skipParam,limit,orderBy,filterBy,deleted,metadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
