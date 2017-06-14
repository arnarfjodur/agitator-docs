hooks = require('hooks')
var before = hooks.before
var after = hooks.after

// a request instance to use in hooks
var rp = require('request-promise-native')
// default admin credentials
var adminEmail = 'info@karolinafund.com'
var adminPassword = 'kaffiviski'
// default creator credentials
var creatorEmail = 'test_user' + getTimestamp() + '@example.com'
var creatorPassword = 'password123'
var creatorFirstName = 'Robot'
var creatorLastName = 'Tester'
// default token sample
var tokenSample = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTY5NjE2MTgsInVzZXJfaWQiOjF9.luUUbwE_hvl5mHumWY0wGsyDhhA3OB4arnhnhjuhy76'
// mock server for unimplemented API
var mockHost = 'private-835e99-agitator.apiary-mock.com'

var responseStash = {}
var tempStash = false

/*
 * HOOKS
 */

/*
 * Campaigns
 */
before('Campaigns > Campaigns > Create new campaign > Example 1', function (transaction, done) {
    setToken(transaction, done, 'creator')
})
after('Campaigns > Campaigns > Create new campaign > Example 1', function (transaction) {
    if (transaction.real) {
        if (!responseStash.hasOwnProperty('testCampaignId')) {
            var jsonBody = JSON.parse(transaction.real.body)
            var campaignId = jsonBody.campaign.campaign_id
            responseStash.testCampaignId = campaignId
        }
    }
})
before('Campaigns > Campaigns > Create new campaign > Example 3', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Single campaign > Get campaign > Example 1', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/104
    transaction.skip = true
})
before('Campaigns > Single campaign > Get campaign > Example 2', function (transaction) {
    // TODO: make the private campaignm dynamically instead of hardcoding 2
    replaceCampaignId(transaction, '2')
})
before('Campaigns > Single campaign > Get campaign > Example 3', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/91
    transaction.skip = true
    // TODO: make a deleted campaign dynamically instead of hardcoding 9999
    replaceCampaignId(transaction, '9999')
})
before('Campaigns > Single campaign > Get campaign > Example 4', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Campaign backers > Get campaign backers', function (transaction) {
    // TODO: implement in backend
    transaction.skip = true
})

