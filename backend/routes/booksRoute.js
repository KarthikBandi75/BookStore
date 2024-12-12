import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to create a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: 'All fields (title, author, publishYear) are required',
      });
    }

    const newBook = await Book.create({ title, author, publishYear });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to update a book
router.put('/:id', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: 'All fields (title, author, publishYear) are required',
      });
    }

    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
