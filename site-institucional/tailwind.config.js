module.exports = {
  content: [
    
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
        petitformal: ['Petit Formal Script', 'cursive'],
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pop-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.3s ease-in-out',
        'pop-out': 'pop-out 0.3s ease-in-out',
      },
      colors: {
      },
    },
  },
  plugins: [],
};