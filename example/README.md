## Steps to run the app

It assumes that you are in repository root directory.

1. Run `yarn` in root directory to install dependencies
1. Run `yarn --cwd reanimated-arc build:watch` to start building library in watch mode
1. Run `yarn --cwd example start` to start packager. It is required to start packager separately because otherwise it has incorrect working directory.
1. Run `yarn --cwd example android` or `yarn --cwd example ios` to start example app
