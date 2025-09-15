import LdapAuth from "ldapauth-fork";
import { Client } from 'pg'

const config = useRuntimeConfig()

export function connectLDAP() {

    if (config.NUXT_LDAP_URL === '' || config.NUXT_LDAP_DC === '' ) {
        throw new Error('LDAP configuration is missing');
    }

    const Options = {
        url: config.NUXT_LDAP_URL,
        searchBase: config.NUXT_LDAP_DC,
        searchFilter: '(mail={{username}})',
        reconnect: false,
        timeout: 5000,
        connectTimeout: 3000,
    }
    const ldapAuth = new LdapAuth(Options);

    return ldapAuth;
}

export function connectPG() {

    if (config.NUXT_PG_USER === '' || config.NUXT_PG_HOST === '' || config.NUXT_PG_BASE === '' || config.NUXT_PG_PASS === '') {
        throw new Error('PostgreSQL configuration is missing');
    }

    const client = new Client({
        user: config.NUXT_PG_USER,
        host: config.NUXT_PG_HOST,
        database: config.NUXT_PG_BASE,
        password: config.NUXT_PG_PASS,
        port: config.NUXT_NUXT_PG_PORT,
    })

    return client;
}

export default defineEventHandler(async (event) => {
    try {
        const ldapAuth = connectLDAP();
        await ldapAuth.close();
    }
    catch (error) {
        console.error('Error connecting to LDAP:', error);
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
    }

    try {
        const client = connectPG();
        client.connect();
        client.end();
    }
    catch (error) {
        console.error('Error connecting to Database:', error);
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
    }

    return true;
})