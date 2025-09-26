# Installation Guide

This guide provides instructions for setting up the development environment for the CODERS Club Website project. An IDE (Integrated Development Environment) is highly recommended for web development as it provides features such as code completion, local testing, and simplified Git usage. [VS Code](https://code.visualstudio.com/) is a popular and powerful option.

For those who prefer in-person assistance, please contact Brendan Lambrecht at lambrecht5083@uwlax.edu or via [Snapchat](https://snapchat.com/add/bren-dog2020).

## Prerequisites

Before you begin, ensure you have the following installed:

- **Git**: Enables you to track code changes, collaborate effectively, and manage different versions of your project. Download and install from [git-scm.com](https://git-scm.com/).
- **Node.js**: JavaScript runtime environment. We recommend using the LTS (Long Term Support) version. Download from [nodejs.org](https://nodejs.org/).
  - _Optional_: If you plan to work on multiple Node.js projects in the future, using a version manager is highly recommended. This will allow you to easily switch between different Node.js versions as needed. [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) and [nvm-sh](https://github.com/nvm-sh/nvm) (Mac/Linux) are popular choices. For this project, using the LTS version of Node.js is sufficient.
- **npm (Node Package Manager)**: Comes bundled with Node.js. It's generally a good idea to keep npm updated: `npm install -g npm@latest`
- **Angular CLI (Command Line Interface)**: Essential for Angular development. Install it after installing Node.js and npm: `npm install -g @angular/cli`

## Project Setup

These instructions allow for the maintenance of the CODERS website. These are _not_ deployment instructions. Those follow in the deployment section further below.

### 1. Clone the Repository

```bash
git clone https://github.com/UWL-CODERS/website.git
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

## Further Reading & Resources

See the [Further Reading & Resources](README.md/#further-reading--resources) section in the main README for a comprehensive list of learning materials.
