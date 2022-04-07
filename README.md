# Zoom App Vue Template

Use of this sample server is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html)

This Zoom App Template uses Typescript + Vue.js to build a Hello World Zoom App.

## Prerequisites

1. [Node JS](https://nodejs.org/en/)
2. [Docker](https://docker.io/)
3. [Zoom Account](https://support.zoom.us/hc/en-us/articles/207278726-Plan-Types-)
4. [Zoom App Credentials]() (Instructions below)
    1. Client ID
    2. Client Secret
    3. Redirect URI

### Create your Zoom App

You can follow [this guide]() to create a Zoom App with the [Zoom Marketplace](https://marketplace.zoom.us/).

### Client ID and Client Secret

Once your server is created, you can obtain your Client ID and Client Secret from the App Credentials tab of your Zoom
App.

### Home URL and Redirect URL

In order to use the Zoom App within Zoom you'll want to make sure that you're serving over HTTPS and your server is
publicly accessible.

The easiest way to accomplish this is to use a tool like [Ngrok](https://ngrok.com) with the port you're serving on:

```shell
ngrok http 3000
```

Use the Ngrok URL to configure your Zoom App on the Zoom Marketplace with the following information:

1. Home Page: `{{ Ngrok URL }}/`
2. Redirect URL: `{{ Ngrok URL }}/auth`

**Example:** `https://foobar.ngrok.com:1234/auth`

### Scopes

Select the following OAuth scopes from the Scopes tab:

- meeting:read
- meeting:write
- user:read
- zoomapp:inmeeting

### Zoom JS SDK Features

Choose these features from the Zoom JS SDK section of the Features tab:

- shareApp

## Installation

To get started clone the repo:

```shell
git clone https://github.com/zoom/za-vue-template.git
```

Once cloned navigate to the `za-vue-template` directory:

```
cd za-vue-template
```

Then install dependencies. Docker will do this within the container, but it's useful to have local packages for
development and for your IDE.

```shell
npm install
```

## Setup

To start, fill out the [.env](.env) file with your **Client ID**, **Client Secret** and **Redirect URI** from your Zoom
App. No other fields need to be updated for development and many will be generated in the next section.

```dotenv
ZM_CLIENT_ID=...
ZM_CLIENT_SECRET=...
ZM_REDIRECT_URL=...
```

#### Zoom for Government

If you are a [ZfG](https://www.zoomgov.com/) customer you can use the `ZM_HOST` variable to change the base URL used for
Zoom. This will allow you to adjust to the different Marketplace and API Base URLs used by ZfG customers.

**Marketplace URL:** marketplace.*zoomgov.com*

**API Base URL:** api.*zoomgov.com*

## Start the App

### Development

Run the `dev` npm script to start in development mode using a Docker container.

```shell
npm run dev
```

The `dev` script will:

1. Start mongodb in a container
2. Watch Vue.js files and built to the dist/ folder
3. Watch Server files and build to the dist/folder
4. Start the application

### Production

Make sure that you have configured production keys and secrets in your .env file or through the Secrets Manager of your
cloud platform.

Build for production

```shell
npm run build
```

Start the server

```shell
cd dist
npm start
````

## Usage

Install the Zoom App for your user:

1. Navigate to your application on the [Zoom Marketplace](https://marketplace.zoom.us) and Click **Install**
2. or open your Zoom App in a browser ([http://localhost:3000](http://localhost:3000) by default) and click the '
   install' link

## Deployment

You can deploy this server on any service that allows you to host dynamic Node.js apps. You'll first want to make sure
that you've configured a MongoDB server to connect to.

1. [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
2. [Google Cloud](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/nodejs)
3. [AWS](https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/)

## Without Docker

Building without Docker requires that you have an instance of MongoDB running natively or remotely, you've populated the
.env with secrets, and you have adjusted the MongoDB credentials.

The first step, as usual, is to enter your **Client ID**, **Client Secret** and **Redirect URI** for your Zoom App in
the [.env](.env) file. The following steps are unique to building without Docker:

##### Add your DB and Session Secrets

Run `gen-secrets.sh` to generate development secrets or manually enter your own secrets for production.

##### Change the MongoDB Connection String

Change `MONGO_USER` and `MONGO_PASS` to match the user of your database. Then, adjust the format of `MONGO_URL` to match
the connection string of your server.

## Contribution

Please send pull requests and issues to this project for any problems or suggestions that you have! Make sure that you
install packages locally to pass pre-commit git hooks.

### Keeping secrets secret

The application will use loaded data instead of pure environment variables. This adds an extra layer of protection for
secrets while developing locally. In a production environment, you should use a Secret Manager from your hosting
platform instead.

### Code Style

This project uses prettier and eslint to enforce style and protect against coding errors along with a pre-commit git
hook ([husky](https://typicode.github.io/husky/#/)) to ensure files pass checks prior to commit.

### Testing

At this time there are no e2e or unit tests.

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or
our [Developer Forum](https://devforum.zoom.us). Priority support is also available
with [Premier Developer Support](https://zoom.us/docs/en-us/developer-support-plans.html) plans.
