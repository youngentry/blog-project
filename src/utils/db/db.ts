import { MongoClient } from "mongodb";

const url: string | undefined = process.env.DB_CONNECT;

// 환경변수 설정하지 않으면 에러 발생
if (!url) {
  throw new Error("The MONGODB_URL environment variable is not defined");
}

let connectDB: Promise<MongoClient>;

// 개발 단계에서는 global 변수에 저장하여 connect를 저장할 때마다 반복하지 않도록 함
if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
