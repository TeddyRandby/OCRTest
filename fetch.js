var BoxSDK = require("box-node-sdk");
var request = require("request");
var fs = require("fs");

// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
  clientID: "uve8miwkcbfeavh8mm1fn4ylcyr8m65k",
  clientSecret: "ab6Xjsqz0iFi55YiH2Cv8iORxWj6yEti",
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient("Ty7I8wQPgj7wgjZemBNntGC4VRQI7061");

// Get file information for FDR HMI
// Hardcoded to just fetch a single file
client.folders
  .get("108901511164")
  .then((folder) => parseFolderInfo(folder))
  .catch((err) => console.log("Got an error!", err));

const parseFolderInfo = (folder) => {
  console.log(folder.id, folder.name);
  console.log("Size:", folder.size);
  console.log("Items:", folder.item_collection.total_count);

  var entries = folder.item_collection.entries;

  for (entry in entries) {
    var urls = [];
    client.files
      .getDownloadURL(entries[entry].id)
      .then((imageURL) => parseImageURL(imageURL, urls))
      .catch((err) => console.log("Got an error!", err));
  }
};

const parseImageURL = (url, urls) => {
  urls.push(url);
  if (urls.length >= 64) {
    var querystring = require("querystring");
    const form_data = {
      urls: urls
    };
    const options = {
      url: "https://app.nanonets.com/api/v2/OCR/Model/4cae0f95-be52-4ed2-b589-98010662c5f7/LabelUrls/",
      body: querystring.stringify(form_data),
      headers: {
        Authorization:
          "Basic " +
          Buffer.from("aiSkeln2Q24-dvmmRbckLHLzmISGggdp" + ":").toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    request.post(options, function (err, httpResponse, body) {
      // Replace this with writing to a file in an organized way
      console.log(body);
      urls = [];
    });
  }
};
