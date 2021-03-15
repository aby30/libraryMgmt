import openDB from '../configs/database/dao';

const BookRepository = {
    getAll: async () => {
        const db = await openDB();
        const books = await db.all('select * from books');
        return books;
    },

    update: async (book) => {
        const { bookId, availableQty } = book
        const db = await openDB();

        const statement = await db.prepare('UPDATE books SET availableQty= ? where bookId= ? ');
        const result = await statement.run(
            availableQty,
            bookId,
        )
        result.finalize();
      }
  }

  export default BookRepository;