/* eslint-disable camelcase */
// ex) A command plugin to add "text node" to selection
export const plugin_surah_l = {
  name: 'customCommand_surah_l',
  display: 'command',
  title: 'نهاية السورة',
  innerHTML: '<span class="se se_sl">﴾</span>',
  add(core, targetElement) {
    const { context } = core
    context.customCommand_surah_l = {
      targetButton: targetElement
    }
  },
  action() {
    this.functions.insertHTML('<span class="se-surah se-surah-l"> ﴾ </span>', true)
  }
}

export const plugin_surah_r = {
  name: 'customCommand_surah_r',
  display: 'command',
  title: 'بداية السورة',
  innerHTML: '<span class="se se_sr">﴿</span>',
  add(core, targetElement) {
    const { context } = core
    context.customCommand_surah_r = {
      targetButton: targetElement
    }
  },
  action() {
    this.functions.insertHTML('<span class="se-surah se-surah-r"> ﴿ </span>', true)
  }
}
