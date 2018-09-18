# developer-tools

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [openssl](https://devcenter.heroku.com/articles/ssl-certificate-self#prerequisites)

## Installation

* `git clone <repository-url>` this repository
* `cd developer-tools`
* `npm install`
* `bower install`

## Generate Self-Signed Certs

The dev tools project must be run using HTTPS for web chat to work. To disable SSL, remove the `"ssl"` property from `.ember-cli`.

These instructions are based on [these](https://devcenter.heroku.com/articles/ssl-certificate-self). 

```
# Make and use ssl dir in this repo
mkdir ssl
cd ssl

# Generate keys
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
rm server.pass.key

# Generate CSR
openssl req -new -key server.key -out server.csr

# Example config:
# ---------------
# Country Name (2 letter code) []:US
# State or Province Name (full name) []:IN
# Locality Name (eg, city) []:Indianapolis
# Organization Name (eg, company) []:Genesys
# Organizational Unit Name (eg, section) []:PureCloud
# Common Name (eg, fully qualified host name) []:localhost
# Email Address []:pure@genesys.com
# 
# Please enter the following 'extra' attributes
# to be sent with your certificate request
# A challenge password []:

# Generate cert
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

## Running / Development

* `ember serve`
* Visit your app at [https://localhost:4200](https://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
