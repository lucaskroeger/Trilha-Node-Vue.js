import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#6B46C1',
                    secondary: '#2D3748',
                    accent: '#9F7AEA',
                    error: '#E53E3E',
                    info: '#3182CE',
                    success: '#38A169',
                    warning: '#D69E2E',
                    surface: '#FFFFFF',
                    background: '#F7FAFC'
                }
            },
            dark: {
                colors: {
                    primary: '#9F7AEA',
                    secondary: '#4A5568',
                    accent: '#B794F4',
                    error: '#FC8181',
                    info: '#63B3ED',
                    success: '#68D391',
                    warning: '#F6E05E',
                    surface: '#2D3748',
                    background: '#1A202C'
                }
            }
        }
    }
}) 