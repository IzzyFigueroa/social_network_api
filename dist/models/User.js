import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema, model } = mongoose;
const { hash, compare } = bcrypt;
const notesSchema = new Schema({
    text: {
        type: String,
        minLength: [3, 'Youre note text mus be at least 3 characters in length']
    }
});
const userSchema = new Schema({
    email: {
        type: String,
        // The unique rule only works whne the collection is first created
        // YOu cannot create a custom error message with the array witht the syntax on the unique rule
        unique: true,
        // Ensure the value is a valid email string
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        //Ensure the string is at least 6 chars long
        minlength: [6, 'Your password must be at least 6 characters in length']
    },
    //The notes property is going to be an array of note docs and the noteSchema describes what that note document looks like
    notes: [notesSchema] //This is called a sub document
}, {
    toJSON: {
        transform(_, user) {
            delete user.password;
            delete user.__v;
            return user;
        }
    }
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isNew) {
        user.password = await hash(user.password, 10);
    }
    next();
});
userSchema.methods.validatePassword = async function (formPassword) {
    return await compare(formPassword, this.password);
};
const User = model('User', userSchema);
export default User;
