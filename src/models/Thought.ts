import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
        //Sets the default value to a new ObjectId generated by Mongoose. This ensures that each reaction has a unique identifier.
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString()
        //Calling toLocaleString converts the date to a string value with local d/t.
    }
}, {
    toJSON: {
        //Getters in Mongoose are functions that allow you to transform or format the value of a field when it is retrieved from the database. They are defined in the schema and are applied automatically whenever the field is accessed.
        getters: true,
        //Virtuals are properties that are not stored in the MongoDB database but are computed on the fly when you access them. They are defined in the schema and can be used to add computed properties to documents.
        virtuals: true
        
    },
    id: false
});

const thoughtSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Thought text is required'],
        minlength: [1, 'Thought text must be at least 1 character long'],
        maxlength: [280, 'Thought text must be at most 280 characters long']
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString()
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
}
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

export default Thought;