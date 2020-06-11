var BoxSDK = require('box-node-sdk');

// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET'
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient('DEVELOPER_TOKEN');

// Get your own user object from the Box API
// All client methods return a promise that resolves to the results of the API call,
// or rejects when an error occurs
client.users.get(client.CURRENT_USER_ID)
	.then(user => console.log('Hello', user.name, '!'))
	.catch(err => console.log('Got an error!', err));