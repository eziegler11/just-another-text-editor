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
	// console.error('putDb not implemented');

	const jateDB = await openDB('jate', 1);

	const tx = jateDB.transaction('jate', 'readwrite');

	const store = tx.objectStore('jate');

	const request = store.put({ id: 1, value: content });

	const result = await request;
	console.log('Data put to the database', result);
};

export const getDb = async () => {

	const jateDB = await openDB('jate', 1);

	const tx = jateDB.transaction('jate', 'readonly');

	const store = tx.objectStore('jate');

	//const request = store.getAll();
	const request = store.get(1);

	const result = await request;
	console.log('result.value', result);
	return result.value;
};


initdb();
