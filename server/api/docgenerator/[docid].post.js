import PdfPrinter from "pdfmake";
import path from "path";
import fs from "fs";
import PDFMerger from "pdf-merger-js";
import PDFDocument from "pdfkit";
import os from "os";
import { v4 as uuidv4 } from "uuid";

import { docDefinition_P01 } from "./template/P01";
import { docDefinition_PJ1 } from "./template/PJ1";
import { docDefinition_P43 } from "./template/P43";

import { docDefinition_PM1 } from "./template/PM1";
import { docDefinition_PM2 } from "./template/PM2";

import { connectPG } from "../connection";

const fonts = {
    Sarabun: {
        normal: path.join(process.cwd(), "public/fonts/light.ttf"),
        bold: path.join(process.cwd(), "public/fonts/semibold.ttf"),
        italics: path.join(process.cwd(), "public/fonts/italic.ttf"),
        bolditalics: path.join(process.cwd(), "public/fonts/bolditalic.ttf"),
    },
};

const printer = new PdfPrinter(fonts);

async function buildDoc(key, data) {
    const Definition = {
        P01: docDefinition_P01,
        PJ1: docDefinition_PJ1,
        P43: docDefinition_P43,
        PM1: docDefinition_PM1,
        PM2: docDefinition_PM2,
    };
    if (!Definition[key]) return null;

    const docBase = {
        defaultStyle: { font: "Sarabun", fontSize: 10, lineHeight: 1.2 },
        content: [...Definition[key](data)],
        header: (currentPage, pageCount, pageSize) => {
            if (currentPage === 1) return null;
            return {
                text: `- ${currentPage} -`,
                alignment: "center",
                margin: [0, 20, 0, 0],
            };
        },
    };

    const pdfDoc = printer.createPdfKitDocument(docBase);
    const chunks = [];

    pdfDoc.on("data", (chunk) => chunks.push(chunk));

    return new Promise((resolve) => {
        pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
        pdfDoc.end();
    });
}

async function convertImageToPDF(imagePath) {
    const tempPath = path.join(os.tmpdir(), `${uuidv4()}.pdf`);
    return new Promise((resolve) => {
        const doc = new PDFDocument({ autoFirstPage: false });
        const stream = fs.createWriteStream(tempPath);
        doc.pipe(stream);

        const image = doc.openImage(imagePath);
        doc.addPage({ size: [image.width, image.height] });
        doc.image(imagePath, 0, 0);
        doc.end();

        stream.on("finish", () => resolve(tempPath));
    });
}

export default defineEventHandler(async (event) => {
    let { docNeed } = await readBody(event);
    const { docid } = await event.context.params;

    const client = connectPG();
    client.connect();
    const result = await client.query(
        `
    SELECT
        dc.doc_id_p01,
        dc.doc_id_pj1,
        dc.doc_type,
        dc.doc_category,
        dc.doc_money_source,
        dc.doc_money_year,
        dc.doc_requester,
        dp.principal AS principal,
        u.name AS procurementer,
        dp.name AS department,
        dp.uid AS uid_department,
        dc.doc_reason,
        dc.doc_committee,
        dc.uid_fund,
        dc.uid_plan,
        dc.uid_work_main,
        dc.uid_work_sub,
        dc.uid_work_minor,
        dc.uid_expenses_category,
        dc.uid_expenses_type,
        dc.uid_expenses_subtype,
        dc.uid_expenses_minor,
        dc.doc_list,
        dc.expenses_summary,
        dc.doc_file,
        dc.is_vat_included,
        pm.type AS pm_type,
        pm.list AS pm_list,
        TO_CHAR(doc_date_p01, 'YYYY-MM-DD') AS doc_date_p01,
        TO_CHAR(doc_date_pj1, 'YYYY-MM-DD') AS doc_date_pj1
    FROM documents dc
    LEFT JOIN departments dp ON dc.department = dp.id
    LEFT JOIN paymentation pm ON dc.id = pm.doc_id
    LEFT JOIN users u ON dp.procurementer = u.id
    WHERE dc.id = $1
    `,
        [docid]
    );
    client.end();

    if (docNeed.includes("PM")) {
        const pmType = result.rows[0]?.pm_type;
        if (pmType === "personal") {
            docNeed = docNeed.map((d) => (d === "PM" ? "PM1" : d));
        } else if (pmType === "commercial") {
            docNeed = docNeed.map((d) => (d === "PM" ? "PM2" : d));
        }
    }

    const merger = new PDFMerger();

    for (const docKey of docNeed) {
        const buffer = await buildDoc(docKey, result.rows[0]);
        if (buffer) {
            await merger.add(buffer);
        }
    }

    if (docNeed.includes("AFI")) {
        const localFiles = result.rows[0].doc_file.map((item) =>
            path.join(process.cwd(), "uploads", docid, item.file)
        );

        for (const filePath of localFiles) {
            if (!fs.existsSync(filePath)) continue;

            const ext = path.extname(filePath).toLowerCase();
            if (ext === ".pdf") {
                await merger.add(filePath);
            } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
                const pdfPath = await convertImageToPDF(filePath);
                await merger.add(pdfPath);
                fs.unlinkSync(pdfPath); // optional cleanup
            } else {
                console.warn("Unsupported file type, skipping:", filePath);
            }
        }
    }

    const mergedPdfBuffer = await merger.saveAsBuffer();

    setHeader(event, "Content-Type", "application/pdf");
    setHeader(event, "Content-Disposition", "attachment; filename=report.pdf");

    return mergedPdfBuffer;
});
