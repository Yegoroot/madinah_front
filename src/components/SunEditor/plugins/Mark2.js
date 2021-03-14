/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
// ex) A command plugin to add "text node" to selection
export const plugin_color_mark = {
  name: 'colorText',
  display: 'command',

  title: 'Text node change',
  buttonClass: '',
  // This icon uses Font Awesome
  innerHTML: '<i class="se se_h">H-</i>',

  add(core, targetElement) {
    const { context } = core
    context.colorText = {
      targetButton: targetElement
    }
  },
  active(element) {
    if (!element) {
      this.util.removeClass(this.context.colorText.targetButton, 'active')
    } else if (/^mark$/i.test(element.nodeName) && element.style.color.length > 0) {
      this.util.addClass(this.context.colorText.targetButton, 'active')
      return true
    }

    return false
  },
  action() {
    if (!this.util.hasClass(this.context.colorText.targetButton, 'active')) {
      const newNode = this.util.createElement('MARK')
      newNode.style.color = 'inherit'
      newNode.classList.add('mark2')

      this.nodeChange(newNode, ['color'], null, null)
    } else {
      this.nodeChange(null, ['color', '.mark2'], ['mark'], true)
    }
  }
}
