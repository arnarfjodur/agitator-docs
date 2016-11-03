##############
Users endpoint
##############

General description
===================

The visitors of your website are considered guests until they authenticate (log in). Once authenticated, they become users. Users can create **campaigns**, make **pledges** and edit **campaigns** of which they are a part of (as a team member). There are some actions that can only be executed by an **administrator**. An administrator is a type of a user that has higher privileges that other users and has access to some settings that are hidden to normal users.

Users tokens (/users/tokens)
============================

This endpoint allows you to fetch an authorization token string.

Examples
********

You can use the token string in subsequent requests to authorize by placing the token in the request header, like so:
::
  Authorization:Bearer {JWToken}

Example:
::
  Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NzA5NDEzNzgsInVzZXJfaWQiOiI3In0.JZIIbmVBZqR7AIav2Lo0MBj9sHwfmcK3KHLCyNRonzA
