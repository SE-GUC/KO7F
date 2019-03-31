require("dotenv").config();
const mongoose = require("mongoose");
const nfetch = require("node-fetch");

const PORT = 3000;

// DB Config
const db = require("./config/Keys_Dev").mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Clean database first
mongoose.connection.dropDatabase();

async function genAll() {
  const createEvent = async requestBody => {
    return new Promise(async (resolve, reject) => {
      const response = await nfetch(`http://localhost:${PORT}/api/events/`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      if ("data" in jsonResponse) {
        resolve(jsonResponse.data);
      } else {
        reject(jsonResponse.error);
      }
    });
  };

  await createEvent({
    name: "Sokna",
    details: "from 12-5-2019 to 20-5-2019"
  });

  const createPortalLibrary = async requestBody => {
    return new Promise(async (resolve, reject) => {
      const response = await nfetch(
        `http://localhost:${PORT}/api/portal_libraries/`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      if ("data" in jsonResponse) {
        resolve(jsonResponse.data);
      } else {
        reject(jsonResponse.error);
      }
    });
  };

  await createPortalLibrary({
    title: "Sokna",
    details: "from 12-5-2019 to 20-5-2019"
  });


  const createQuestion = async requestBody => {
    return new Promise(async (resolve, reject) => {
      const response = await nfetch(`http://localhost:${PORT}/api/questions/`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      if ("data" in jsonResponse) {
        resolve(jsonResponse.data);
      } else {
        reject(jsonResponse.error);
      }
    });
  };

  await createQuestion({
    quest: "What is the university's mission",
      question_id: 600,
      submit_user: "omar"
  });
  
}

genAll();
