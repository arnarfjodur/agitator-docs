.. _users-endpoint:
##############
Users endpoint
##############

/users/tokens
=============

This endpoint allows you to fetch an authorization token string.

Request
*******

The request should include the following headers:
::
  Content-Type:application/json

The request should include a JSON formatted body:

.. code-block:: json

  {
    "email": "example@example.com",
    "password": "password123"
  }

Response
********

The response contains a JSON formatted body:

* token.string: Only provided if the credentials are correct.
* message: Only provided if the credentials are incorrect.
* status: The status of the request.

Example of a successful call:

.. code-block:: json

  {
    "token": {
      "string": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NzUwODI2MzksInVzZXJfaWQiOiI4In0.8cfHg8fkqfMlnsAKOr5qpl-ms0GqZER57NQOkV6xkMY"
    },
    "status": "success"
  }

Example of an unsuccessful call:

.. code-block:: json

  {
    "message": "Sorry, didn't work",
    "status": "success"
  }

Examples
********

You can use the token string in subsequent requests to authorize by placing the token in the request header, like so:
::
  Authorization:Bearer {JWToken}

Example:
::
  Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NzA5NDEzNzgsInVzZXJfaWQiOiI3In0.JZIIbmVBZqR7AIav2Lo0MBj9sHwfmcK3KHLCyNRonzA
