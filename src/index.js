/*
 * @version: 0.0.1
 * @author: https://twitter.com/isocroft
 * 
 * @project: https://github.com/synergixe/vue-trix
 */

import Vue from 'vue'
import SynVueTrix from './components/SynVueTrix.vue'

Vue.config.ignoredElements = ['trix-editor']

Vue.component(SynVueTrix.name, SynVueTrix)

export default SynVueTrix
