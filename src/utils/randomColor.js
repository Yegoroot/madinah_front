// eslint-disable-next-line import/prefer-default-export
export function randomColor(alpha) {
  return (
    // eslint-disable-next-line no-bitwise
    `rgba(${[~~(Math.random() * 255), ~~(Math.random() * 255), ~~(Math.random() * 255), alpha || 1]
    })`
  )
}
