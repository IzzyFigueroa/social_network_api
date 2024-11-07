import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
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
    }
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

const thoughtSchema = new Schema({
    thoughtText: {
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