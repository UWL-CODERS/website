# Development Guide

This document provides information on how to develop and contribute to the CODERS Club Website.

## Table of Contents

- [Angular Usage](#angular-usage)
- [Git Demonstration for Beginners](#git-demonstration-for-beginners)

## Angular Usage

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

Angular v20 now supports experimental Vitest integration. To run unit tests with Vitest, type the following command:

```bash
ng test
```

This will run your unit tests using Vitest, with watch mode and browser testing support.

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Git Demonstration for Beginners

This section provides a simple guide to commonly used Git commands. Each command is explained with its purpose and usage, making it beginner-friendly. If possible, use Visual Studio Code or an IDE with an easy-to-understand interface with git functionality unless you have mastered it.

### Initializing a Repository

Create a new Git repository in your project folder.

```bash
git init
```

This command creates a `.git` directory in your project folder, which is used by Git to track changes to your project.

**Example Usage:**

```bash
git init .  # Initializes in the current directory
git init my-project  # Initializes in the "my-project" subdirectory
```

### Checking Repository Status

Display the current state of your working directory and staging area.

```bash
git status
```

Use this command to see which files are modified, added, or ready to commit.

### Staging Changes

Move changes to the staging area, preparing them for a commit.

```bash
git add file1.txt  # Stage a single file
git add .          # Stage all changes
```

### Committing Changes

Save changes from the staging area to the repository's history.

```bash
git commit -m "Add feature X"
```

Please use meaningful messages to describe your changes!

### Pushing Changes

Uploads your local commits to a remote repository (e.g., GitHub).

```bash
git push origin main  # Sends changes from your local "main" branch to the remote
```

### Pulling Updates

Fetches and merges updates from a remote repository into your local branch.

```bash
git pull origin main  # Keeps your local branch synchronized with the remote
```

### Viewing Commit History

Displays a list of past commits.

```bash
git log
git log --oneline  # Concise view
```

### Creating and Switching Branches

Commands:

```bash
git branch feature-x  # Create a new branch
```

```bash
git checkout feature-x  # Switch to the branch
```

```bash
git checkout -b feature-x  # Combine both steps
```

### Merging Branches

Combines changes from one branch into another.

```bash
git merge feature-x  # Merges "feature-x" into the current branch
```

### Cloning a Repository

Creates a local copy of a remote repository.

```bash
git clone <repository_url>
```

Clone this repository using the following command:

```bash
git clone https://github.com/UWL-CODERS/website.git
```

## Further Reading & Resources

See the [Further Reading & Resources](README.md/#further-reading--resources) section in the main README for a comprehensive list of learning materials.
