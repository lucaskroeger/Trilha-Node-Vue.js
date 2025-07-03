import { config } from '@vue/test-utils'

// Configuração global para os testes
config.global.mocks = {
    $router: {
        push: jest.fn(),
        replace: jest.fn(),
        go: jest.fn()
    },
    $route: {
        params: {},
        query: {},
        path: '/'
    }
}

// Mock do localStorage
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
    },
    writable: true
})

// Mock do console para evitar logs nos testes
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
} 