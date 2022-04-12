const UserSchema = new mongoose.Schema({
    user_id: Integer,
    access: Integer,
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    assets: Array,
    lessonProgress: Array,
  });