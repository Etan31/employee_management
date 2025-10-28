# Full-Stack Project Setup Guide
----------------------------------

This project is organized in the following structure:
v1/
 ├── frontend/
 └── backend/

## Backend Setup

1. Open a terminal and run:
```bash
cd backend
npm install express pg dotenv cors bcryptjs
node server.js
```

2. Rename the file:
   `v1/backend/.envcopy` → `v1/backend/.env`

## Frontend Setup

1. Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```

----------------------------------
## Running Tests (CI)
----------------------------------
A dummy test file is included to make sure the CI pipeline runs correctly.

To run tests manually:
```bash
cd backend
npm test
```

If no tests are found:
```bash
   npm test -- --passWithNoTests
```

Example dummy test (backend/__tests__/dummy.test.js):
```
   test('CI sanity check', () => {
     expect(true).toBe(true);
   });
```

## Conventional Commits

Use these prefixes for your commit messages:

feat: new features added
fix: resolving bugs
docs: update usage instructions in README
style: updating styles in a page
refactor: simplify database query logic

----------------------------------
## Naming Conventions
----------------------------------
classNames: this-sample-classname
id: this-is-sample-id
folder: this_is_sample_folder
imports: FirstLetterIsUpperCaseSampleImport
files: this-is-sample-file-name

----------------------------------
## Notes
----------------------------------
- Ensure both backend and frontend run on compatible ports.
- Modify your environment variables in the .env file.
- Follow Conventional Commits for consistent history.

----------------------------------
## CI/CD (GitHub Actions)
----------------------------------
If you are using GitHub Actions, create the file:
.github/workflows/test.yml

And paste this:

name: Run Backend Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd v1/backend
          npm ci

      - name: Run tests
        run: |
          cd v1/backend
          npm test -- --passWithNoTests

----------------------------------
## Author Information
----------------------------------
Author: ** Tristan Ehron Abogadie Tumbaga **
Version: v1
License: MIT
