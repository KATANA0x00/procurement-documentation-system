import { connectPG } from "../connection";

export default defineEventHandler(async (event) => {
    const client = connectPG();
    await client.connect();

    const numDoc = await client.query(`
        SELECT status, COUNT(*) AS total
        FROM documents
        WHERE status <> 'draft'
        GROUP BY status
        ORDER BY status;
    `);

    const moneyMax = await client.query(`
        SELECT 
        dpt.name,
        SUM(doc.expenses_summary) AS total_expenses
        FROM documents doc
        LEFT JOIN departments dpt ON dpt.id = doc.department
        GROUP BY dpt.id, dpt.name
        ORDER BY total_expenses DESC
        LIMIT 1;
    `);

    const tableData = await client.query(`
    WITH doc_times AS (
        SELECT
            l.doc_id,
            d.department AS department_id,
            MIN(l.action_date) AS start_time,
            MAX(l.action_date) AS end_time,
            EXTRACT(EPOCH FROM (MAX(l.action_date) - MIN(l.action_date))) AS process_seconds
        FROM logs l
        JOIN documents d ON l.doc_id = d.id
        GROUP BY l.doc_id, d.department
    )
    SELECT
        dep.name AS department_name,
        MIN(process_seconds) * INTERVAL '1 second' AS min_interval,
        MAX(process_seconds) * INTERVAL '1 second' AS max_interval,
        AVG(process_seconds) * INTERVAL '1 second' AS avg_interval
    FROM doc_times dt
    LEFT JOIN departments dep ON dep.id = dt.department_id
    WHERE dep.name IS NOT NULL AND dep.id <> 36
    GROUP BY dep.name
    ORDER BY dep.name;
    `);

    client.end();
    return {
        ok: true,
        summaryData: {
            numDoc: numDoc.rows,
            moneyMax: moneyMax.rows[0],
        },
        tableData: tableData.rows,
    };
});
