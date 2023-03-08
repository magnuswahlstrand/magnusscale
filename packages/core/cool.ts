import {PSDB} from "planetscale-node";
// connect to main branch
const db = new PSDB("main");


export async function getRows() {
    const [rows] = await db.query("SELECT tally FROM counter WHERE counter = 'hits'", {});
    return rows
}


export async function updateCounter() {
    await db.query("UPDATE counter SET tally = tally + 1 WHERE counter = 'hits'", {});
}
