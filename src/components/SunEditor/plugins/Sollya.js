/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
// ex) A command plugin to add "text node" to selection
export const plugin_sollya = {
  name: 'customCommand_sollya',
  display: 'command',

  title: 'صلى الله عليه وسلم',
  buttonClass: '',
  // This icon uses Font Awesome
  innerHTML: '<span class="se se_a">ﷺ</span>',

  add(core, targetElement) {
    const { context } = core
    context.customCommand_sollya = {
      targetButton: targetElement
    }
  },
  // active(element) {
  //   if (!element) {
  //     this.util.removeClass(this.context.customCommand_sollya.targetButton, 'active')
  //   } else if (/^mark$/i.test(element.nodeName) && element.style.backgroundColor.length > 0) {
  //     this.util.addClass(this.context.customCommand_sollya.targetButton, 'active')
  //     return true
  //   }

  //   return false
  // },
  action() {
    this.functions.insertHTML('<span class="se-sollya"> ﷺ </span>', true)
  }
}
