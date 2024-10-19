const { MongoClient } = require('mongodb');

async function createIndex() {
  const uri = 'mongodb://localhost:27017'; 
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('movieDB');
    const collection = database.collection('movies');

    const indexName = await collection.createIndex({ title: 1 });
    console.log(`Index created: ${indexName}`);
    const movies = await collection.find({ title: "Inception" }).toArray();
    console.log('Movies:', movies);
    const result = await collection.dropIndex('title_1');
    console.log('Index deleted:', result);
  } finally {
    await client.close();
  }
}

createIndex().catch(console.dir);