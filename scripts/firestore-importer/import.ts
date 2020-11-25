// Imports
import * as firestoreService from './firestore-backup-restore'
import {default as firebaseConfig} from './firestore.config'
import {default as serviceAccount} from './service-account.config';

// JSON To Firestore
(async () => {
  try {
    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');

    await firestoreService.restore('../../server-json-data/builds.json');
    await firestoreService.restore('../../server-json-data/gear.json');
    await firestoreService.restore('../../server-json-data/guides.json');
    await firestoreService.restore('../../server-json-data/heroes.json');
    await firestoreService.restore('../../server-json-data/namedSets.json');
    await firestoreService.restore('../../server-json-data/notes.json');
    await firestoreService.restore('../../server-json-data/perks.json');
    await firestoreService.restore('../../server-json-data/perkUsage.json');
    await firestoreService.restore('../../server-json-data/shortUrls.json');
    await firestoreService.restore('../../server-json-data/skills.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
})()