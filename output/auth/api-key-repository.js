const { MongoClient } = require('mongodb');

module.exports = class ApiKeyRepository {
  constructor() {
    this.database = process.env.MONGO_DB;
    this.collection = 'apikeys';
    this.connection = process.env.MONGO_URL;
    console.log(`database:${this.database}`);
    console.log(`connection${this.connection}`);
  }

  async insert(obj) {
    let client;
    try {
      client = await MongoClient.connect(this.connection /* process.env.MONGO_URL */, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      await col.insertOne(obj);
    } catch (e) {
      console.log(e.stack);
    }
    client.close();
  }

  async select(record) {
    let client;
    let result = [];
    try {
      client = await MongoClient.connect(this.connection /* process.env.MONGO_URL */, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.find(record).toArray();
    } catch (e) {
      console.log(e.stack);
    }
    client.close();
    return result;
  }

  async update(record, newValues) {
    let client;
    let result;
    try {
      client = await MongoClient.connect(this.connection /* process.env.MONGO_URL */, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.updateMany(record, newValues);
    } catch (e) {
      console.log(e.stack);
    }
    client.close();
    return result;
  }

  async deleteRecord(record) {
    let client;
    let result;
    try {
      client = await MongoClient.connect(this.connection /* process.env.MONGO_URL */, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.deleteMany(record);
    } catch (e) {
      console.log(e.stack);
    }
    client.close();
    return result;
  }
};
