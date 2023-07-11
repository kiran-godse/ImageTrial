const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const image = core.getInput('image');

    // Execute the Docker Buildx command and retrieve the manifest in JSON format
    const inspectCommand = `docker buildx imagetools inspect ${image} --format "{{json .Manifest}}"`;
    let inspectOutput = '';
    await exec.exec(inspectCommand, [], {
      listeners: {
        stdout: (data) => {
          inspectOutput += data.toString();
        }
      }
    });

    const manifest = JSON.parse(inspectOutput.trim());

    // Filter the manifests and select the one with the amd64 architecture
    const amd64Manifest = manifest.manifests.find((m) => m.platform.architecture === 'amd64');

    if (amd64Manifest) {
      const digest = amd64Manifest.digest;
      core.setOutput('digest', digest);
      console.log(`Digest for amd64 architecture: ${digest}`);
    } else {
      console.log('No manifest found for amd64 architecture');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();