export function sign(name, role) {
    return [
        { text: " " },
        { text: " " },
        { text: " " },
        {
            text: [
                "ลงชื่อ",
                {
                    text: " ".repeat(60),
                    decoration: "underline",
                    decorationStyle: "dotted",
                },
                `(${role})`,
            ],
            alignment: "center",
        },
        {
            text: `(${name})`,
            alignment: "center",
            margin: [-15, 0, 0, 0],
        },
    ];
}
export function sign43(role) {
    return [
        {
            text: [
                "ลงชื่อ",
                {
                    text: " ".repeat(40),
                    decoration: "underline",
                    decorationStyle: "dotted",
                },
                `${role}`,
            ],
            alignment: "left",
        },
        {
            text: [
                "ตำแหน่ง",
                {
                    text: ` `.repeat(40),
                    decoration: "underline",
                    decorationStyle: "dotted",
                },
            ],
            alignment: "left",
            margin: [0, 0, 0, 0],
        },
        {
            text: [
                "ว.ด.ป.",
                {
                    text: ` `.repeat(40),
                    decoration: "underline",
                    decorationStyle: "dotted",
                },
            ],
            alignment: "left",
            margin: [0, 0, 0, 0],
        },
    ];
}
export function sign432(role) {
    return [
        {
            text: [
                "ลงชื่อ",
                {
                    text: " ".repeat(40),
                    decoration: "underline",
                    decorationStyle: "dotted",
                },
                `${role}`,
            ],
            alignment: "left",
        },
        {
            text: [
                "ว.ด.ป.",
                {
                    text: ` `.repeat(40),
                    decoration: "underline",
                    decorationStyle: "dotted",
                },
            ],
            alignment: "left",
            margin: [0, 0, 0, 0],
        },
    ];
}
export function sign433(name, role) {
    return [
        {
            text: [
                "ลงชื่อ",
                {
                    text: " ".repeat(40),
                    decoration: "underline",
                    decorationStyle: "dotted",
                },
                `${role}`,
            ],
            alignment: "left",
        },
        {
            text: `(${name})`,
            alignment: "left",
            margin: [25, 0, 0, 0],
        },
    ];
}
