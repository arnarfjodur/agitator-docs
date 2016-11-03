##################
Campaigns endpoint
##################

General description
===================

Campaigns are the basic element of crowdfunding. In reward-based crowdfunding, campaigns are often referred to as *projects*. Each registered user may create and edit a campaign. Admin user may add other users to the **team**, which allows them to edit a campaign.

A campaign may pass through several stages:
* Private
* Preparing
* Raising funds
* Executing
* Finished
* Canceled

Depending on the stage, a campaign has different levels of visibility. Admin user can always see a campaign, but a guest user can only see it if it is not **Private**.

Each campaign also has admin-level settings, that only an admin user can change. Some of those are: *funding deadline*, *campaign stage*, *associated payment wallet*, etc.

Campaign content (title, description, etc.) is saved separately for each available language. In absence of language specific text, the default fallback language text is returned (usually English).

Get campaigns preview (/campaigns/preview/language/)
====================================================

This endpoint allows you to fetch a list of campaigns that are either **raising funds** or were **raising funds** in the past. You need to specify the language that you wish to get the information in. It only includes a subset of information for each campaign. To get all of the information for a campaign, you should use Get Campaign for that specific campaign.

Examples
********

You can use the information to display an index of current campaigns to provide your visitors with an overview of campaigns.

Get campaign (/campaigns/campaign_id/language/)
====================================================

This endpoint allows you to fetch a single campaign. You need to specify the id of the campaign and the language that you wish to get the information in. Depending on the stage of the campaign, you may need to include an **Authorization** header in order to see the campaign.

Examples
********

You can use the information to display an single campaign page where your visitors can see all the information regarding a campaign.


Get my campaigns (/campaigns/my_campaigns/preview/)
====================================================

This endpoint allows you to fetch a list of campaigns for the currently authenticated user. You need to include an **Authorization** header that defines the user for which the campaigns are being fetched.

Examples
********

You can use the information to display a list of campaigns that the current user is allowed to edit.
