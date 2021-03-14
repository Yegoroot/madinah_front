/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
// ex) A command plugin to add "text node" to selection
export const plugin_bism = {
  name: 'customCommand_bism',
  display: 'command',
  innerHTML: '<span class="se se_bs">بســم</span>',
  add(core, targetElement) {
    const { context } = core
    context.customCommand_bism = {
      targetButton: targetElement
    }
  },
  action() {
    this.functions.insertHTML('<span class="se-bism">  ﷽ </span>', true)
  }
}
