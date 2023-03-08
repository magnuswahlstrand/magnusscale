// db.ts
import {drizzle} from 'drizzle-orm/planetscale-serverless';

import {connect} from '@planetscale/database';
import {counters} from './schema';

import {Config} from "sst/node/config";
import {eq} from "drizzle-orm/expressions";
import {sql} from "drizzle-orm/sql";

// create the connection
const connection = connect({
    host: Config.PLANETSCALE_HOST,
    username: Config.PLANETSCALE_USERNAME,
    password: Config.PLANETSCALE_PASSWORD,
});

export const db = drizzle(connection);

export async function getCountersV2() {
    return db.select().from(counters);
}


export async function updateCounter() {
    await db.update(counters).set({tally: sql`tally + 1`}).where(eq(counters.counter, 'hits'))

    // await db.query("UPDATE counter SET tally = tally + 1 WHERE counter = 'hits'", {});
}