before('Campaigns > Campaign language > Update campaign language > Example 1', function (transaction, done) {
    if (responseStash.hasOwnProperty('testCampaignId')) {
        replaceCampaignId(transaction, responseStash.testCampaignId)
        setToken(transaction, done, 'creator')
    } else {
        createTestCampaign(transaction, done, true, false)
    }
})
before('Campaigns > Campaign language > Update campaign language > Example 2', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/93
    transaction.skip = true
})
before('Campaigns > Campaign language > Update campaign language > Example 3', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/93
    transaction.skip = true
    // TODO: make a deleted campaign dynamically instead of hardcoding 9999
    replaceCampaignId(transaction, '9999')
    setToken(transaction, done, 'creator')
})
before('Campaigns > Campaign language > Update campaign language > Example 4', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/93
    transaction.skip = true
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Custom campaign language > Update custom campaign language > Example 1', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/99
    transaction.skip = true
    if (responseStash.hasOwnProperty('testCampaignId')) {
        replaceCampaignId(transaction, responseStash.testCampaignId)
        setToken(transaction, done, 'creator')
    } else {
        createTestCampaign(transaction, done, true, false)
    }
})
before('Campaigns > Custom campaign language > Update custom campaign language > Example 3', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/100
    transaction.skip = true
    // TODO: make a deleted campaign dynamically instead of hardcoding 9999
    replaceCampaignId(transaction, '9999')
    setToken(transaction, done, 'creator')
})
before('Campaigns > Custom campaign language > Update custom campaign language > Example 4', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Campaign settings > Update campaign settings > Example 1', function (transaction, done) {
    if (responseStash.hasOwnProperty('testCampaignId')) {
        replaceCampaignId(transaction, responseStash.testCampaignId)
        setToken(transaction, done, 'creator')
    } else {
        createTestCampaign(transaction, done, true, false)
    }
})
before('Campaigns > Campaign settings > Update campaign settings > Example 2', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/93
    transaction.skip = true
})
before('Campaigns > Campaign settings > Update campaign settings > Example 3', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/93
    transaction.skip = true
    // TODO: make a deleted campaign dynamically instead of hardcoding 9999
    replaceCampaignId(transaction, '9999')
    setToken(transaction, done, 'creator')
})
before('Campaigns > Campaign settings > Update campaign settings > Example 4', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/93
    transaction.skip = true
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Campaign meta > Update campaign meta > Example 1', function (transaction, done) {
    if (responseStash.hasOwnProperty('testCampaignId')) {
        replaceCampaignId(transaction, responseStash.testCampaignId)
        setToken(transaction, done, 'creator')
    } else {
        createTestCampaign(transaction, done, true, false)
    }
})
before('Campaigns > Campaign meta > Update campaign meta > Example 3', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/97
    transaction.skip = true
    // TODO: make a deleted campaign dynamically instead of hardcoding 9999
    replaceCampaignId(transaction, '9999')
    setToken(transaction, done, 'admin')
})
before('Campaigns > Campaign meta > Update campaign meta > Example 4', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Campaign admin > Get campaign admin > Example 1', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/95
    transaction.skip = true
    if (responseStash.hasOwnProperty('testCampaignId')) {
        replaceCampaignId(transaction, responseStash.testCampaignId)
        setToken(transaction, done, 'admin')
    } else {
        createTestCampaign(transaction, done, true, true)
    }
})
before('Campaigns > Campaign admin > Get campaign admin > Example 2', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/96
    transaction.skip = true
})
before('Campaigns > Campaign admin > Get campaign admin > Example 3', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/97
    transaction.skip = true
    // TODO: make a deleted campaign dynamically instead of hardcoding 9999
    replaceCampaignId(transaction, '9999')
    setToken(transaction, done, 'admin')
})
before('Campaigns > Campaign admin > Get campaign admin > Example 4', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Campaign admin > Update campaign admin > Example 1', function (transaction, done) {
    if (responseStash.hasOwnProperty('testCampaignId')) {
        replaceCampaignId(transaction, responseStash.testCampaignId)
        setToken(transaction, done, 'admin')
    } else {
        createTestCampaign(transaction, done, true, true)
    }
})
before('Campaigns > Campaign admin > Update campaign admin > Example 3', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/97
    transaction.skip = true
    // TODO: make a deleted campaign dynamically instead of hardcoding 9999
    replaceCampaignId(transaction, '9999')
    setToken(transaction, done, 'admin')
})
before('Campaigns > Campaign admin > Update campaign admin > Example 4', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > My campaigns previews > Get my campaigns previews > Example 1', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/98
    transaction.skip = true
    setToken(transaction, done, 'creator')
})
before('Campaigns > My campaigns previews > Get my campaigns previews > Example 2', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/94
    transaction.skip = true
})
before('Campaigns > My campaigns previews > Get my campaigns previews > Example 3', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

/*
 * Users
 */
before('Users > Users > Create a new user > Example 1', function (transaction) {
    var generatedEmail = 'test_user' + getTimestamp() + '@example.com'
    if (!responseStash.hasOwnProperty('registeredUserEmail')) {
        tempStash = generatedEmail
    }
    replaceUserEmail(transaction, generatedEmail)
})
after('Users > Users > Create a new user > Example 1', function (transaction) {
    if (transaction.real) {
        if (tempStash) {
            responseStash.registeredUserEmail = tempStash
        }
        var jsonBody = JSON.parse(transaction.real.body)
        var token = jsonBody.token.string
        saveToken(token, 'creator')
    }
    tempStash = false
})
before('Users > Users > Create a new user > Example 2', function (transaction) {
    if (!responseStash.hasOwnProperty('registeredUserEmail')) {
        var email = adminEmail
    } else {
        email = responseStash.registeredUserEmail
    }
    replaceUserEmail(transaction, email)
})

before('Users > Users > Generate a token for a user > Example 1', function (transaction, done) {
    if (!responseStash.hasOwnProperty('registeredUserEmail')) {
        replaceUserEmail(transaction, creatorEmail)
        tempStash = creatorEmail
        registerCreator(transaction, done)
    } else {
        var email = responseStash.registeredUserEmail
        replaceUserEmail(transaction, email)
        done()
    }
})
after('Users > Users > Generate a token for a user > Example 1', function (transaction) {
    if (transaction.real) {
        if (tempStash) {
            responseStash.registeredUserEmail = tempStash
        }
    }
    tempStash = false
})
before('Users > Users > Generate a token for a user > Example 3', function (transaction, done) {
    if (!responseStash.hasOwnProperty('registeredUserEmail')) {
        replaceUserEmail(transaction, creatorEmail)
        tempStash = creatorEmail
        registerCreator(transaction, done)
    } else {
        var email = responseStash.registeredUserEmail
        replaceUserEmail(transaction, email)
        done()
    }
})
after('Users > Users > Generate a token for a user > Example 3', function (transaction) {
    if (transaction.real) {
        if (tempStash) {
            responseStash.registeredUserEmail = tempStash
        }
    }
    tempStash = false
})
before('Users > Users > Generate a token for a user > Example 5', function (transaction) {
    replaceUserEmail(transaction)
})

before('Users > Users password changes > Change a password > Example 1', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/101
    transaction.skip = true
})
before('Users > Users password changes > Change a password > Example 2', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/101
    transaction.skip = true
})
before('Users > Users password changes > Change a password > Example 3', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/101
    transaction.skip = true
})
before('Users > Users password changes > Change a password > Example 4', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/101
    transaction.skip = true
})

