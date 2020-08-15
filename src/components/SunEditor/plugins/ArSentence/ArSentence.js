export const PluginArSentence = {
  name: 'ar_sentence',
  display: 'submenu',
  title: 'ArSentence',
  buttonClass: '',
  innerHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAANklEQVRIiWNgGAUEACMa/z+R6v8TKcbARJ67RgEVAb5IJjZC8Zo7GskDD0Zz8ggAozl5FFAOAKgHDA21HUnpAAAAAElFTkSuQmCC"/>',

  add(core, targetElement) {
    const { context } = core
    context.submenuArSentence = {
      targetButton: targetElement,
      textElementOrigin: null,
      textElementTranslate: null
    }
    const listDiv = this.setSubmenu.call(core)
    context.submenuArSentence.textElementOrigin = listDiv.querySelector('.se-origin')
    context.submenuArSentence.textElementTranslate = listDiv.querySelector('.se-translate')
    listDiv.querySelector('.se-arsentence__ok').addEventListener('click', this.onClick.bind(core))
    core.initMenuTarget(this.name, targetElement, listDiv)
  },

  setSubmenu() {
    const listDiv = this.util.createElement('DIV')
    listDiv.className = 'se-submenu se-list-layer'
    listDiv.innerHTML = ''
          + '<div class="se-arsentence">'
              + '<div class="se-arsentence__inputs">'
              + '<input class="se-arsentence__input se-origin" type="text" placeholder="Origin" />'
              + '<input class="se-arsentence__input se-translate" type="text" placeholder="Translate" />'
              + '</div>'
              + '<div class="se-arsentence__buttons">'
                  + '<button type="button" class="se-arsentence__ok">'
                      + '<strong>OK</strong>'
                  + '</button>'
              + '</div>'
          + '</div>'
    return listDiv
  },

  on() {
    this.context.submenuArSentence.textElementOrigin.focus()
  },


  onClick() {
    const textElementOrigin = this.context.submenuArSentence.textElementOrigin.value.trim()
    const textElementTranslate = this.context.submenuArSentence.textElementTranslate.value.trim()

    if (!textElementOrigin) return

    this.functions.insertHTML(`<ul class="arsent"><li class="arsent__original">${textElementOrigin}</li><li class="arsent__translate">${textElementTranslate}</li></ul>`, true)
    this.context.submenuArSentence.textElementOrigin.value = ''
    this.context.submenuArSentence.textElementTranslate.value = ''

    this.submenuOff()
  }
}


export default PluginArSentence
