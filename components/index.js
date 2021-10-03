import CuCollapse from './cu-collapse.js'
import CuCollapseItem from './cu-collapse-item.js'

customElements.define('cu-collapse', CuCollapse)
customElements.define('cu-collapse-item', CuCollapseItem)

const defaultActives = [1, 2]
document.querySelector('cu-collapse').setAttribute('active', JSON.stringify(defaultActives))

document.querySelector('cu-collapse').addEventListener('changeName', (e) => {
  const { isShow, name } = e.detail
  if (isShow) {
    const localIndex = defaultActives.indexOf(name)
    defaultActives.splice(localIndex, 1)
  } else {
    defaultActives.push(name)
  }

  document.querySelector('cu-collapse').setAttribute('active', JSON.stringify(defaultActives))
})
