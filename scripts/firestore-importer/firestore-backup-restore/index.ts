import * as admin from 'firebase-admin'
import * as restoreService from './import'
import { IImportOptions } from './helper'
import { FirebaseServiceAccount } from './types'

export * from './types'

/**
 * Initialize Firebase App
 *
 * @param {any} serviceAccount
 * @param {any} databaseURL
 * @param {string} name
 */
export const initializeApp = (
  serviceAccount: FirebaseServiceAccount,
  databaseURL: string,
  name = '[DEFAULT]'
) => {
  if (
    admin.apps.length === 0 ||
    (admin.apps.length > 0 && admin.app().name !== name)
  ) {
    admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount as unknown as string),
        databaseURL: databaseURL,
      },
      name
    )
    admin.firestore().settings({ timestampsInSnapshots: true })
  }
  return true
}

export { admin }

/**
 * Restore data to firestore
 * @param fileName
 * @param options
 */
export const restore = (fileName: string, options: IImportOptions = {}) => {
  return restoreService.restore(fileName, options)
}
