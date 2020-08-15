import { prefixZmj, suffixZmj } from './utilsArWord'

// ex) A submenu plugin that appends the contents of the input element to the editor
export const PluginArWord = {
  // @Required @Unique
  // plugin name
  name: 'ar_word',

  // @Required
  // data display
  display: 'submenu',

  // @Options
  title: 'ArWord',
  buttonClass: '',
  innerHTML: '<img style="width: 25px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABi0lEQVRIic3WQUsVYRTG8Z/hQgqFQiHoXkGiiHCjm4iIPkAp1CqDtu6lRat2UYugpdBXyFwVtWzRqqAWbQJBsaULERWhCLku5igy1zvvO/depAcO78zhzPM/75lhZmhXA0vYQSsR63h0gkdSDWxmAMrxtC5oKS78gEuJ2tsl2PM6oMNxNTJqh7Tv7HUu6PCCuvXH49VpgVp4dlqgFh73E/SlArTeT1BZ53A3x6dXUEefM30whVGc76mTDD3BPv7hWq5PuWAAD/EC1yM3jl+4qJjIHhZxD4Pdgt7E+Q5+RG4uctMYieMHCZ+jDk7SZcxjAc3oGCZjHYqAv1Xdp0BruIFvWMbvyE/FOoqtON6SUBWoFRCYwHecxZ3ITSruIaz2AjquYUXXMwH7ilncVOx8I9PnSJ2elp94rxjfZ9zCH8W9uV/DJ1nwMvIrijHCGC7U9EkWDAQgd9T/z7tuN9acT3knNWPdripajk4+dglr4lN4vKsqvKq7361ybOJKqqsG3iq2XhewHTtpgxwAsFm6+FECFwEAAAAASUVORK5CYII="/>',
  // eslint-disable-next-line max-len
  // innerHTML: '<img style="width: 35px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFP0lEQVR4nO2afYhUVRTAf2fm7ZqphPiXY2aFW0FW4Edk7qJhSx/mhsEuGewgWLSF/0iQG+Gu+0EJwhKYBJKhsytWgmVlEW0m7BqhhQnJBkEi4UhQGKWSw8w7/TGz6/pm3ts3972ZXfL9YGA47557zz3v3HPPfe9BRERERERERMQNigTtILFJm1TYLLAMmBGCTSZcVjgp0JfeKZ+WoxjIAbdt0jdR2oP0ETYCb5zbJa+X0d6MO17SJhEOI2RE2ZqJMfDb25I27S8I8zdpoiZHKzG6UWoR1v66Sz6r6KB1bfpNXZtqXZu+WtGBymBhm7bXtane9aIe9asTMx3Msllq2WDZ9Jv2ETY1NvssG+LKUr865g5QZloKI7vlgmkfYTOyWy5YCpYyy6+OZTqYZZtqVpZy7TJ2QFxNNStLuXaNOeDeZq2dNZMeUVoV5k6oWfD0QxvUxBVpoP+fy3ScOSgZ50W/fX63V4p2MeMImH0zPeSoVkZPAFtmT0eB14qMCrC8jB1g2bQCxJQVRwfkW3MTJmZVUutRhlRIUsIBw6niO+sXq8x4HNsFLJu5lg2VnjzAsZQMWzbU5EiE3Xdha/bffvRPvMpZ3Wu8x9b7ywFfHiiOlHLncW0JVDmre40XxJZydcfngOvoGNLjCg8DCAx3N0hDmHKvMD3yfoAcEFYE3JrJG12gPmx5pSLOOAKca2f+1dIKYcm91mpzs9aK0oPSirMmEdIo/Rqj42CJGsI8BxQ7YJhrd2wobLlXqFo5ekRda5IEsEXscGoI1yWwaF1+rToJS+4VqjWFmsRWVgwcvn5bTq7L1xBQuoYIUgdU9YDjNd5oTeKcPEDqo3wNYdmlawjjOsCp1Dmkx2EsgQ13FbK3Q+6GW/sxuecSmGACQXSL2o/+cZ6iEi7Z2yF3w639mNzr1DbRiS6IrhPXCEgU5VdvuRtu7adcBDiTRyJTOns75G64tb+2C/ioBDc/7lISh1hFukbAkqdLZ283uRtu7cO8i0F0p+RhaPTa9sHSJXH7o+6HpYofhjoadbVtswdY4NLkXCzGxu6v5GvPgQOEcZgHqfF1QNqyYdsq9VzfsSx7LJsFo/ttid+CWJZ3vfroXq0NhbbnS05igr18ghrCsA7IkUJoB4Z6V3q40V/nt/eu9DjTZ/OeV0iVNGoydoHsn3TeNAfIl5ihP6lxcF6F1NU/2FbSqCouAWN21KvuqDd6IlxRyrXL/MXIlJt6HuM6oOyB/idvhoK8HL1k2bBzhVY6X/jmneU6r7AL/O1Xx9gBceVkXKE2Q9K0j7CJ2yTjCnHle7865ksgSx8xHgG69ixRsEltPDU5H0jsW67zclmS5PK7iq30+dUN9IlMarH2Ar4/RxmPQhqhf/q/dLScKX625+S9ZTrfyvEW0Ager7+F3uQPstWvHYE/khpYrE/FlM3Ag8BMgy62P3dKih5tjWf/Yl0iyqe4v7S9BJwQpW/9j3KknMEDO8CUDx/QevLH43TLaZnn1u6D+3WtCAeAGSiDCBtaTkvJEtoE4yQYlJbTMlxIWK67yKH79AULDsWVGXHYe7GGJ8OcPARIgqEM7rJnKyqfLKITpRNFga6mn+gSJPTya8o54POFOu2Laey1bJ4FMijPrxmRin2INbkOcNzPwXt0Tlb4WGzqgYu28swTP8uxStowaUkQYPBu/Qu4RZWGWJwranMQuBM4qzZrGn+RkUrbMNkRsB/lZWCI7Jj4RDZLU+NZ+b0qNlRjEDc0wys1FlcVmgVqFQamX2Hr0rRcmUy7IiIiIiIiIiJuCP4DrFAYFgZIKlcAAAAASUVORK5CYII="/>',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add(core, targetElement) {
    // @Required
    // Registering a namespace for caching as a plugin name in the context object
    const { context } = core
    context.customSubmenu = {
      // targetButton: targetElement,
      textElementPrefix: null,
      textElementRoot: null,
      textElementSuffix: null
    }

    // Generate submenu HTML
    // Always bind "core" when calling a plugin function
    const listDiv = this.setSubmenu.call(core)

    // Input tag caching
    context.customSubmenu.textElementPrefix = listDiv.querySelector('.se-prefix')
    context.customSubmenu.textElementRoot = listDiv.querySelector('.se-root')
    context.customSubmenu.textElementSuffix = listDiv.querySelector('.se-suffix')
    // console.log(listDiv);

    // You must bind "core" object when registering an event.
    /** add event listeners */
    listDiv.querySelector('.se-arword__add').addEventListener('click', this.onClick.bind(core))

    // @Required
    // You must add the "submenu" element using the "core.initMenuTarget" method.
    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv)
  },

  setSubmenu() {
    const listDiv = this.util.createElement('DIV')
    // @Required
    // A "se-submenu" class is required for the top level element.
    listDiv.className = 'se-submenu se-list-layer'
    listDiv.innerHTML = ''
          + '<div class="se-arword">'
              + '<div class="se-arword__inputs">'
              + '<input class="se-arword__input se-suffix" type="text" placeholder="Suffix" />'
              + '<input class="se-arword__input se-root" type="text" placeholder="Root" />'
              + '<input class="se-arword__input se-prefix" type="text" placeholder="Prefix" />'
              + '</div>'
              + '<div class="se-arword__buttons">'
                  + '<button type="button" class="se-arword__add">'
                      + '<strong>OK</strong>'
                  + '</button>'
              + '</div>'
          + '</div>'

    return listDiv
  },

  // @Override submenu
  // Called after the submenu has been rendered
  on() {
    this.context.customSubmenu.textElementRoot.focus()
  },


  onClick() {
    const textElementRoot = this.context.customSubmenu.textElementRoot.value.trim()
    const textElementPrefix = this.context.customSubmenu.textElementPrefix.value.trim()
    const textElementSuffix = this.context.customSubmenu.textElementSuffix.value.trim()


    if (!textElementRoot) return

    const prefix = textElementPrefix ? `<span class="arword__prefix">${textElementPrefix}${prefixZmj(textElementPrefix)}</span>` : ''
    const root = `<span class="arword__root">${prefixZmj(textElementPrefix)}${textElementRoot}${suffixZmj(textElementRoot, textElementSuffix)}</span>`
    const suffix = textElementSuffix ? `<span class="arword__suffix">${suffixZmj(textElementRoot, textElementSuffix)}${textElementSuffix}</span>` : ''
    this.functions.insertHTML(`<span class="arword">${prefix}${root}${suffix}</span>`, true)

    this.context.customSubmenu.textElementRoot.value = ''


    this.submenuOff()
  }
}


export default PluginArWord
