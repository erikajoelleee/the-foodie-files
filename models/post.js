const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    category: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    ingredients: {
        type: String,
        required: true,
    },

    instructions: {
        type: String,
        required: true,
    },

    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'PostTag',
    }],

    thoughts: {
        type: String,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;