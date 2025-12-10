const https = require('https');
console.log("githubService.js loaded");

const fetchAndPrintActivity = (username) => {
  return new Promise((resolve, reject) => {

    const url = `https://api.github.com/users/${username}/events`;

    const options = {
      headers: {
        "User-Agent": "github-activity-node-app",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    };

    console.log("Making request:", url);

    const req = https.get(url, options, (res) => {

      console.log("Status Code:", res.statusCode);

      if (res.statusCode !== 200) {
        reject(new Error(`GitHub API error: ${res.statusCode}`));
        return;
      }

      let data = "";

      res.on("data", chunk => {
        console.log("Received chunk");
        data += chunk;
      });

      res.on("end", () => {
        console.log("Response ended");
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error("Invalid JSON"));
        }
      });
    });

    req.on("error", (err) => {
      console.log("Network error:", err.message);
      reject(err);
    });
  });
};

module.exports = { fetchAndPrintActivity };
