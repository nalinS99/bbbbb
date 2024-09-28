const Book = require('../models/Book'); // Ensure your book model is correctly defined

// Add a new book
const addBook = async (req, res) => {
    try {
        const { bookName, author, description } = req.body;
        const newBook = new Book({ bookName, author, description });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully!', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};

// Update a book by ID
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { bookName, author, description } = req.body;
    
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { bookName, author, description }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully!', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};

module.exports = { addBook, getBooks, updateBook, deleteBook }; // Export deleteBook function
