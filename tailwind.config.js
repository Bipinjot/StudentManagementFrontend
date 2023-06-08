module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        navcolor1:'#000428',
        navcolor2:'#004e92',
        slidertext:'#182266',
        headingtext:'#022c69'
      },
      fontFamily: {
        Raleway: ['Raleway', 'sans-serif'],
        Poppins:['Poppins', 'sans-serif'],
        Amatic: ['Amatic SC', 'cursive'],
        Arch: ['Architects Daughter', 'cursive'],
        Indie: ['Indie Flowerr', 'cursive'],
        Schoolbell: ['Schoolbell', 'cursive'],  
        Shadows: ['Shadows Into Light', 'cursive'],  
        Waiting: ['Waiting for the Sunrise', 'cursive']
       },
       backgroundImage: {
        'sliderImg': "url('./Assets/slider.jpg')",
      },
      spacing:{
        '108':'70vh',
        '102':'60vh',
        '120':'42vw',
        '115':'41vw',
        '100':'20vw'
      },
      backgroundSize: {
        '50%': '50%',
        '16': '100rem',
      },
      boxShadow:{
        'inner2':'inset 5 2 5px #000000'
      }
    },
  },
  plugins: [],
}
