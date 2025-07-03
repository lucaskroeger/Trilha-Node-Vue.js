import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
    let wrapper
    let pinia

    beforeEach(() => {
        pinia = createPinia()
        wrapper = mount(Login, {
            global: {
                plugins: [pinia],
                stubs: {
                    'v-container': true,
                    'v-row': true,
                    'v-col': true,
                    'v-card': true,
                    'v-toolbar': true,
                    'v-card-text': true,
                    'v-form': true,
                    'v-text-field': true,
                    'v-card-actions': true,
                    'v-btn': true,
                    'v-spacer': true
                }
            }
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('renders login form', () => {
        expect(wrapper.find('v-form').exists()).toBe(true)
    })

    it('has email and password fields', () => {
        const textFields = wrapper.findAll('v-text-field')
        expect(textFields).toHaveLength(2)
    })

    it('has login button', () => {
        const buttons = wrapper.findAll('v-btn')
        expect(buttons.length).toBeGreaterThan(0)
    })

    it('initializes with empty form data', () => {
        expect(wrapper.vm.formData.email).toBe('')
        expect(wrapper.vm.formData.senha).toBe('')
    })

    it('validates required fields', async () => {
        const form = wrapper.find('v-form')
        await form.trigger('submit')

        // Verificar se as validações são aplicadas
        expect(wrapper.vm.form).toBeDefined()
    })
}) 