'use strict';


/**
 * Add one machine.
 * Add one machine.
 *
 * body Machines  (optional)
 * returns Machines
 **/
exports.addMachine = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "refContract" : "refContract",
  "piece" : "piece",
  "id" : 7,
  "numSerie" : "numSerie"
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
 **/
exports.deleteMachine = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit one machine.
 * Edit one machine.
 *
 * body Machines  (optional)
 * returns Machines
 **/
exports.editMachine = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "refContract" : "refContract",
  "piece" : "piece",
  "id" : 7,
  "numSerie" : "numSerie"
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
 **/
exports.getMachineById = function(id,deleted) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "refContract" : "refContract",
  "piece" : "piece",
  "id" : 7,
  "numSerie" : "numSerie"
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
 **/
exports.getMachines = function(skipParam,limit,orderBy,filterBy,deleted,metadata) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "metadata" : {
    "next" : 5,
    "last" : 5,
    "prev" : 6,
    "self" : 1,
    "first" : 0
  },
  "items" : [ {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  }, {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

