import { app } from './app';
import { connectDb } from './config/db';
import { env } from './config/env';

async function start(): Promise<void> {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`[server] listening on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  console.error('[server] failed to start', err);
  process.exit(1);
});
