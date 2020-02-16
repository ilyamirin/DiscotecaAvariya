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

  store(collection: string, id: string, value: any) {
    this.angularFirestore.collection(collection).doc(id).set(JSON.parse(JSON.stringify(value)));
  }

  update(collection: string, key: string, value: object) {
    return this.angularFirestore.collection(collection).doc(key).update(JSON.parse(JSON.stringify(value)));
  }

  delete(collection: string, key: string) {
    return this.angularFirestore.collection(collection).doc(key).delete();
  }
}
