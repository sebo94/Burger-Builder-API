const { MongoClient, ObjectID } = require("mongodb");
const dbName = "burgerBuilderDB";
const uri = "mongodb://localhost:27017";
const MongoOptions = { useUnifiedTopology: true };

async function getFirst(collectionName) {
  const client = new MongoClient(uri, MongoOptions);
  try {
    await client.connect();
    const db = client.db(dbName);
    return await db
      .collection(collectionName)
      .findOne({}, { projection: { _id: 0 } });
  } catch (error) {
    console.error(
      "Something went wrong when getting first of " +
        collectionName +
        " :" +
        error
    );
  } finally {
    client.close();
  }
}

async function getCollection(collectionName) {
  const client = new MongoClient(uri, MongoOptions);
  try {
    await client.connect();
    const db = client.db(dbName);
    return await db
      .collection(collectionName)
      .find()
      .toArray();
  } catch (error) {
    console.error(
      "Something went wrong when getting " +
        collectionName +
        " collection:" +
        +error
    );
  } finally {
    client.close();
  }
}

async function postOrder(collectionName, order) {
  const client = new MongoClient(uri, MongoOptions);
  try {
    await client.connect();
    const db = client.db(dbName);
    return await db.collection(collectionName).insertOne(order);
  } catch (error) {
    console.error("Something went while posting an order " + error);
  } finally {
    client.close();
  }
}

module.exports = {
  getFirst,
  getCollection,
  postOrder,
};
