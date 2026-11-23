import Database from "better-sqlite3";

const databasePath = (process.env.DATABASE_URL ?? "file:./prisma/dev.db").replace(/^file:/, "");
const database = new Database(databasePath);
const examples = [
  ["Rancang fitur yang ingin dibuat", "Pecah pekerjaan besar menjadi langkah-langkah sederhana."],
  ["Simpan progres hari ini", "Catat hasil kecil yang sudah berhasil diselesaikan."],
  ["Rapikan dan tinjau kembali", "Sisihkan waktu untuk mengecek apa yang masih perlu dikerjakan."],
];

if (database.prepare('SELECT COUNT(*) AS count FROM "Task"').get().count === 0) {
  const insert = database.prepare('INSERT INTO "Task" ("title", "notes", "updatedAt") VALUES (?, ?, CURRENT_TIMESTAMP)');
  const seed = database.transaction((tasks) => {
    for (const task of tasks) insert.run(...task);
  });
  seed(examples);
}

database.close();
