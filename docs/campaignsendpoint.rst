Get campaigns preview (GET /campaigns/preview/language/)
====================================================

This endpoint allows you to fetch a list of campaigns that are either **raising funds** or were **raising funds** in the past. You need to specify the language that you wish to get the information in. It only includes a subset of information for each campaign. To get all of the information for a campaign, you should use Get Campaign for that specific campaign.

Examples
********

You can use the information to display an index of current campaigns to provide your visitors with an overview of campaigns.


Get my campaigns (GET /campaigns/my_campaigns/preview/)
====================================================

This endpoint allows you to fetch a list of campaigns for the currently authenticated user. You need to include an **Authorization** header that defines the user for which the campaigns are being fetched.

Examples
********

You can use the information to display a list of campaigns that the current user is allowed to edit.

Update campaign settings (PATCH /campaigns/campaign_id/settings/)
====================================================

This endpoint allows you to update the settings of a campaign. You need to provide the id of the campaign that you wish to update and include an **Authorization** header for a user that is allowed to update this campaign. Some of the settings that you can update are: target goal, funding deadline, campaign picture, contact email, etc.

Examples
********

You can use this to enable functionality on a "campaign edit" page, where a user can modify an existing campaign.

Update campaign language (PATCH /campaigns/campaign_id/language/)
====================================================

This endpoint allows you to update the content of a campaign. You need to provide the id of the campaign that you wish to update, the language of the text and include an **Authorization** header for a user that is allowed to update this campaign. You can update sections such as: title, short description, tagline, etc.

Examples
********

You can use this to enable functionality on a "campaign edit" page, where a user can modify an existing campaign.

Get campaign admin (GET /campaigns/campaign_id/admin/)
====================================================

This endpoint allows an admin user to see the admin settings of the campaign. You need to provide the id of the campaign that you wish to update and an **Authorization** header for an admin user. You can see settings such as: payment wallet id, stage, commision percentage, etc.

Examples
********

You can use this to enable functionality on a "campaign settings" page, where an admin can see settings for an existing campaign.

Update campaign admin (PATCH /campaigns/campaign_id/admin/)
====================================================

This endpoint allows an admin user to update the admin settings of the campaign. You need to provide the id of the campaign that you wish to update and an **Authorization** header for an admin user. You can update settings such as: payment wallet id, stage, commision percentage, etc.

Examples
********

You can use this to enable functionality on a "campaign settings" page, where an admin can modify settings for an existing campaign.