before('Users > Users previews > Get users previews', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/104
    transaction.skip = true
})

before('Users > Users profile > Get users profile > Example 1', function (transaction, done) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/104
    transaction.skip = true
    setToken(transaction, done, 'admin')
})
before('Users > Users profile > Get users profile > Example 2', function (transaction) {
    // TODO: make a non-existing user dynamically instead of hardcoding 9999
    replaceUserId(transaction, '9999')
})
before('Users > Users profile > Get users profile > Example 3', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Users > My password > Change my password > Example 1', function (transaction, done) {
    setToken(transaction, done, 'creator')
})
before('Users > My password > Change my password > Example 3', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Users > My tags > Set my tags > Example 1', function (transaction, done) {
    setToken(transaction, done, 'creator')
})
before('Users > My tags > Set my tags > Example 2', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/102
    transaction.skip = true
})
before('Users > My tags > Set my tags > Example 3', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})
before('Users > My tags > Set my tags > Example 4', function (transaction, done) {
    // parse request body from API description
    var requestBody = JSON.parse(transaction.request.body)
    // TODO: make a non existing tag dynamically instead of hardcoding 234
    requestBody['tags'] = ['234']
    // stringify the new body to request
    transaction.request.body = JSON.stringify(requestBody)
    setToken(transaction, done, 'creator')
})

/*
 * HELPER FUNCTIONS
 */


/*
 * Sets an authorization token for the transaction
 */
function setToken(transaction, done, type) {
    var tokenKey = type + 'UserToken'
    if (type === 'admin' || type === 'creator') {
        if (responseStash.hasOwnProperty(tokenKey)) {
            transaction.request.headers.Authorization = 'Bearer ' + responseStash[tokenKey]
            done()
        } else {
            injectAuthorizationToken(transaction, done, type)
        }
    } else {
        console.log('cannot set token, type not recognized')
    }
}
/*
 * Saves an authorization token to the stash
 */
function saveToken(token, type) {
    var tokenKey = type + 'UserToken'
    responseStash[tokenKey] = token
}

function getTimestamp() {
    return new Date()
        .getTime()
}

/*
 * Replaces the email for the user actions with a unique generated email to be used in all user actions
 */
function replaceUserEmail(transaction, email = false) {

    // parse request body from API description
    var requestBody = JSON.parse(transaction.request.body)

    // modify request body here
    if (!email) {
        var generatedEmail = 'test_user' + getTimestamp() + '@example.com'
    } else {
        generatedEmail = email
    }
    requestBody['email'] = generatedEmail

    // stringify the new body to request
    transaction.request.body = JSON.stringify(requestBody)
}

