
// schema of the Student, which is to be stored in the mongo database
import mongoose from "mongoose"

// schema of the Student in college
const studSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    score12th: {
        type: Number,
        required: true
    },

    score10th: {
        type: Number,
        required: true
    },

    dept: {
        type: String,
        required: true
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
})

// export the schema after making a model of it
export const Student = mongoose.model('Student', studSchema)