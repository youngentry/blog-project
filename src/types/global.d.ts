import { MongoClient } from 'mongodb';

export {};

declare global {
  namespace globalThis {
    var _mongo: Promise<MongoClient>;
  }
}
