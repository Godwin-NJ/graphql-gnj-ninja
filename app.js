require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schemaType/schema");
const mongoose = require("mongoose");
const cors = require("cors");
// express server initialization
const app = express();
// apply cors
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const connectApp = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPWD}@cluster0.w6ddver.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: "graphqlDB",
        serverSelectionTimeoutMS: 5000,
      }
    );
    if (db) {
      app.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
      });
    }
  } catch (error) {
    console.log(`connecting to database failed with error : ${error}`);
  }
};

connectApp();
