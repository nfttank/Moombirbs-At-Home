# Moombirbs At Home

Not affiliated with Proof or the Moonbirds trademark.

# Website deployment

The project website is hosted on GitHub Pages.
Set up your own website with the following steps right out of your project's GitHub repository.

- Install Node
- Install yarn `npm install --global yarn`
- **Only once** Install gh-pages `yarn add gh-pages`
- **Only once** add homepage to package.json
```json
{
  "name": ...,
  "version": ...,
  "homepage": "https://nfttank.github.io/.../",
  "dependencies": ...
```
- **Only once** add scripts predeploy and deploy to package.json
```json
  "scripts": {
    "start": ...,
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
```
- Run deployment with `npm run deploy`
- GitHub Pages have to point to the branch `gh-pages` (updated and pushed by this deployment)
