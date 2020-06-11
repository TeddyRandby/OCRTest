var BoxSDK = require("box-node-sdk");

// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
  clientID: "uve8miwkcbfeavh8mm1fn4ylcyr8m65k",
  clientSecret: "ab6Xjsqz0iFi55YiH2Cv8iORxWj6yEti",
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient("ERSBj6pelrbR8DVFbj6VVSYAI4BpWZDY");


 // Get file information for FDR HMI
client.folders
  .get('111202498273')
  .then((folder) => console.log(folder))
  .catch((err) => console.log("Got an error!", err));
