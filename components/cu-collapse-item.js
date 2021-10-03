class CuCollapseItem extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    const beforeTemplate = document.querySelector('#cu-collapse-item')
    const copyTemplate = beforeTemplate.content.cloneNode(true)
    this.isShow = true

    const style = document.createElement('style')
    style.textContent = `
      :host div {
        color: black;
      }

      .detail {
        border-bottom: 1px dashed #ccc;
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(copyTemplate)

    this.titleEle = shadow.querySelector('.title')
    this.titleEle.addEventListener('click', () => {
      document.querySelector('cu-collapse').dispatchEvent(
        new CustomEvent('changeName', {
          detail: {
            name: +this.getAttribute('name'),
            isShow: this.isShow
          }
        })
      )
    })
  }

  static get observedAttributes() {
    return ['active', 'title', 'name']
  }

  attributeChangedCallback(key, oldVal, newVal) {
    const chooseObj = {
      active() {
        this.activeList = JSON.parse(newVal)
      },
      title() {
        this.titleEle.innerHTML = newVal
      },
      name() {
        this.name = newVal
      }
    }

    chooseObj[key] && chooseObj[key].call(this)

    if (this.activeList && this.name) {
      this.isShow = this.activeList.includes(+this.name)
      this.shadowRoot.querySelector('.content').style.display = this.isShow ? 'block' : 'none'
    }
  }

  // 生命钩子函数
  connectedCallback() {
    console.log(`cu-collapse-item mounted`)
  }

  disconnectedCallback() {
    console.log(`cu-collapse-item onMounted`)
  }
}

export default CuCollapseItem
