class CuCollapse extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    const beforeTemplate = document.querySelector('#cu-collapse')
    const copyTemplate = beforeTemplate.content.cloneNode(true)

    const style = document.createElement('style')
    style.textContent = `
      ul {
        margin: 0;
        padding: 0;
      }

      h2 {
        width: 100%;
        border-bottom: 1px solid #ccc;
      }

      :host .cu-collapse {
        padding: 10px 20px;
        margin: 0 auto;
        width: 800px;
        height: auto;
        border: 1px solid #ccc;
        border-radius: 10px;
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(copyTemplate)

    shadow.querySelector('slot').addEventListener('slotchange', (e) => {
      this.slotList = e.target.assignedElements()
      this.render()
    })
  }

  // 生命周期钩子
  connectedCallback() {
    console.log(`cu-collapse mounted`)
  }

  disconnectedCallback() {
    console.log(`cu-collapse onMounted`)
  }

  // 监听属性变化
  static get observedAttributes() {
    return ['active']
  }

  // 属性变化钩子函数
  attributeChangedCallback(key, oldVal, newVal) {
    if (key === 'active') {
      this.activeList = JSON.parse(newVal)
      this.render()
    }
  }

  render() {
    if (this.activeList && this.slotList) {
      ;[...this.slotList].forEach((child) => {
        child.setAttribute('active', JSON.stringify(this.activeList))
      })
    }
  }
}

export default CuCollapse
