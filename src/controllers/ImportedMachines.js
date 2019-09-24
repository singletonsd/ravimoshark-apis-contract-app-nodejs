'use strict';

var utils = require('../utils/writer.js');
var ImportedMachines = require('../service/ImportedMachinesService');

module.exports.addImportedMachine = function addImportedMachine (req, res, next) {
  var body = req.swagger.params['body'].value;
  ImportedMachines.addImportedMachine(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteImportedMachine = function deleteImportedMachine (req, res, next) {
  var id = req.swagger.params['id'].value;
  ImportedMachines.deleteImportedMachine(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editImportedMachine = function editImportedMachine (req, res, next) {
  var body = req.swagger.params['body'].value;
  ImportedMachines.editImportedMachine(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getImportedMachineById = function getImportedMachineById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var deleted = req.swagger.params['deleted'].value;
  ImportedMachines.getImportedMachineById(id,deleted)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getImportedMachines = function getImportedMachines (req, res, next) {
  var skipParam = req.swagger.params['SkipParam'].value;
  var limit = req.swagger.params['limit'].value;
  var orderBy = req.swagger.params['orderBy'].value;
  var filterBy = req.swagger.params['filterBy'].value;
  var deleted = req.swagger.params['deleted'].value;
  var metadata = req.swagger.params['metadata'].value;
  ImportedMachines.getImportedMachines(skipParam,limit,orderBy,filterBy,deleted,metadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
