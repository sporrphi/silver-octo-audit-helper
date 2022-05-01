const _ = require("lodash");

const commandFilter = function(auditReport, whitelist) {
  const {actions, advisories, muted, metadata, runId} = auditReport;

  // filter advisories
  const filteredAvisories = _filterAdvisories(advisories, whitelist);
  // filter actions
  const filteredActions = _filterActions(actions, whitelist);

  // create new metadata
  const newMetadata = _createMetadataFromAdvisories(
      filteredAvisories, metadata);

  return {
    actions: filteredActions,
    advisories: filteredAvisories,
    muted: muted,
    metadata: newMetadata,
    runId: runId,
  };
};

const _filterAdvisories = function(advisories, whitelist) {
  if (advisories === null || whitelist === null) {
    return null;
  }

  const filteredResult = {};

  for (const [key, value] of Object.entries(advisories)) {
    const found = _.findIndex(whitelist, (element) => {
      return element.id === value.id &&
       element.module_name === value.module_name;
    });
    if (found === -1) {
      filteredResult[key] = value;
    }
  }

  return filteredResult;
};

const _createMetadataFromAdvisories = function(advisories, metadata) {
  const {
    dependencies,
    devDependencies,
    optionalDependencies,
    totalDependencies,
  } = metadata;
  const vulnerabilities = {
    info: 0,
    low: 0,
    moderate: 0,
    high: 0,
    critical: 0,
  };

  for (const [, value] of Object.entries(advisories)) {
    const {severity} = value;
    vulnerabilities[severity] = vulnerabilities[severity] + 1 || 1;
  }

  return {
    vulnerabilities: vulnerabilities,
    dependencies: dependencies,
    devDependencies: devDependencies,
    optionalDependencies: optionalDependencies,
    totalDependencies: totalDependencies,
  };
};

const _filterActions = function(actions, whitelist) {
  const filteredActions = [];

  actions.forEach((action) => {
    const {resolves, module} = action;

    if (module !== whitelist.module_name) {
      return;
    }

    const filteredResolves = _filterResolves(resolves);

    if (filteredResolves.length === 0) {
      return;
    }

    const newAction = {
      action: action.action,
      resolves: filteredResolves,
      module: module,
      target: action.target,
      bundled: action.bundled,
    };

    filteredActions.push(newAction);
  });

  return filteredActions;
};

const _filterResolves = function(resolves, whitelist) {
  const filteredResolves = [];

  resolves.forEach((resolve) => {
    const foundIndex = _.findIndex(whitelist, (element) => {
      return element.id === resolve.id;
    });
    if (foundIndex === -1) {
      filteredResolves.push(resolve);
    }
  });

  return filteredResolves;
};

exports.default = commandFilter;

exports._test = {
  _filterAdvisories,
  _createMetadataFromAdvisories,
};
