# Contribution Guidelines

In order to contribute to this project, some standards have been provided for developers. The major advantages of following these standards are easier code review, higher code reusability and readability, and better teamwork. This file describes the mentioned standards in detail.

## Tech Stack

We use [TypeScript](https://www.typescriptlang.org/docs "TypeScript") as our programming language. Here are the required tools and technologies in order of their importance:

### Front-end

- [React](https://reactjs.org/docs/getting-started.html)
- [Next.js](https://nextjs.org/docs/getting-started)
- [Styled Components](https://styled-components.com/docs)
- [StoryBook](https://storybook.js.org/docs)

## Development

To start contributing use the following commands:

| Command  | Functionality  | Path |
| ------------ | ------------ | ------------ |
| **npm run reinit**    | Building and initializing all projects | root |
| **npm start**         | Starting the project in the dev mode   | backend(/apc) |
| **npm test**      | Run jest unit tests                    | backend(/apc) |
| **npm run test:integration** | Run jest integration test       | backend(/apc) |
| **npm run storybook** | Starting storybook environment         | frontend |

### Command Details

- **`npm run reinit`**  
  installs all required packages in both `frontend` and `backend` directories, synchronizes the database structure, and so on. Please consider running this command when **creating a new branch from master** or **rebasing your working branch**.

- **`npm start`**  
  starts both `frontend` and `backend` development environment (__watch__ mode) and starts essential containers.

- **`npm test`** and **`npm run test:integration`**  
  You can run these commands in __watch mode__ if you want to have a Test Driven Development workflow.  
  e.g. ``npm run test:integration -- --watch``

### Naming conventions

Before starting development, it would be better to unify our coding and namings to find things better and distinguish files and codes in a much simpler manner. The following covers both variable and file naming conventions. e.g. if a file exports a TypeScript Class it should be PascalCase.  

#### **camelCase**

- Variables and constants
- Functions and methods
- Database objects
- Resolvers
- Mutations and Queries names
- Directory names
- Next.js pages

#### **PascalCase**

- TypeScript Classes, Interfaces and Enums
- React Components
- Styled Components

#### **UPPERCASE** (Separated by underscore)

- Environment variables

#### **Git Commit Messages**

  Try to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- Adding a new feature would be like **feat: new feature described**
- Fixing a bug would be like **fix: resolved bug description**
- Initializing a file or component would be like **init: new component described**
- Adding a new documentation **doc: add Readme.md**
- Refactoring an old code **refactor: moduleX to support new style**

#### **Git Branch Names**

- Hotfix branches should start with the word **hotFix**, followed by the description separated by dashes, like **hotFix/new-branch-name**
- Use a short name for your branch and don't use jira issue name in it. e.g. `add-api-manager`

### VSCode Tools and Helpers

#### **Snippets**

There are some snippets available for both front-end and back-end development. You can easily find them in [**typescript.code-snippets**](./.vscode/typescript.code-snippets) and [**typescriptreact.code-snippets**](./.vscode/typescriptreact.code-snippets).
For instance, you can easily create a blank Next.js page using the **`nextp`** trigger word.

### Creating merge requests

After a task is done, consider a title for Merge Request (MR) according to the following format:

`[Description] - Resolves LE-[Number]`

Where `[Description]` provides a proper description of the task in the __Conventional Commits__ style and `[Number]` is the task number. For instance, a standard MR title can be:  

`feat: add create exam API - Resolves LE-14`.  

## Frontend Development

### Storybook Driven Development

Here are the steps to make a frontend contribution using Storybook Driven Development:  

- Start Storybook dev env by: `npm run storybook`
- Create an empty React component in [components](./frontend/src/components) directory (use `rcomp` snippet)
- Define a `.stories.tsx` file alongside it
- Find Zeplin designs and stories for component. Define a story for each Zeplin story.
- Connect each Zeplin Component to a Storybook Story using [Storybook Zeplin Addon](https://www.npmjs.com/package/storybook-zeplin)
- Define your component's property types using TypeScript and add its [StoryBook Controls](https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type)
- If you need to use a Next.js link in your component use [Storybook NextJS Router Addon](https://www.npmjs.com/package/storybook-addon-next-router)
- Implement your component
- Resolve any issues in the Storybook [Mobile](https://www.npmjs.com/package/storybook-mobile) and [Accessibility](https://www.npmjs.com/package/@storybook/addon-a11y) tabs

### Next.js Pages

  Here are the steps to add a Next.js Page:

- Run the project using `npm start` in the root
- Create a page component (use `nextp` snippet)
- Reuse components in the [components](./frontend/src/components) directory
- Add queries in the **page** and its **sub components** to the page's `getStaticProps`. (you can skip this step if it is OK for queries to happen in client-side)
