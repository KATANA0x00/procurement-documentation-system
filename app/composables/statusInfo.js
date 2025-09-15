const defineStatus = {
  All: {
    iconName: 'material-symbols:border-all-outline-rounded',
    color: '-',
    text: 'ทั้งหมด'
  },
  draft: {
    iconName: 'ri:git-pr-draft-line',
    color: '#00AAFF',
    text: 'แบบร่าง'
  },
  waiting: {
    iconName: 'material-symbols:document-search-outline-rounded',
    color: '#00AAFF',
    text: 'รอตรวจสอบ'
  },
  edit: {
    iconName: 'material-symbols:edit-document-outline-rounded',
    color: '#F35205',
    text: 'รอแก้ไข'
  },
  approve: {
    iconName: 'material-symbols:list-alt-check-outline-rounded',
    color: '#5CB338',
    text: 'ตรวจแล้ว'
  },
  signed: {
    iconName: 'material-symbols:shopping-bag-speed-outline-rounded',
    color: '#5CB338',
    text: 'ได้รับเอกสารแล้ว'
  },
  done: {
    iconName: 'material-symbols:editor-choice',
    color: '#5CB338',
    text: 'ตั้งเบิกแล้ว'
  }
}

export function getStatusIcon (status) {
  return defineStatus[status]?.iconName || ''
}

export function getStatusText (status) {
  return defineStatus[status]?.text || ''
}

export function getStatusInfo (status) {
    return defineStatus[status] || {}
}
