export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
       ride: {
  '0%': { transform: 'translateX(0%)' },
  '100%': { transform: 'translateX(100%)' },
},


      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        ride: 'ride 6s ease-in-out infinite',
      },
      backgroundImage: {
        'dotted-pattern': 'repeating-linear-gradient(to right, #999 0, #999 5px, transparent 5px, transparent 10px)',
      },
    },
  },
  plugins: [],
};
