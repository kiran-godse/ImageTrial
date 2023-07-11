const { execSync } = require('child_process');

function runDockerContainer(imageName) {
  try {
    const command = `docker run ${imageName}`;
    const output = execSync(command).toString();
    console.log(output);
  } catch (error) {
    console.error('Error running Docker container:', error.message);
  }
}

// Get the image name from an input or pass it as an argument
const imageName = process.argv[2] || 'nginx:latest';

runDockerContainer(imageName);
