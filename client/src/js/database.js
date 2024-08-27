// TODO: Add logic to a method that accepts some content and adds it to the database
// TODO: Add logic for a method that gets all the content from the database

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

// Method to add or update content in the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  
  // Open the database
  const db = await openDB('jate', 1);
  
  // Create a transaction with readwrite access
  const tx = db.transaction('jate', 'readwrite');
  
  // Open the object store
  const store = tx.objectStore('jate');
  
  // Put the content in the store
  const request = store.put({ id: 1, content: content });
  
  // Get confirmation of the request
  const result = await request;
  
  console.log('🚀 - data saved to the database', result);
};

// Method to get all content from the database
export const getDb = async () => {
  console.log('GET from the database');
  
  // Open the database
  const db = await openDB('jate', 1);
  
  // Create a transaction with readonly access
  const tx = db.transaction('jate', 'readonly');
  
  // Open the object store
  const store = tx.objectStore('jate');
  
  // Get all the data in the store
  const request = store.getAll();
  
  // Wait for the request to be fulfilled
  const result = await request;
  
  console.log('result.value', result);
  return result;
};

initdb();
