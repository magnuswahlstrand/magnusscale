import {int, mysqlTable, varchar, text} from "drizzle-orm/mysql-core";

export const counters = mysqlTable('counter',
    {
        counter: varchar('counter', {length: 255}).primaryKey(),
        tally: int('tally').notNull(),
    }
);