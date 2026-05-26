import { Elysia } from 'elysia';
import { db } from './db/db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/', () => 'Hello World')
  .get('/users', async () => {
    try {
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (error) {
      return {
        success: false,
        message: 'Could not fetch users. Make sure MySQL is running and migrations are applied.',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
