Mockserver
==========

This package contains the code for the data provider to be used while developing easy-deposit-ui.

To run this code, move to the root of this module and run

    npm run mockserver

To test this code, an export from Postman is provided in `postman-calls.json`.

Currently the following paths are currently implemented:

    GET    /deposit
    POST   /deposit
    GET    /deposit/:id
    DELETE /deposit/:id
    GET    /deposit/:id/metadata
    PUT    /deposit/:id/metadata
    GET    /deposit/:id/state
    PUT    /deposit/:id/state
