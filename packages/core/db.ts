// db.ts
import {drizzle} from 'drizzle-orm/planetscale-serverless';

import {connect} from '@planetscale/database';
import {counters} from './schema';

import {Config} from "sst/node/config";
import {eq} from "drizzle-orm/expressions";
import {sql} from "drizzle-orm/sql";

const connection = connect({
    host: Config.PLANETSCALE_HOST,
    username: Config.PLANETSCALE_USERNAME,
    password: Config.PLANETSCALE_PASSWORD,
});

export const db = drizzle(connection);

export async function getCounter(name: string) {
    const result = await db
        .select()
        .from(counters)
        .where(eq(counters.counter, name));

    if (result.length < 1) {
        throw new Error(`No results found for counter ${name}`)
    }

    return result[0]
}

export async function increaseCounter(name: string) {
    const result = await db
        .update(counters)
        .set({
            tally: sql`tally
            + 1`
        })
        .where(eq(counters.counter, name))
}

