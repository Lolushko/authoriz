export default class UserDTO {
  email;
  id;
  isActivated;
  username;
  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
    this.username = model.username
  }
}

