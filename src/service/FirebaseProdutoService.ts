
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import db from "../../firebase";
import { Produto } from "@/types/Produto";

const COLLECTION_NAME = "webBase";

export class FirebaseProdutoService {
  static async listar(): Promise<Produto[]> {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Produto[];
  }

  static onChange(callback: (produtos: Produto[]) => void) {
    const q = query(collection(db, COLLECTION_NAME));
    return onSnapshot(q, (querySnapshot) => {
      const produtos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Produto[];
      callback(produtos);
    });
  }

  static async criar(produto: Omit<Produto, "id">) {
    return await addDoc(collection(db, COLLECTION_NAME), produto);
  }

  static async atualizar(id: string, data: Partial<Produto>) {
    const ref = doc(db, COLLECTION_NAME, id);
    return await updateDoc(ref, data);
  }

  static async deletar(id: string) {
    return await deleteDoc(doc(db, COLLECTION_NAME, id));
  }

  static async set(id: string, data: Produto) {
    return await setDoc(doc(db, COLLECTION_NAME, id), data);
  }
}
