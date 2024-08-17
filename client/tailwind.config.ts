import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  important: false,
  separator: ':',
  darkMode: 'media',
  theme: {
    screens: {
      phone: { max: '640px' },
      tablet: { max: '768px' },
      laptop: '1024px',
      desktop: '1280px',
    },
    colors: {
      transparent: 'transparent',

      current: 'currentColor',

      white: '#E6EDF3',
      black: '#000000',

      backdrop: '#00000045',

      successBase: '#69FF94',
      successDark: '#50FA7B',

      dangerBase: '#FF6E6E',
      dangerDark: '#FF5555',

      warningBase: '#FFFFA5',
      warningDark: '#F1FA8C',

      gray: '#c6cdd5',
      pink: '#FF79C6',
      purple: '#9580ff',
      cyan: '#8BE9FD',

      'white-transparent': {
        30: '#ffffff30',
        60: '#ffffff60',
      },

      cookiebar: '#0c1e3fd9',

      upload: '#d9e3f3',

      dropdown: {
        hover: '#dedede',
      },

      primary: {
        light: '#44475A',
        base: '#22272E',
        dark: '#1C2128',
      },

      secondary: {
        light: '#9aa2bd',
        base: '#6272a4',
        dark: '#191e2b',
      },

      focus: {
        input: '#c2850c',
      },

      hover: {
        input: '#dedede',
      },
    },

    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      13: '3.25rem',
      14: '3.5rem',
      15: '3.75rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      30: '7.5rem',
      32: '8rem',
      40: '10rem',
      41: '11rem',

      48: '12rem',
      56: '14rem',
      64: '16rem',
      96: '24rem',
      128: '32rem',
    },

    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },

    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },

    borderColor: ({ theme }) => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor'),
    }),

    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '8px',
      lg: '0.5rem',
      full: '9999px',
    },

    borderWidth: {
      1: '1px',
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px',
    },

    boxShadow: {
      default:
        '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
      md: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      lg: '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
      xl: '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 255.04)',
      '2xl': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },

    container: {
      padding: '1rem',
    },

    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },

    fill: ({ theme }) => theme('colors'),

    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },

    flexGrow: {
      0: '0',
      default: '1',
    },

    flexShrink: {
      0: '0',
      default: '1',
    },

    fontFamily: {
      sans: ['Rawline', '-apple-system', 'Arial'],
      serif: ['Times New Roman', 'serif'],
      mono: ['monospace'],
    },

    fontSize: ({ theme }) => ({
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.125rem',
      lg: '1.5rem',
      xl: '1.75rem',
      ...theme('spacing'),
    }),

    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    height: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      half: '50%',
      full: '100%',
      screen: '100vh',
    }),

    inset: {
      0: '0',
      auto: 'auto',
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },

    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },

    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },

    margin: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
    }),

    maxHeight: {
      full: '100%',
      screen: '100vh',
    },

    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%',
    },

    minHeight: {
      0: '0',
      full: '100%',
      screen: '100vh',
    },

    minWidth: {
      0: '0',
      full: '100%',
    },

    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },

    opacity: {
      0: '0.00',
      10: '0.10',
      20: '0.20',
      25: '0.25',
      50: '0.50',
      60: '0.60',
      75: '0.75',
      80: '0.80',
      100: '1.00',
    },

    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
    },

    padding: ({ theme }) => theme('spacing'),

    stroke: {
      current: 'currentColor',
    },

    textColor: ({ theme }) => theme('colors'),

    width: ({ theme }) => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
    }),

    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
    },

    extend: {
      keyframes: {
        typing: {
          from: {
            width: '0',
          },
          to: {
            width: '100%',
          },
        },
        zerotohundred: {
          from: {
            width: '0',
          },
          to: {
            width: '100%',
          },
        },
        hundredtozero: {
          from: {
            width: '100%',
          },
          to: {
            width: '0',
          },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        fade: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        appearfromtop: {
          from: {
            opacity: '0',
            transform: 'translateY(-50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {},
};
export default config;
