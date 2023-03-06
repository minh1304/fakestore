/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            display: ['group-focus'],
            opacity: ['group-focus'],
            inset: ['group-focus'],
            height: {
                'screen-navbar-player-mobile': 'calc(100vh - 6rem - 6rem )',
                'screen-navbar-player': 'calc(100vh - 82px )',
                'screen-side-player': 'calc(100vh - 6rem)',
            },
            backgroundImage: {
                'hero-pattern':
                    "url('https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.4/static/media/bg-zma.0cc0a7e9.svg')",
                'background-test':
                    "url('https://i.scdn.co/image/ab676186000010169b8cf21ce09745ada7cea1d7')",
            },
            fontFamily: {
                Inter: ['Inter', 'sans-serif'],
            },
            colors: {
                color_header: '#1a1a1a',
                decorative: '#b3b3b3',
                hover_color: '#2c2c2c',
                hover_2: '#ffffff3a',
                transparent: '#00000000',
                color_green: '#1fdf64',
                color_player_music: '#181818',
                primary: '#ef546b',
                secondary: '##ffffff80',
                queue_player_popup: '#5d218c',
                layout: '#37075d',
                purple_primary: '#ed2b91',
                text_hover: '#fe63da',
                sidebar: '#572f90',
            },
            keyframes: {
                fullSpin: {
                    '100%': {
                        transform: 'rotate(-360deg)',
                    },
                },
            },
            animation: {
                fullSpin: 'fullSpin 3s linear infinite',
            },
        },
    },
    plugins: [],
};
