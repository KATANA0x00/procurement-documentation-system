export default function readCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text
        .split("\n")
        .map((row) =>
          row.split(",").map((cell) => cell.replace(/\r/g, "").trim())
        )
        .filter((row) => row.some((cell) => cell !== "")); // remove empty rows

      rows.shift(); // remove header row

      // map rows into objects
      const data = rows.map((row) => ({
        qty: Number(row[2]) || 0,       // จำนวน
        name: row[1] || "",             // รายการ
        unit: row[3] || "",             // หน่วย
        price: Number(row[4]) || 0,     // ราคา/หน่วย
        total: Number(row[5]) || 0      // ราคารวม
      }));

      resolve(data);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function downloadTemplate() {
  // Define the CSV headers
  const headers = [
    "ลำดับ",
    "รายการ",
    "จำนวน",
    "หน่วย",
    "ราคา/หน่วย",
    "ราคารวม",
  ];

  const exampleRow = [
    "1",
    "ลบบรรทัดนี้ก่อนใช้งาน",
    "10",
    "ชิ้น",
    "100",
    "1000",
  ];
  const rows = [headers, exampleRow];
  const csvContent = rows.map((row) => row.join(",")).join("\r\n");
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "template.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}