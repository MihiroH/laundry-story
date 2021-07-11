import firebase from '../plugins/firebase';

class ChatService {
  constructor(refName) {
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

  create(data) {
    return this.db.push(data);
  }

  update(key, data) {
    return this.db.child(key).update(data);
  }

  remove(key) {
    return this.db.child(key).remove();
  }

  removeAll() {
    return this.db.remove();
  }
}

export default ChatService;
