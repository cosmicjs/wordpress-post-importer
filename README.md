<a href="https://www.cosmicjs.com" target="_blank"><img src="https://cosmic-s3.imgix.net/31cc7ee0-2d80-11e9-9636-75201e82cc8c-wordpress-to-cosmic.jpg?w=1500" width="500" /></a>

# WordPress Import Extension
Install WordPress posts from any existing WordPress website into your Cosmic Bucket in a few clicks. Install this Extension by following these steps:
1. [Login to your Cosmic Bucket](https://www.cosmicjs.com/login)
2. Go to Your Bucket > Settings > Extensions
3. Find and install the WordPress Import Extension

# About Cosmic Extensions
Extend the <a href="https://www.cosmicjs.com" target="_blank">Cosmic</a> dashboard experience. Cosmic Extensions enable you to:
- Create custom views in your Cosmic dashboard
- Connect to third-party APIs


### What is a Comsic JS Extension?
In short, it's a [JAMstack app](https://jamstack.org). It can be a simple static website, or complex web app, using front end web technology.


### Links
[Extension docs](https://www.cosmicjs.com/docs/extensions)

[Extension examples](https://www.cosmicjs.com/extensions/)


### Installation
1. Download the .zip file in this repo
2. [Login to Cosmic](https://www.cosmicjs.com) and go to Your Bucket > Settings > Extensions > Add Extension


### Required files
#### extension.json
Key | Type | Description
--- | --- | ---
| title     | String | Function title
| font_awesome_class      | String | Icon to display in the Bucket sidenav
| image_url      | String | Image thumbnail
| repo_url      | String | Extension source code url

Example `extension.json` file:
```json
{
  "title": "Extension Starter",
  "font_awesome_class": "fa-rocket",
  "image_url": "https://www.cosmicjs.com/images/marketing/logo-w-brand.jpg",
  "repo_url": "https://github.com/cosmicjs/extension-starter"
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run export`
Export the contents of this app into the build folder, then zip the build into `extension.zip` file for upload to Cosmic.
