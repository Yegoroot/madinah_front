/* eslint-disable max-len */
export const arrHarfCodes = [
  1614, // fatha
  1615, // damma
  1616, // kasra
  1618 // sukkun
]

export const arrCharCodes = [
  1570, // alif vasla
  1571, // alif c хамзой
  1575, // alif без хамзы
  1583, // dal
  1584, // zal
  1585, // ra
  1586, // zay
  1608 // waw
]

export const zmj = '\u{200d}' // Zero Width Joiner U+200D &#8205; &zwj;

/** prefix
 * __________________________________________________
 */
export const prefixZmj = (prefix) => {
  if (prefix) {
    let lastChar // последний символ (без огласовки)
    const lastSym = prefix.charCodeAt(prefix.length - 1) // lastSym мы не знаем огласовка это или буква

    // если последний сивол огласовка то буква должна быть предпоследней
    if (arrHarfCodes.includes(lastSym)) {
      lastChar = prefix.charCodeAt(prefix.length - 2) // before last sym
    } else {
      lastChar = lastSym
    }

    // если символ не "соединительный" то не соединяем иначе соединяем символом пустой ширины
    return arrCharCodes.includes(lastChar) ? '' : zmj
  }
  return ''
}

/** suffix
 * __________________________________________________
 */
export const suffixZmj = (root, suffix) => {
  if (suffix) {
    let lastChar
    const lastSym = root.charCodeAt(root.length - 1) // last sym

    // если последний сивол огласовка то буква должна быть предпоследней
    if (arrHarfCodes.includes(lastSym)) {
      lastChar = root.charCodeAt(root.length - 2) // before last sym
    } else {
      lastChar = lastSym
    }

    // глаголах с шаддой чтоб дотянуться до последней буквы нужно минус три (-1 символ огласока, -2 шадда, -3 сама буква)
    if (lastChar === 1617) {
      lastChar = root.charCodeAt(root.length - 3)
    }
    return arrCharCodes.includes(lastChar) ? '' : zmj
  }
  return ''
}
