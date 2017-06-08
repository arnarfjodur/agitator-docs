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

before('Campaigns > Campaigns > Create new campaign > Example 1', function (transaction, done) {
    if (responseStash.hasOwnProperty('registeredUserToken')) {
        transaction.request.headers.Authorization = 'Bearer ' + registeredUserToken
        done()
    } else {
        injectAuthorizationToken(transaction, done, 'creator')
    }
})
before('Campaigns > Campaigns > Create new campaign > Example 3', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Single campaign > Get campaign > Example 2', function (transaction) {
    // TODO: make the private campaignm dynamically instead of hardcoding 2
    replaceCampaignId(transaction, '2')
})
before('Campaigns > Single campaign > Get campaign > Example 3', function (transaction) {
    // BUG: https://github.com/arnarfjodur/Agitator/issues/91
    transaction.skip = true
    // TODO: make a deleted campaignm dynamically instead of hardcoding 999
    replaceCampaignId(transaction, '999')
})
before('Campaigns > Single campaign > Get campaign > Example 4', function (transaction) {
    transaction.request.headers.Authorization = 'Bearer ' + tokenSample
})

before('Campaigns > Campaign backers > Get campaign backers', function (transaction) {
    // TODO: implement in backend
    transaction.host = mockHost
})

before('Users > Users > Register a new user > Example 1', function (transaction) {
    var generatedEmail = 'test_user' + getTimestamp() + '@example.com'
    if (!responseStash.hasOwnProperty('registeredUserEmail')) {
        tempStash = generatedEmail
    }
    replaceUserEmail(transaction, generatedEmail)
})
after('Users > Users > Register a new user > Example 1', function (transaction) {
    if (transaction.real) {
        if (tempStash) {
            responseStash.registeredUserEmail = tempStash
        }
        if (!responseStash.hasOwnProperty('registeredUserToken')) {
            var jsonBody = JSON.parse(transaction.real.body)
            var token = jsonBody.token.string
            responseStash.registeredUserToken = token
        }
    }
    tempStash = false
})
before('Users > Users > Register a new user > Example 2', function (transaction) {
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
after('Users > Users > Generate a token for a user > Example 1', function (transaction, done) {
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
after('Users > Users > Generate a token for a user > Example 3', function (transaction, done) {
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

/*
 * This function replaces the email for the user actions with a unique generated email to be used in all user actions
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
 * This function replaces the campaign ID in the request URL
 */
function replaceCampaignId(transaction, newId) {

    var id = '1'

    transaction.request.uri = transaction.request.uri.replace(id, newId)
    transaction.fullPath = transaction.fullPath.replace(id, newId)
}

/*
 * This function injects a valid token into the Authorization header
 */
function injectAuthorizationToken(transaction, done, type = false) {
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
                registerCreator(transaction, done, true)
            } else {
                done()
            }
        })
}

function getTimestamp() {
    return new Date()
        .getTime()
}

function registerCreator(transaction, done, injectToken = false) {
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
            if (!responseStash.hasOwnProperty('registeredUserToken')) {
                var token = parsedBody.token.string
                responseStash.registeredUserToken = token
            }
            if (injectToken) {
                transaction.request.headers.Authorization = 'Bearer ' + token
            }
            done()
        })
        .catch(function (err) {
            console.log('could not register user: ' + err)
            done()
        })
}
