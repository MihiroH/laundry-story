import firebase, { DocumentDataType } from '../plugins/firebase';

class ChatService {
  db;

  constructor(refName: string) {
    const root = firebase.ref('chat');
    if (refName) {
      this.db = root.child(refName);
    } else {
      this.db = root;
    }
  }

  getAll() {
    return this.db;
  }

  create(data: DocumentDataType) {
    return this.db.push(data);
  }

  update(key: string, data: DocumentDataType) {
    return this.db.child(key).update(data);
  }

  remove(key: string) {
    return this.db.child(key).remove();
  }

  removeAll() {
    return this.db.remove();
  }
}

export default ChatService;
