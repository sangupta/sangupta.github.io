/**
 * The script needs to do the following:
 * 
 * 1. Use webify to build the site folder sangupta.com
 * 2. Startthe skylight package in watch mode
 * 3. Copy the generated site folder to the skylight dist folder
 * 4. Watch for changes
 *   a. If webify changes, rebuild the site folder, and copy to skylight dist folder
 *   b. If the site folder changes, rebuild the site folder, and copy to skylight dist folder
 */

const fs = require('fs-extra');
const path = require('path');
const { spawn, execSync } = require('child_process');

const webifyPath = path.join(__dirname, 'webify');
const skylightPath = path.join(__dirname, 'skylight');
const sitePath = path.join(__dirname, 'sangupta.com');
const deploymentPath = path.join(__dirname, 'deploy');

/**
 * Helper function to build the site using webify.
 * This function runs the webify build command
 * and ensures the site folder is built correctly.
 */
function buildSite() {
  console.log('Building site using webify...');

  // clean any previous version
  execSync('npm run clean', {
    cwd: webifyPath,
    stdio: 'inherit'
  });

  execSync('npm run webify', {
    cwd: webifyPath,
    stdio: 'inherit'
  });
}

/**
 * Helper function to build the Skylight SPA package.
 * This function runs the build command for Skylight
 * and ensures the Skylight package is built correctly.
 */
function buildSkylight() {
  console.log('Building skylight...');

  // clean any existing dist folder
  execSync('npm run clean', {
    cwd: skylightPath,
    stdio: 'inherit'
  });

  // run the build command
  execSync('npm run build', {
    cwd: skylightPath,
    stdio: 'inherit'
  });
}

/**
 * Helper function to create the deployment folder.
 */
function createDeploymentFolder() {
  // copy the built site to the deployment folder
  console.log('Creating deployment folder...');
  fs.ensureDirSync(deploymentPath);

  console.log('  Copying skylight...');
  fs.copySync(path.join(skylightPath, 'dist'), deploymentPath, {
    overwrite: true
  });

  console.log('  Copying site...');
  fs.copySync(path.join(sitePath, 'dist'), deploymentPath, {
    overwrite: true
  });
}

// Helper function to copy site to skylight dist folder
function copySiteToSkylight() {
  console.log('Copying site to skylight dist folder...');

  // Copy site content to skylight dist
  fs.copySync(
    path.join(sitePath, 'dist'),
    path.join(skylightPath, 'dist'),
    {
      overwrite: true
    }
  );
}

// Start skylight in watch mode
function startSkylight() {
  console.log('Starting skylight in watch mode...');
  const skylight = spawn('npm',
    [
      'run',
      'watch'
    ],
    {
      cwd: skylightPath, stdio: 'inherit'
    }
  );

  skylight.on('close', (code) => {
    console.log(`Skylight process exited with code ${code}`);
    process.exit(code);
  });

  return skylight;
}

async function deploy() {
  try {
    // Initial build sequence
    buildSite();
    buildSkylight();
    createDeploymentFolder();
  } catch (error) {
    console.error('Error during deployment:', error);
    process.exit(1);
  }
}

/**
 * Function to deploy the site.
 * This function builds the site, builds the skylight package,
 * and creates the deployment folder.
 */
async function deploySite() {
  console.log('Running deployment workflow...');
  buildSite();
  buildSkylight();
  createDeploymentFolder();
  console.log('Deployment completed successfully.');
}

/**
 * Function to develop the site.
 * This function builds the site, starts the skylight in watch mode,
 * and copies the site to the skylight dist folder.
 * 
 * It will also watch for changes in the site folder
 * and rebuild the site and copy it to the skylight dist folder
 * whenever changes are detected.
 */
async function developSite() {
  buildSite();
  startSkylight();
  copySiteToSkylight();
}

/**
 * Function to clean the site and skylight dist folders.
 * This function removes the dist folders from both site and skylight,
 * as well as the deployment folder.
 */
async function cleanSite() {
  console.log('Cleaning site and skylight dist folders...');

  // Clean the site folder
  fs.removeSync(path.join(sitePath, 'dist'));

  // Clean the skylight dist folder
  fs.removeSync(path.join(skylightPath, 'dist'));

  // Clean the deployment folder
  fs.removeSync(deploymentPath);

  console.log('Cleaned successfully.');
}

// Main function to orchestrate the development workflow
async function doMain() {
  // read command line arguments
  const args = process.argv.slice(2);

  const argument = (args[0] || 'deploy').toLowerCase();

  if (argument === 'deploy') {
    await deploySite();
    return;
  }

  if (argument === 'dev') {
    await developSite();
    return;
  }

  if (argument === 'clean') {
    await cleanSite();
    return;
  }

  console.error('Invalid argument. Use "deploy" or "dev" or "clean".');
}

// Run the development workflow
doMain();
