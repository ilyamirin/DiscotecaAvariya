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

  store(collection: string, value: object) {
    return this.angularFirestore.collection(collection).add(JSON.stringify(value));
  }

  delete(collection: string, key: string) {
    return this.angularFirestore.collection(collection).doc(key).delete();
  }
}
