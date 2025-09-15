export default function colorPalettes(idx) {
    const Palettes = [
        '#FF8800',
        '#20D897',
        '#26A5FF',
        '#CB9DF0',
        '#FF90BB',
        '#B17F59'
    ]
    const paletteIdx = idx % Palettes.length
    return Palettes[paletteIdx]
}