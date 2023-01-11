const { MongoClient } = require('mongodb');

module.exports = class UserRepository {
  constructor() {
    this.database = process.env.MONGO_DB;
    this.collection = 'users';
    this.connection = process.env.MONGO_URL;
    console.log(`database:${this.database}`);
    console.log(`connection${this.connection}`);
  }

  async insert(obj) {
    let client;
    let result;
    try {
      client = await MongoClient.connect(this.connection /* process.env.MONGO_URL */, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      result = await col.insertOne(obj);
      // console.log(result);
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
    } finally {
      client.close();
    }

    return result;
  }

  async select(record, paging) {
    let client;
    const result = {};
    result.data = [];
    result.error = 0;
    result.errorMsg = '';
    try {
      client = await MongoClient.connect(this.connection /* process.env.MONGO_URL */, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      const dbo = client.db(this.database);
      const col = dbo.collection(this.collection);
      if (paging) {
        result.data = await col.find(record).skip(paging.page * paging.limit)
          .limit(paging.limit).toArray();
      } else {
        result.data = await col.find(record).toArray();
      }
    } catch (e) {
      result.errorMsg = e.message();
      result.error = 10;
      console.log(e);
    } finally {
      client.close();
    }
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
