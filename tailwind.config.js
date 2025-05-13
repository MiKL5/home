tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#007AFF',
                amber:  '#af8838',
                golden: '#e3b442',
                macos: {
                    bg: '#f0f0f0',
                    window: '#ffffff',
                    dark: {
                        bg: '#1e1e1e',
                        window: '#252525'
                    }
                }
            },
            animation: {
                'bounce-small': 'bounceSmall 0.3s ease-in-out',
            },
            keyframes: {
                bounceSmall: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' }
                }
            }
        }
    }
}