import * as admin from 'firebase-admin';
import { initialize } from 'fireorm';
import { serviceAccount } from './service-account';


export const providers = [
    {
        provide: 'FIRESTORE',
        useFactory: async (): Promise<FirebaseFirestore.Firestore> => {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
            });
            const firestore = admin.firestore();
            initialize(firestore);
            return firestore
        }
    },
];