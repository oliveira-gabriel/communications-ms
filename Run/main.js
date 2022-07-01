const axios = require("axios");

(function run() {
  console.log("Teste com poucos dados");
  axios.get("http://localhost:3556/");
  axios.get("http://localhost:3009/");
  axios.get("http://localhost:3000/");
  // axios.get("http://localhost:9999/");
  setTimeout(() => {
    while (true) {
      console.log(new Date().toISOString());
    }
  }, 4000);
})();
