export function sign(name, role) {
  return [
    { text: ' ' },
    { text: ' ' },
    { text: ' ' },
    {
      text: [
        'ลงชื่อ',
        {
          text: ' '.repeat(60),
          decoration: 'underline',
          decorationStyle: 'dotted'
        },
        `(${role})`
      ],
      alignment: 'center'
    },
    {
      text: `(${name})`,
      alignment: 'center',
      margin: [-15, 0, 0, 0]
    }
  ]
}
