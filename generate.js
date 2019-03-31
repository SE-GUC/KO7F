require("dotenv").config();
const mongoose = require("mongoose");
const nfetch = require("node-fetch");

const PORT = 3000;

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongo
const connectToMongo = () => mongoose
    .connect(db, { useNewUrlParser: true })

// Clean database first
const dropMongo = () => mongoose.connection.dropDatabase();

const createEvent = requestBody => {
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

const generateAll = async () => {

  connectToMongo()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
  await dropMongo()
  await createEvent({
    name: "Sokna",
    details: "from 12-5-2019 to 20-5-2019"
  });
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

generateAll();