/*
 * Replaces the campaign ID in the request URL
 */
function replaceCampaignId(transaction, newId) {
    console.log('replacing campaign id with: ' + newId)
    var id = '1'

    transaction.request.uri = transaction.request.uri.replace(id, newId)
    transaction.fullPath = transaction.fullPath.replace(id, newId)
}

/*
 * Replaces the user ID in the request URL
 */
function replaceUserId(transaction, newId) {
    console.log('replacing user id with: ' + newId)
    var id = '1'

    transaction.request.uri = transaction.request.uri.replace(id, newId)
    transaction.fullPath = transaction.fullPath.replace(id, newId)
}

/*
 * Injects a valid token into the Authorization header
 */
function injectAuthorizationToken(transaction, done, type = false) {
    console.log('injecting auth token')
    if (type === 'admin') {
        var email = adminEmail
        var password = adminPassword
    } else if (type === 'creator') {
        var email = creatorEmail
        var password = creatorPassword
    }
    var uri = transaction.protocol + '//' + transaction.host + '/agitator/users/tokens/'
    rp({
            method: 'POST',
            uri: uri,
            body: {
                email: email,
                password: password
            },
            json: true // Automatically stringifies the body to JSON)
        })
        .then(function (parsedBody) {
            if (parsedBody.hasOwnProperty('status')) {
                if (parsedBody.status === 'success') {
                    transaction.request.headers.Authorization = 'Bearer ' + parsedBody.token.string
                }
            }
            done()
        })
        .catch(function (err) {
            console.log('could not get token: ')
            console.log(err.error.message)
            if (err.error.status === 'wrong_credentials') {
                // user does not exist, create one
                console.log('creating new user... ')
                registerCreator(transaction, done, true, false, false)
            } else {
                done()
            }
        })
}

/*
 * Creates a new user
 */
function registerCreator(transaction, done, injectToken = false, createCampaign = false, replaceCampaignId = false) {
    console.log('registering creator')
    var uri = transaction.protocol + '//' + transaction.host + '/agitator/users/'
    rp({
            method: 'POST',
            uri: uri,
            body: {
                email: creatorEmail,
                password: creatorPassword,
                first_name: creatorFirstName,
                last_name: creatorLastName
            },
            json: true // Automatically stringifies the body to JSON)
        })
        .then(function (parsedBody) {
            var token = parsedBody.token.string
            saveToken(token, 'creator')
            if (injectToken) {
                transaction.request.headers.Authorization = 'Bearer ' + token
            }
            if (createCampaign) {
                if (replaceCampaignId) {
                    createTestCampaign(transaction, done, true, false)
                } else {
                    createTestCampaign(transaction, done, false, false)
                }
            } else {
                done()
            }
        })
        .catch(function (err) {
            console.log('could not register user: ' + err)
            done()
        })
}

/*
 * Creates a new campaign
 */
function createTestCampaign(transaction, done, replaceId = false, needAdmin = false) {
    console.log('creating test campaign')
    var uri = transaction.protocol + '//' + transaction.host + '/agitator/campaigns/'
    if (responseStash.hasOwnProperty('creatorUserToken')) {
        rp({
                method: 'POST',
                uri: uri,
                headers: {
                    'Authorization': 'Bearer ' + responseStash.creatorUserToken
                },
                json: true // Automatically stringifies the body to JSON)
            })
            .then(function (parsedBody) {
                var campaignId = parsedBody.campaign.campaign_id
                if (!responseStash.hasOwnProperty('testCampaignId')) {
                    responseStash.testCampaignId = campaignId
                }
                if (replaceId) {
                    replaceCampaignId(transaction, campaignId)
                }
                if (needAdmin) {
                    setToken(transaction, done, 'admin')
                } else {
                    setToken(transaction, done, 'creator')
                }
            })
            .catch(function (err) {
                console.log('could not create campaign: ' + err)
                done()
            })
    } else {
        console.log('could not create campaign, need to create user')
        if (replaceCampaignId) {
            registerCreator(transaction, done, true, true, true)
        } else {
            registerCreator(transaction, done, true, true)
        }
    }
}
