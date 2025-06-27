import { MongoClient, Db } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;
const port = process.env.MONGODB_PORT || '27017';

// Verificação básica das variáveis de ambiente
if (!clusterAddress || !dbUser || !dbPassword || !dbName) {
  throw new Error('❌ Variáveis de ambiente MongoDB não configuradas corretamente.');
}

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}:${port}/?retryWrites=true&w=majority`;
//mongodb://user:123456@localhost:27017/curso_git

const client = new MongoClient(uri);

async function connectToMongo(): Promise<Db> {
  try {
    console.log('Trying to connect to db');
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('✅ Connected successfully to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('❌ Connection to MongoDB failed:', error);
    await client.close();
    throw error;
  }
}

export default connectToMongo;
