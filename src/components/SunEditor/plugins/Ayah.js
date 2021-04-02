/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
// ex) A command plugin to add "text node" to selection
export const plugin_ayah = {
  name: 'customCommand_ayah',
  display: 'command',

  title: 'آية',
  buttonClass: '',
  // This icon uses Font Awesome
  innerHTML: '<span class="se se_a">۝</span>',

  add(core, targetElement) {
    const { context } = core
    context.customCommand_ayah = {
      targetButton: targetElement
    }
  },
  // active(element) {
  //   if (!element) {
  //     this.util.removeClass(this.context.customCommand_ayah.targetButton, 'active')
  //   } else if (/^mark$/i.test(element.nodeName) && element.style.backgroundColor.length > 0) {
  //     this.util.addClass(this.context.customCommand_ayah.targetButton, 'active')
  //     return true
  //   }

  //   return false
  // },
  action() {
    this.functions.insertHTML('<span class="se-ayah"> ۝ </span>', true)
  }
}
