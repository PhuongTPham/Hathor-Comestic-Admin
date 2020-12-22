const formatNumber = (number) => {
  if (number) {
    const stringToSplit = number.toString()
    let returnResult
    if (stringToSplit.indexOf('.') > -1) {
      const splited = stringToSplit.split('.')
      returnResult = [splited[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'), splited[1]]
    } else {
      returnResult = stringToSplit.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').split('.')
    }

    if (returnResult[1]) {
      return returnResult.join('.')
    }
    return returnResult[0] !== '' ? returnResult[0] : 0
  } 
  return 0
}

export default { formatNumber }
