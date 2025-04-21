require("dotenv").config();
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for API
const books = [
  { id: 1, title: "1984", author: "George Orwell", genre: "Dystopian" },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  setTimeout(() => {
    const { genre } = req.query;
    //TODO: ADD CODE HERE ⬇️ to Filter books by genre.
    try {
      if(genre) {
        const filteredBooks = books.filter((book) => book.genre.includes(genre));
        res.send(filteredBooks);
      } else {
        res.send(books);
      }
    } catch(err) {
      next(err);
    }
    // const filteredBooks = books.filter((book) => book.genre.includes(genre));
    //TODO: ADD CODE HERE ⬇️
  }, 1000); // Simulate a 1-second delay
});

// GET specific book by ID with async/await
app.get("/books/:id", async (req, res, next) => {
  try {
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundBook = books.find((b) => b.id === parseInt(req.params.id, 10));
        if (foundBook) {
          resolve(foundBook);
        } else {
          //TODO: ADD CODE to reject the promise
          reject(new Error("Book not found"));
        }
      }, 1000); // Simulate a 1-second delay
    });
    //TODO: ADD CODE HERE ⬇️
    res.json(book);
  }
  //TODO: ADD CODE HERE
  catch(err) {
    err.status = 400;
    next(err);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
})

//TODO: ADD CODE HERE ⬇️
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const response = {
      message: err.message || "Internal server error",
      status: status,
  }

  if(process.env.NODE_ENV === "development") {
      response.stack = err.stack;
  }

  console.error(err.stack);
  res.status(status).json(response);

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
