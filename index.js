const core = require('@actions/core');
const { execSync } = require('child_process');

try {
  // Get the image name from the action input
  const imageName = core.getInput('image-name');

  // Execute the Docker inspect command to get the image metadata
  const inspectCommand = `docker inspect ${imageName}`;
  const output = execSync(inspectCommand).toString();
  const imageMetadata = JSON.parse(output)[0];

  // Extract the desired metadata properties
  const metadata = {
    id: imageMetadata.Id,
    created: imageMetadata.Created,
    size: imageMetadata.Size
  };

  // Set the metadata as action outputs
  core.setOutput('metadata', JSON.stringify(metadata));
} catch (error) {
  core.setFailed(error.message);
}
