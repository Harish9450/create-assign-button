# MakerX.Components
## Introduction
This repository houses internal React-based behavioral front-end components for building experiences for the Business Application Group, based on UI controls in [BusinessApp-Fabric](https://msazure.visualstudio.com/One/PowerApps-Portal/_git/BusinessApp-Fabric) and [Office Fabric](https://github.com/officedev).

## Usage
Since we're still in development, we haven't finalized the distribution pattern for the components. It's highly likely that the pattern to import a component would be:
### Installation
Add this to your .npmrc file:
```
registry=https://registry.npmjs.org/
@dev:registry=https://msazure.pkgs.visualstudio.com/_packaging/Dev/npm/registry/
always-auth=true
```
This allows you to install packages from the Microsoft internal @dev feed.
```
npm install @dev/maker-x-components
```

Once installed, you can import the package directly as:
```
import { MetadataList } from "@dev/maker-x-components"
```

Instructions and ability to consume the package using a bundle will be added shortly.

## Building and Contributing
### Getting Started
Clone the repository
```
git clone https://msazure.visualstudio.com/DefaultCollection/OneAgile/_git/MakerX-Components
```
Then install the dependencies via npm:  
(Since the package has dependencies on internal Microsoft feeds, you'll need to authenticate your shell.)
```bash
npm install -g vsts-npm-auth
vsts-npm-auth -config .npmrc
npm install
```

### Running the sandbox
The library comes with a pre-configured sandbox to see the components visually and, in some cases, be able to interactively tweak their state and properties.
The sandbox was built on top of a third-party library, [Storybook](https://github.com/storybooks/storybook).
```bash
npm run start
```
The sandbox will then be available at `localhost:8080`.

### Running Tests
```bash
npm run test
```
To run tests in watch-mode (only rebuilds and runs changed tests):
```
npm run test:watch
```

### Directory Structure

The directory structure for the components is as follows:
```
./
├── src/
|   ├── components
│   |   ├── ComponentName
|   |   |   |── ComponentName.tsx
|   |   |   |── examples        // sandbox examples 
|   |   |   |── tests           // unit tests
|   |   |   └── ...             // other component-specific files and folders
│   |   └── ...                 // other components
|   └── shared                  // shared services
├── stories                 // imports examples and renders the sandbox
├── dist                    // compiled distribution files
└── README.md
```

## TODO
- [ ] How to add and test a new component
- [x] Add installation and contribution docs