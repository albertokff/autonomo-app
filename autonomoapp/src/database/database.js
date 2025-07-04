import * as SQLite from 'expo-sqlite';

let dbPromise;

export async function openDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('autonomoapp.db');
  }
  return dbPromise;
}

export async function createTable() {
  const db = await openDb();
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT
    );`
  );
}

export async function insertService({ name, price, description }) {
  const db = await openDb();
  await db.runAsync(
    'INSERT INTO services (name, price, description) VALUES (?, ?, ?)',
    [name, price, description]
  );
}

export async function getAllServices() {
  const db = await openDb();
  const result = await db.getAllAsync('SELECT * FROM services');
  return result;
}
