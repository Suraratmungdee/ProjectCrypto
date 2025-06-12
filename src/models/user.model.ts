import db from '../connect/db';

interface User {
    username: string;
    email: string;
    password: string;
}

export const User = async (username: string) => {
    const data = await db('user')
        .where('username', username)
        .first();

    return data;
}

export const createUser = async (user: User) => {
    const [created] = await db('user').insert(user);
    return created;
};
