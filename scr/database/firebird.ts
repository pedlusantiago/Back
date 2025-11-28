import Firebird from "node-firebird";
import dotenv from "dotenv";

dotenv.config();

const options: Firebird.Options = {
    host: process.env.FIREBIRD_HOST || "",
    database: process.env.FIREBIRD_DATABASE || "",
    user: process.env.FIREBIRD_USER || "",
    password: process.env.FIREBIRD_PASSWORD || "",
    lowercase_keys: false,
    role: "",
    pageSize: 4096
};

export function queryFirebird(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
        Firebird.attach(options, (err: any, db: any) => {
            if (err) return reject(err);

            db.query(sql, params, (err: any, result: any[]) => {
                db.detach();
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
}
