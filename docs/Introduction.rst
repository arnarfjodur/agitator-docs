############
Introduction
############

This documentation describes how to use the Agitator API as the backend for your own frontend client.

About the API
=============

The API allows you to create a frontend and use the provided backend to power your crowdfunding website. The API documentation is organized by endpoints (e.g. /users/, /campaigns/). You are provided with examples and additional information where necessary.

About crowdfunding
==================

There are some concepts that you should be familiar with in order to understand the functionality of the API. The various endpoint of the API represent these concepts.

Users
*****

The visitors of your website are considered guests until they authenticate (log in). Once authenticated, they become users. Users can create **campaigns**, make **pledges** and edit **campaigns** of which they are a part of (as a team member). There are some actions that can only be executed by an **administrator**. An administrator is a type of a user that has higher privileges that other users and has access to some settings that are hidden to normal users.

Campaigns
*********

Campaigns are crowdfunding projects that are created by **users**. Each campaign may pass through several stages, such as: private, preparing, raising funds, executing, finished. Depending on the stage, **users** and guests have different privileges for a specific campaign.

For example, a guest can not see a campaign that is private or preparing. A user can make changes to his campaign while private or preparing, but once it starts raising funds, only an **administrator** is allowed to make changes.

A campaign can also have several team members. Team members are users that are added to a campaign by an administrator and are also able to make changes to a campaign.

Rewards
*******
Rewards belong to a campaign. Only authorized **users** may edit rewards. Authorized users are the camapign creator, team members and administrators.

Pledges
*******

Pledges are contributions of **users** to **campaigns**. The amount of a successful pledge is reflected in the *total funds raised* of a campaign.

Endpoints
=========

* :ref:`users-endpoint`
