import Firebird from "node-firebird";

export default function firebird() {
    return new Promise<any>((resolve, reject) => {
        const options = {
            host: process.env.FIREBIRD_HOST || "localhost",
            database: process.env.FIREBIRD_DATABASE || "",
            user: process.env.FIREBIRD_USER || "",
            password: process.env.FIREBIRD_PASSWORD || "",
            lowercase_keys: false,
            pageSize: 4096,
        };

        Firebird.attach(options, function (err, db) {
            if (err) return reject(err);

            resolve({
                query: (sql: string, params: any[] = []) =>
                    new Promise((resolveQuery, rejectQuery) => {
                        db.query(sql, params, (err: any, result: unknown) => {
                            if (err) rejectQuery(err);
                            else resolveQuery(result);
                        });
                    }),
                detach: () => db.detach(),
            });
        });
    });
}
