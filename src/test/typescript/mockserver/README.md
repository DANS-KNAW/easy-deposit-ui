Mockserver
==========

This package contains the code for the data provider to be used while developing easy-deposit-ui.

To run this code, move to the root of this module and run

    npm run mockserver

To test this code, an export from Postman is provided in `postman-calls.json`.

Currently the following paths are currently implemented:

    GET    /deposit
    GET    /deposit401
    POST   /deposit
    POST   /deposit401

    GET    /deposit/:id
    GET    /deposit401/:id
    DELETE /deposit/:id
    DELETE /deposit401/:id

    GET    /deposit/:id/metadata
    GET    /deposit401/:id/metadata
    PUT    /deposit/:id/metadata
    PUT    /deposit401/:id/metadata

    GET    /deposit/:id/doi
    GET    /deposit401/:id/doi

    GET    /deposit/:id/state
    GET    /deposit401/:id/state
    PUT    /deposit/:id/state
    PUT    /deposit401/:id/state

    GET    /deposit/:id/file/:dir_path*?
    GET    /deposit401/:id/file/:dir_path*?
    POST   /deposit/:id/file/:dir_path*?
    POST   /deposit401/:id/file/:dir_path*?
    PUT    /deposit/:id/file/:dir_path*?
    DELETE /deposit/:id/file/:dir_path*?
    DELETE /deposit401/:id/file/:dir_path*?

    GET    /user
    GET    /user401
