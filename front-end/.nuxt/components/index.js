export { default as GraficoColunaMaster } from '../..\\components\\GraficoColunaMaster.vue'
export { default as GraficoTortaMaster } from '../..\\components\\GraficoTortaMaster.vue'
export { default as GraphicBar } from '../..\\components\\GraphicBar.vue'
export { default as GraphicLine } from '../..\\components\\GraphicLine.vue'
export { default as GraphicPie } from '../..\\components\\GraphicPie.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as TooltipComponent } from '../..\\components\\TooltipComponent.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
