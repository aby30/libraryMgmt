import sqlite from 'sqlite';

export default async () => {
    return await sqlite.open('./library.sqlite');
}