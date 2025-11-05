import {connectPG} from "../connection";

export default defineEventHandler(async (event) => {
    
    const client = connectPG()
    await client.connect()

    const {rows} = await client.query(`
        SELECT id AS department_id, name AS department_name
        FROM departments
        ORDER BY id ASC
    `)
    client.end()
    return rows;
});
