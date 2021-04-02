/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
// ex) A command plugin to add "text node" to selection
export const plugin_mark_Q = {
  name: 'mark_Q',
  display: 'command',

  title: 'Highlight Arabic Quran Ayah or Hadith',
  buttonClass: '',
  // This icon uses Font Awesome
  innerHTML: '<i class="se se_h">Q</i>',

  add(core, targetElement) {
    const { context } = core
    context.mark_Q = {
      targetButton: targetElement
    }
  },
  active(element) {
    if (!element) {
      this.util.removeClass(this.context.mark_Q.targetButton, 'active')
    } else if (/^mark$/i.test(element.nodeName) && element.style.marginTop.length > 0) {
      this.util.addClass(this.context.mark_Q.targetButton, 'active')
      return true
    }

    return false
  },
  action() {
    if (!this.util.hasClass(this.context.mark_Q.targetButton, 'active')) {
      const newNode = this.util.createElement('MARK')
      newNode.style.marginTop = 'inherit'
      newNode.classList.add('markQ')

      this.nodeChange(newNode, ['color'], null, null)
    } else {
      this.nodeChange(null, ['margin-top', '.markQ'], ['mark'], true)
    }
  }
}
