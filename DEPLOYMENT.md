# Installation Guide

This guide provides instructions for setting up the development environment for the CODERS Club Website project. An IDE (Integrated Development Environment) is highly recommended for web development as it provides features such as code completion, local testing, and simplified Git usage. [VS Code](https://code.visualstudio.com/) is a popular and powerful option.

For those who prefer in-person assistance, please contact the CODERS Website Team Leader.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: Enables you to track code changes, collaborate effectively, and manage different versions of your project. Download and install from [git-scm.com](https://git-scm.com/).
- **Node.js**: JavaScript runtime environment. We recommend using the LTS (Long Term Support) version. Download from [nodejs.org](https://nodejs.org/).
  - *Optional*: If you plan to work on multiple Node.js projects in the future, using a version manager is highly recommended. This will allow you to easily switch between different Node.js versions as needed. [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) and [nvm-sh](https://github.com/nvm-sh/nvm) (Mac/Linux) are popular choices. For this project, using the LTS version of Node.js is sufficient.
- **npm (Node Package Manager)**: Comes bundled with Node.js. It's generally a good idea to keep npm updated: `npm install -g npm@latest`
- **Angular CLI (Command Line Interface)**: Essential for Angular development. Install it after installing Node.js and npm: `npm install -g @angular/cli`

## Project Setup

These instructions allow for the maintenance of the CODERS website. These are *not* deployment instructions. Those follow in the deployment section further below.

### 1. Clone the Repository

```bash
git clone https://github.com/UWL-CODERS/CODERS_Website.git
```

### 2. Install Dependencies

Navigate to the project directory and run the following in your terminal:

```bash
npm install
```

This command reads the `package.json` file and installs all the necessary project dependencies.

### 3. Running the Development Server

```bash
ng serve
```

This will compile the project and start a local development server. You should be able to access the application in your browser at `http://localhost:4200`.

# Deployment - EXECS ONLY

### 1. Fresh Deployment - For Future Reference

Our production service runs on Rocky Linux 9.5 within the department's [OpenStack](https://cloud.cs.uwlax.edu) infrastructure.
The IP address of this instance is 138.49.184.127, and the login credentials are maintained by the CODERS leadership.
Completing a fresh deployment consists of:

1. Building a Rocky Linux instance in OpenStack according to the [department instructions](https://www.cs.uwlax.edu/currentstudents/technology/openstack). The subsequent steps assume you have a shell on the instance and execute any commands with administrative privileges, whether directly as root or by running `sudo`.

2. Install the Node.js dependencies by running `dnf module install nodejs:18` and `dnf install npm`.

3. Copy the source tree of the website to `/srv/`. The directory containing the source must be named `CODERS_Website-main`. For example, a correct copy will lead to the existence of this file at `/srv/CODERS_Website-main/INSTALL.md`.

4. Copy the file `coders.service` to `/lib/systemd/system/`. This provides the systemd service definition used to run the service.

5. Run `systemctl start coders`. This starts the service for the current boot.

6. Run `systemctl enable coders`. This configures systemd to start the service on each system boot. From this point on, systemd will automatically start the service when the computer restarts.

7. Perform a system update with `dnf update`.

### 2. Internet Availability

The department web server provides a reverse proxy service that connects the CODERS website to the URL [https://coders.cs.uwlax.edu](https://coders.cs.uwlax.edu). Professor Petullo maintains this, and it requires that he configure both the web and DNS servers accordingly.

### 3. If you have a Massive Version Updates (Huge Restructure, etc.)

Performing this kind of update consists of the following steps:

1. Copy `/srv/CODERS_Website-main/` to `/srv/CODERS_Website-main-OLD/`

2. Replace the existing source tree at `/srv/CODERS_Website-main/` with a new one.

3. Run `dnf update` to update the system packages.

4. Run `systemctl restart coders` to restart the service.

### 4. If you have a Small Correction Updates (Misspelling, Incorrect Image File Paths, etc.)

1. Perform the Operations to resolve the issue seen on the deployed version of the website, not local.

2. After Completing the changes and ensuring no errors are present, run the following in order:
  a. sudo systemctl daemon-reload
  b. sudo systemctl restart coders
  c. sudo systemctl status coders

This process will reload the website with the changes you made, refresh the coders-service to call back to your newest version, and check to ensure your changes were successful!


## Further Reading & Resources

See the [Further Reading & Resources](README.md/#further-reading--resources) section in the main README for a comprehensive list of learning materials.
