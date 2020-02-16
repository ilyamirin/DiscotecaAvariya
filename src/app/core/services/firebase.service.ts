import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFirestore: AngularFirestore
  ) {
  }

  get(collection: string) {
    return this.angularFirestore.collection(collection).valueChanges();
  }

  getById(collection: string, id: string) {
    return this.angularFirestore.collection(collection).doc(id).valueChanges();
  }

  store(collection: string, value: any, id?: string) {
    /*new Promise<T>((resolve, reject) => {
      if (id) {
        // If there is an ID Provided, lets specifically set the Document
        this.collection
          .doc(id)
          .set(firebaseSerialize(entity))
          .then(ref => {
            resolve(entity);
          });
      } else {
        // If no ID is set, allow Firestore to Auto-Generate one
        this.collection.add(firebaseSerialize(entity)).then(ref => {
          // Let's make sure we return the newly added ID with Model
          const newentity = {
            id: ref.id,
            ...entity,
          };
          resolve(newentity);
        });
      }
    });*/
    if (id) {
      this.angularFirestore.collection(collection)
        .doc(id)
        .set(JSON.parse(JSON.stringify(value)));
    } else {
      return this.angularFirestore.collection(collection).add(JSON.parse(JSON.stringify(value)));
    }
  }

  update(collection: string, key: string, value: object) {
    return this.angularFirestore.collection(collection).doc(key).update(JSON.parse(JSON.stringify(value)));
  }

  delete(collection: string, key: string) {
    return this.angularFirestore.collection(collection).doc(key).delete();
  }
}
