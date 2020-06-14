var BoxSDK = require("box-node-sdk");
var request = require("request");
var fs = require("fs");

// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
  clientID: "uve8miwkcbfeavh8mm1fn4ylcyr8m65k",
  clientSecret: "ab6Xjsqz0iFi55YiH2Cv8iORxWj6yEti",
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient("kFuIEMkQVylGGuitNnlcP8Do3F7fCytJ");

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
    var data = {};
    client.files
      .getDownloadURL(entries[entry].id)
      .then((imageURL) => handleImageURL(imageURL, urls, data))
      .catch((err) => console.log("Got an error!", err));
  }
};

const writeData = (data) => {
  fs.writeFile("NewData.json", JSON.stringify(data), "utf8", function (err) {
    if (err) return console.log(err);
  });
};

const handleImageURL = (url, urls, data) => {
  urls.push(url);
  if (urls.length >= 64) {
    var querystring = require("querystring");
    const form_data = {
      urls: urls,
    };
    const options = {
      url:
        "https://app.nanonets.com/api/v2/OCR/Model/4155eaa4-51b8-4f3d-b985-a62cac749d81/LabelUrls/",
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
      data["call" + Object.keys(data).length] = body;
      writeData(data);
      urls = [];
    });
  }
};
