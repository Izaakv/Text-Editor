import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  tx.objectStore('jate').add(content);
  await tx.done;
}

export const getDb = async (e) => {
	const jateDb = await openDB('jate', 1);
	const tx = jateDb.transaction('jate', 'readonly');
	const store = tx.objectStore('jate');
	const request = store.get(1);
	const result = await request;
	return result?.value;
}

initdb();
