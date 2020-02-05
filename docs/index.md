easy-deposit-ui
===============

[![Build Status](https://travis-ci.org/DANS-KNAW/easy-deposit-ui.svg?branch=master)](https://travis-ci.org/DANS-KNAW/easy-deposit-ui)

Self-deposit user web-interface.


BUILDING FROM SOURCE
--------------------

**Prerequisites:**

* Maven 3.3.3 or higher
* NodeJS 8.9.4 or higher
* NPM 5.6.0 or higher

**Download the project:**

    git clone https://github.com/DANS-KNAW/easy-deposit-ui.git
    cd easy-deposit-ui
    [using NPM] npm install
    [using Maven] mvn install

**Running dev server:**

* `npm start`
* go to [http://localhost:3000] in your favorite browser

**Building for production:**

1. using NPM
    * `npm run build`
    * the output can be found in `./target/build`
2. using Maven
    * `mvn clean install`
    * the output can be found in `./target/build`
    * the RPM can be found in `./target/rpm`

Update dependencies
-------------------

    npm install -g npm-check-updates
    ncu -u
    npm install
