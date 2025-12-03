# Contributing to the CODERS Club Website

First off, thank you for considering contributing! We're excited to have you on the team. This project is built and maintained by students like you, and every contribution, big or small, is incredibly valuable.

This document is a living guide to help you get set up and start contributing to the website. If you have any questions, don't hesitate to ask on our [Discord server](https://discord.gg/UGupy2CVVq)!

## Who Can Contribute?

While our codebase is open source for learning and transparency, active development and contributions are currently focused on providing experience for our community. We welcome and prioritize pull requests from:

- Current members of the CODERS Club.
- Current students of the University of Wisconsin-La Crosse.

If you are not in one of these groups but have found a bug or have a suggestion, we encourage you to [open an issue](https://github.com/UWL-CODERS/website/issues) to discuss it with the team first.

## Getting Started: Installation

Ready to get the code running? Here's what you'll need:

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v20.19.0 or newer)
- [Angular CLI](https://angular.dev/installation)
- Text editor ([Visual Studio Code](https://code.visualstudio.com/) is recommended)

### Setup Steps

We have two primary workflows for contributing, depending on your role. Please choose the one that applies to you.

#### For CODERS Club Members (Direct Branching Workflow)

This workflow is for trusted club members who have been granted collaborator access to the repository.

1. Clone the main repository directly to your local machine:

```
git clone https://github.com/UWL-CODERS/website.git
cd website
```

2. Create your new branch before making any changes. Please follow our [branching conventions](#branching):

```
git checkout -b feature/your-feature-name
```

3. Install the dependencies:

```
npm install
```

4. Run the development server:

```
ng serve
```

#### For Other UWL Students & Contributors (Fork & Pull Request Workflow)

If you are not a direct collaborator on the repository, please use the standard open-source model of forking and creating a pull request.

1. Fork the repository on GitHub.
2. Clone your fork to your local machine, replacing `YOUR_USERNAME` with your GitHub username:

```
git clone https://github.com/YOUR_USERNAME/website.git
cd website
```

3. Install the dependencies:

```
npm install
```

4. Run the development server:

```
ng serve
```

The development server will be running at `http://localhost:4200/`.

## Development Workflow

We follow a structured workflow to keep the codebase clean and maintainable.

### Branching

All work should be done on a separate branch. Please use the following naming convention:

- **Features**: `feature/short-description` (e.g., `feature/add-event-sponsors`)
- **Bug Fixes:** `fix/short-description` (e.g., `fix/header-menu-overlap`)
- **Refactoring:** `refactor/short-description` (e.g., `refactor/layout-component-styles`)

### Project Structure

To keep our project organized, we group files based on what they do. When you're adding a new file, please place it in the correct folder:

- `src/app/core/`: For components used once across the whole site, like the cookie banner or the initial page-load animation.
- `src/app/layout/`: This holds the main "frame" of our website: the header, footer, and the layout component that ties them together.
- `src/app/pages/`: This is where the actual pages of the site live. Each folder here corresponds to a page you can navigate to, like `/home` or `/projects`.
- `src/app/shared/`: Our toolkit of reusable building blocks. If you create a component that can be used on multiple pages (like the image carousel or our icons), it goes here.
- `src/app/services/`: These are our "worker" files. They handle tasks like fetching data or managing SEO tags behind the scenes.
- `src/app/models/`: Contains the TypeScript "blueprints" for our data. For example, `project.model.ts` defines what information a "Project" object must have.

### Styling with Tailwind CSS

All styling in this project is done using [Tailwind CSS](https://tailwindcss.com/). Please use Tailwind's utility classes directly in the HTML templates. Try to avoid writing custom CSS in `.scss` files unless it's for a complex, non-utility-based style.

### Our Custom Icon System

We use a custom, in-house SVG icon system built on Angular's attribute selectors. This allows us to use icons easily while maintaining a clean DOM.

#### To create a new icon:

The easiest way to create a new icon is to use an existing one as a template.

1.  Navigate to the `src/app/shared/icons/` directory and find a simple icon, like `menu-icon.component.ts`.
2.  Copy this file and rename it for your new icon (e.g., `new-icon.component.ts`).
3.  Inside the new file, update the `selector` and the class name to match the new icon.
4.  Replace the SVG `<path>` data with the data for your new icon.
5.  Finally, don't forget to add your new component to the `index.ts` barrel file in the same folder so it can be easily imported elsewhere.

#### To use an icon:

```
<svg app-icon-name fill="currentColor" class="size-6 text-gray-600 hover:text-blue-600"></svg>
```

### Image Assets

To maintain high performance and fast load times, we highly recommend using the **WebP** format for all images on the website. Please convert standard PNG or JPG files before adding them to the repository.

Recommended tools:
- **[ToWebP](https://towebp.app/)**: Best for batch converting multiple images at once.
- **[Squoosh](https://squoosh.app/)**: Excellent for optimizing single images with granular control.

### Code Quality

We use ESLint and Prettier to maintain a consistent code style.

> [!NOTE]
> In the near future, these will be set up to run automatically before you commit using Husky pre-commit hooks. You won't need to do anything extra—just commit your code, and it will be formatted for you!

## Submitting a Pull Request

1. Commit your changes with a clear and descriptive commit message.
2. Push your branch to your fork:

```
git push origin feature/your-feature-name
```

3. Open a Pull Request (PR) from your fork to the `main` branch of the `UWL-CODERS/website` repository.
4. Fill out the PR, and optionally linking to the issue it resolves.
5. Request a review from the team lead (@muhdfdeen) or other core contributors.

Thank you again for your contribution!
