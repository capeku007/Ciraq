// plugins/indexedDB.js

const DB_NAME = 'ChatDatabase';
const DB_VERSION = 1;
const MESSAGES_STORE_NAME = 'messages';
const PEOPLE_STORE_NAME = 'people';

let db;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => reject("IndexedDB error: " + event.target.error);

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore(MESSAGES_STORE_NAME, { keyPath: 'id' });
      db.createObjectStore(PEOPLE_STORE_NAME, { keyPath: 'user_id' });
    };
  });
};

const addMessage = (message) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([MESSAGES_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(MESSAGES_STORE_NAME);
    const request = store.put(message);

    request.onerror = (event) => reject("Error adding message: " + event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
  });
};

const getMessages = (friendshipId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([MESSAGES_STORE_NAME], 'readonly');
    const store = transaction.objectStore(MESSAGES_STORE_NAME);
    const request = store.getAll();

    request.onerror = (event) => reject("Error fetching messages: " + event.target.error);
    request.onsuccess = (event) => {
      const allMessages = event.target.result;
      const filteredMessages = allMessages.filter(msg => msg.friendshipId === friendshipId);
      resolve(filteredMessages);
    };
  });
};

const addPerson = (person) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([PEOPLE_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(PEOPLE_STORE_NAME);
    const request = store.put(person);

    request.onerror = (event) => reject("Error adding person: " + event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
  });
};

const getPeople = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([PEOPLE_STORE_NAME], 'readonly');
    const store = transaction.objectStore(PEOPLE_STORE_NAME);
    const request = store.getAll();

    request.onerror = (event) => reject("Error fetching people: " + event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
  });
};
const clearDatabase = () => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction([MESSAGES_STORE_NAME, PEOPLE_STORE_NAME], 'readwrite');
    const messagesStore = transaction.objectStore(MESSAGES_STORE_NAME);
    const peopleStore = transaction.objectStore(PEOPLE_STORE_NAME);

    const clearMessages = messagesStore.clear();
    const clearPeople = peopleStore.clear();

    clearMessages.onerror = (event) => reject("Error clearing messages: " + event.target.error);
    clearPeople.onerror = (event) => reject("Error clearing people: " + event.target.error);

    transaction.oncomplete = () => resolve("Database cleared successfully");
  });
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      indexedDB: {
        initDB,
        addMessage,
        getMessages,
        addPerson,
        getPeople,
        clearDatabase 
      }
    }
  }
});