'use strict'

import {
  shallowMount,
  mount
} from '@vue/test-utils'

import SynVueTrix from '../../src/components/SynVueTrix.vue'

describe('SynVueTrix.vue', () => {
  it('renders valid elements', () => {
    const wrapper = mount(SynVueTrix)

    // assert the component is rendered
    expect(wrapper.is(SynVueTrix)).toBe(true)

    // assert the trix-editor is rendered
    expect(wrapper.contains('trix-editor')).toBe(true)
    expect(wrapper.find('trix-editor').attributes().input).toBeDefined()

    // assert the hidden input is rendered
    expect(wrapper.contains('input')).toBe(true)
    expect(wrapper.find('input').attributes().id).toBeDefined()
  })

  it('has initial props', () => {
    const propsData = {
      inputId: 'inputId',
      inputName: 'content',
      placeholder: 'placeholder',
      srcContent: 'srcContent',
      localStorage: true,
      trixFocus: () => {},
      trixBlur: () => {}
    }

    const wrapper = shallowMount(SynVueTrix, { propsData })

    // assert component props correctly
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key])
    })
  })

  it('has valid hidden input', () => {
    const wrapper = mount(SynVueTrix, {
      propsData: {
        inputId: 'inputId',
        inputName: 'content',
        srcContent: 'srcContent',
        placeholder: 'placeholder'
      }
    })

    // get hidden input element
    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // assert hidden input attributes
    expect(inputEl.value).toEqual('srcContent')
    expect(inputEl.id).toEqual('inputId')
    expect(inputEl.name).toEqual('content')
  })

  it('has valid trix-editor attributes', () => {
    const wrapper = mount(SynVueTrix, {
      propsData: {
        inputId: 'inputId',
        inputName: 'content',
        initContent: 'initContent',
        placeholder: 'placeholder'
      }
    })

    // get trix-editor element
    const trixWrapper = wrapper.find('trix-editor')

    // assert attributes
    expect(trixWrapper.attributes().class).toBe('trix-content')
    expect(trixWrapper.attributes().role).toBe('textbox')
    expect(trixWrapper.attributes().placeholder).toBe('placeholder')
  })

  it('works with v-model directive', () => {
    const wrapper = mount(SynVueTrix, {
      propsData: {
        srcContent: 'init content'
      }
    })

    const inputWrapper = wrapper.find('input')
    const inputEl = inputWrapper.element

    // Has the connect starting value
    expect(wrapper.props().srcContent).toEqual('init content')
    expect(inputEl.value).toEqual('init content')

    // Sets the input to the correct value when props change
    wrapper.setData({
      editorContent: 'new content'
    })
    expect(inputEl.value).toEqual('new content')
  })
})
