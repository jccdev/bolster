import {ScanDb} from "./types/scanDb";
import {getDb} from "./db";

export class ScanQueries {
    async select(take = 10, skip = 0): Promise<ScanDb[]> {
        const db = getDb();
        const res = await db.select().from<ScanDb>("scans").offset(skip).limit(take);
        return res;
    }

    async insert(scanValues: Omit<ScanDb, "id">): Promise<ScanDb> {
        const db = getDb();
        const res = await db<ScanDb>("scans").insert(scanValues).returning('id');

        return {
            id: res[0].id,
            ...scanValues
        };
    }
}
