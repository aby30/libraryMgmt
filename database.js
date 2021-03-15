const sqlite = require('sqlite');

async function setup() {
    const db = await sqlite.open('./library.sqlite');
    await db.migrate({force: 'last'});

    const books = await db.all('SELECT * FROM Books');
    console.log('All Books', JSON.stringify(books, null, 2));

    const users = await db.all('SELECT * FROM Users');
    console.log('All Users', JSON.stringify(users, null, 2));
}

setup();