const {
  _filterAdvisories,
  _createMetadataFromAdvisories,
}= require("./command-filter")._test;
const npmAuditMock1 = require("../etc/mocks/npmAuditMock1.json");
const whitlistMock1 = require("../etc/mocks/whitelist1.json");

describe("Test _filterAdvisories function.", () => {
  test("Should return null if auditReport param is null.", () => {
    const whitelist = [
      {id: 1234, module_name: "jest", description: "This is a test"},
    ];

    const result = _filterAdvisories(null, whitelist);

    expect(result).toBeNull();
  });

  test("Should return null if whitelist param is null.", () => {
    const advisories = {
      10993: {
        findings: [{version: "4.4.1", paths: "karma"}],
        metadata: null,
        vulnerable_version: "<6.3.16",
        module_name: "karma",
        severity: "moderate",
        github_advisory_id: "GHSA-asdad",
        cves: [
          "CVE-2021-23495",
        ],
        access: "PublicKeyCredential",
        pathced_versions: ">= 6.3.16",
      },
    };

    const result = _filterAdvisories(advisories, null);

    expect(result).toBeNull();
  });

  test("If run correct, should return advisories not in whitelist.", () => {
    const advisories = npmAuditMock1.advisories;
    const whitelist = whitlistMock1.whitelist;
    const result = _filterAdvisories(advisories, whitelist);

    expect(result).not.toBeNull();
    const expectedIdInResult = ["1069567", "1069961", "1070199"];
    const notExpectedIdInResult = ["1067342", "1069960"];
    const idInResult = Object.keys(result);

    expect(idInResult).toEqual(expectedIdInResult);
    notExpectedIdInResult.forEach((notExpectedId) => {
      expect(idInResult).not.toContain(notExpectedId);
    });
  });
});

describe("Test _createMetadataFromAdvisories function.", () => {
  test("If run correctly then returns correct values", () => {
    const {advisories, metadata} = npmAuditMock1;
    const testMetadata = {
      "vulnerabilities": {
        "info": 0,
        "low": 0,
        "moderate": 0,
        "high": 0,
        "critical": 0,
      },
      "dependencies": metadata.dependencies,
      "devDependencies": metadata.devDependencies,
      "optionalDependencies": metadata.optionalDependencies,
      "totalDependencies": metadata.totalDependencies,
    };
    const result = _createMetadataFromAdvisories(advisories, testMetadata);

    expect(result).toEqual(metadata);
  });
});
