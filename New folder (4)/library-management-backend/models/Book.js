const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
