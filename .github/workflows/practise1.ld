name: Practise1
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Node.js dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Build the project
        run: npm run build

      - name: Deploy to production
        run: echo "Deploying to production..."
    