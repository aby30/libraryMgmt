import openDB from '../configs/database/dao';

const UserRepository = {
    getAll: async () => {
        const db = await openDB();
        const users = await db.all('select * from users');

        return users;
    },

    getUserDetails: async (userId) => {
        const db = await openDB();
        const userGetResult = await db.get('SELECT * FROM Users where userId = ?', [userId]);

        return userGetResult;
    },

    update: async (userDetails) => {
        const { bookId, userId } = userDetails
        const db = await openDB();

        const userUpdateStatement = await db.prepare('UPDATE Users SET bookIds= ? where userId= ? ');
        const userUpdateResult = await userUpdateStatement.run(
            bookId,
            userId,
        );
        userUpdateResult.finalize();
      }
  }

  export default UserRepository;