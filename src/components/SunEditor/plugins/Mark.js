/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
// ex) A command plugin to add "text node" to selection
export const plugin_mark = {
  name: 'customCommand_mark',
  display: 'command',

  title: 'Text node change',
  buttonClass: '',
  // This icon uses Font Awesome
  innerHTML: '<i class="se se_h">H</i>',

  add(core, targetElement) {
    const { context } = core
    context.customCommand_mark = {
      targetButton: targetElement
    }
  },
  active(element) {
    if (!element) {
      this.util.removeClass(this.context.customCommand_mark.targetButton, 'active')
    } else if (/^mark$/i.test(element.nodeName) && element.style.backgroundColor.length > 0) {
      this.util.addClass(this.context.customCommand_mark.targetButton, 'active')
      return true
    }

    return false
  },
  action() {
    if (!this.util.hasClass(this.context.customCommand_mark.targetButton, 'active')) {
      const newNode = this.util.createElement('MARK')
      newNode.style.backgroundColor = 'inherit'
      this.nodeChange(newNode, ['background-color'], null, null)
    } else {
      this.nodeChange(null, ['background-color'], ['mark'], true)
    }
  }
}
