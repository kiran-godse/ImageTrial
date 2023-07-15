const core = require('@actions/core');

try {
  const substrateJson = core.getInput('substrate_json');
  const substrateObject = JSON.parse(substrateJson);
  
  const version = substrateObject.tag;
  core.setOutput('version', version);
} catch (error) {
  core.setFailed(`Error occurred while getting the substrate version: ${error.message}`);
}
