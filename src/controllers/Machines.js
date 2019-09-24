'use strict';

var utils = require('../utils/writer.js');
var Machines = require('../service/MachinesService');

module.exports.addMachine = function addMachine (req, res, next) {
  var body = req.swagger.params['body'].value;
  Machines.addMachine(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMachine = function deleteMachine (req, res, next) {
  var id = req.swagger.params['id'].value;
  Machines.deleteMachine(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editMachine = function editMachine (req, res, next) {
  var body = req.swagger.params['body'].value;
  Machines.editMachine(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMachineById = function getMachineById (req, res, next) {
  var id = req.swagger.params['id'].value;
  var deleted = req.swagger.params['deleted'].value;
  Machines.getMachineById(id,deleted)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMachines = function getMachines (req, res, next) {
  var skipParam = req.swagger.params['SkipParam'].value;
  var limit = req.swagger.params['limit'].value;
  var orderBy = req.swagger.params['orderBy'].value;
  var filterBy = req.swagger.params['filterBy'].value;
  var deleted = req.swagger.params['deleted'].value;
  var metadata = req.swagger.params['metadata'].value;
  Machines.getMachines(skipParam,limit,orderBy,filterBy,deleted,metadata)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
