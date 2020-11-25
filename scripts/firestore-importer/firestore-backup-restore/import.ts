import * as fs from 'fs'
import { v1 as uuidv1 } from 'uuid'
import * as admin from 'firebase-admin'
import { IImportOptions } from './helper'
import { Dictionary } from '@ngrx/entity'


/**
 * Restore data to firestore
 *
 * @param {string} fileName
 * @param {IImportOptions} options
 */
export const restore = (
  fileName: string,
  options: IImportOptions
): Promise<any> => {
  const db: FirebaseFirestore.Firestore = admin.firestore()

  return new Promise((resolve, reject) => {
    if (typeof fileName === 'object') {
      let dataObj = fileName

      updateCollection(db, dataObj, options)
        .then(() => {
          resolve({
            status: true,
            message: 'Collection successfully imported!',
          })
        })
        .catch(error => {
          reject({ status: false, message: error.message })
        })
    } else {
      fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
          console.log(err)
          reject({ status: false, message: err.message })
        }

        // Turn string from file to an Array
        let dataObj = JSON.parse(data)

        updateCollection(db, dataObj, options)
          .then(() => {
            resolve({
              status: true,
              message: 'Collection successfully imported!',
            })
          })
          .catch(error => {
            reject({ status: false, message: error.message })
          })
      })
    }
  }).catch(error => console.error(error))
}

/**
 * Update data to firestore
 *
 * @param {any} db
 * @param {object} dataObj
 * @param {IImportOptions} options
 */
const updateCollection = async (
  db: FirebaseFirestore.Firestore,
  dataObj: Dictionary<Dictionary<object|string[]|{id:string}>>,
  options: IImportOptions = {}
) => {
  for (var index in dataObj) {
    var collectionName = index
    for (var doc in dataObj[index]) {
      if (dataObj[index].hasOwnProperty(doc)) {
        // assign document id for array type
        let docId = doc;
        if(Array.isArray(dataObj[index])) {
          docId = uuidv1()
          if((dataObj[index][doc] as {id:string})['id']) {
            docId = (dataObj[index][doc] as {id:string})['id'] as unknown as string
          }
        }
        if (!Array.isArray(dataObj[index])) {
          await startUpdating(
            db,
            collectionName,
            docId,
            dataObj[index][doc],
            options
          )
        } else {
          await startUpdating(
            db,
            collectionName,
            docId,
            dataObj[index][doc],
            options
          )
        }
      }
    }
  }
}

/**
 * Write data to database
 * @param db
 * @param collectionName
 * @param docId
 * @param data
 * @param options
 */
const startUpdating = (
  db: FirebaseFirestore.Firestore,
  collectionName: string,
  docId: string,
  data: object,
  options: IImportOptions
) => {

  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc(docId)
      .set(data)
      .then(() => {
        console.log(`${docId} was successfully added to firestore!`)
        resolve({
          status: true,
          message: `${docId} was successfully added to firestore!`,
        })
      })
      .catch(error => {
        console.log(error)
        reject({
          status: false,
          message: error.message,
        })
      })
  })
}
