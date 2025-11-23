export default function numBreak(inputNum, shorten = false) {
    const num = Number(inputNum);
    if (isNaN(num)) return "Invalid number";

    if (shorten) {
        if (Math.abs(num) >= 1_000_000) {
            return (num / 1_000_000).toFixed(2) + "m";
        } else if (Math.abs(num) >= 1_000) {
            return (num / 1_000).toFixed(2) + "k";
        } else {
            return num.toString(); // below 1000, normal
        }
    }

    // original formatting with commas
    const fixedNumStr = num.toFixed(2);
    let [integerPart, decimalPart] = fixedNumStr.split(".");
    let result = "";

    while (integerPart.length > 3) {
        result = "," + integerPart.slice(-3) + result;
        integerPart = integerPart.slice(0, -3);
    }

    result = integerPart + result;
    result += "." + decimalPart;

    return result;
}
