'use strict';


/**
 * Add one contract.
 * Add one contract.
 *
 * body Contracts  (optional)
 * returns Contracts
 **/
exports.addContract = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "valid" : true,
  "refContract" : 2,
  "identification" : "identification",
  "dateDebut" : "2000-01-23",
  "loyer" : 9.301444,
  "miniconso" : 3.6160767,
  "client" : "client",
  "reviewed" : true,
  "machines" : [ {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  }, {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  } ],
  "dateFin" : "2000-01-23",
  "reconduction" : "reconduction"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete one contract.
 * Delete one contract.
 *
 * refContract Long id to delete or search
 * no response value expected for this operation
 **/
exports.deleteContract = function(refContract) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit one contract.
 * Edit one contract.
 *
 * body Contracts  (optional)
 * returns Contracts
 **/
exports.editContract = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "valid" : true,
  "refContract" : 2,
  "identification" : "identification",
  "dateDebut" : "2000-01-23",
  "loyer" : 9.301444,
  "miniconso" : 3.6160767,
  "client" : "client",
  "reviewed" : true,
  "machines" : [ {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  }, {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  } ],
  "dateFin" : "2000-01-23",
  "reconduction" : "reconduction"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get one contract.
 * Get one contract.
 *
 * refContract Long id to delete or search
 * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
 * returns Contracts
 **/
exports.getContractById = function(refContract,deleted) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "valid" : true,
  "refContract" : 2,
  "identification" : "identification",
  "dateDebut" : "2000-01-23",
  "loyer" : 9.301444,
  "miniconso" : 3.6160767,
  "client" : "client",
  "reviewed" : true,
  "machines" : [ {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  }, {
    "refContract" : "refContract",
    "piece" : "piece",
    "id" : 7,
    "numSerie" : "numSerie"
  } ],
  "dateFin" : "2000-01-23",
  "reconduction" : "reconduction"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all contracts.
 * Get all contracts.
 *
 * skipParam Integer number of item to skip
 * limit Integer max records to return
 * orderBy String order by property. (optional)
 * filterBy String filter data. (optional)
 * deleted Deleted Get all, deleted, not deleted data. Default not deleted. (optional)
 * metadata Boolean If metadata is needed (for pagination controls) (optional)
 * returns inline_response_200
 **/
exports.getContracts = function(skipParam,limit,orderBy,filterBy,deleted,metadata) {
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
    "valid" : true,
    "refContract" : 2,
    "identification" : "identification",
    "dateDebut" : "2000-01-23",
    "loyer" : 9.301444,
    "miniconso" : 3.6160767,
    "client" : "client",
    "reviewed" : true,
    "machines" : [ {
      "refContract" : "refContract",
      "piece" : "piece",
      "id" : 7,
      "numSerie" : "numSerie"
    }, {
      "refContract" : "refContract",
      "piece" : "piece",
      "id" : 7,
      "numSerie" : "numSerie"
    } ],
    "dateFin" : "2000-01-23",
    "reconduction" : "reconduction"
  }, {
    "valid" : true,
    "refContract" : 2,
    "identification" : "identification",
    "dateDebut" : "2000-01-23",
    "loyer" : 9.301444,
    "miniconso" : 3.6160767,
    "client" : "client",
    "reviewed" : true,
    "machines" : [ {
      "refContract" : "refContract",
      "piece" : "piece",
      "id" : 7,
      "numSerie" : "numSerie"
    }, {
      "refContract" : "refContract",
      "piece" : "piece",
      "id" : 7,
      "numSerie" : "numSerie"
    } ],
    "dateFin" : "2000-01-23",
    "reconduction" : "reconduction"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

