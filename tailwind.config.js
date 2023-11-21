/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tg-primary-color': '#7E54F8',
        'tg-primary-color-two': '#5956E9',
        'tg-primary-color-three': '#FFC42B',
        'tg-secondary-color': '#F85454',
        'tg-secondary-color-two': '#F07707',
        'tg-body-font-color': '#757589',
        'tg-heading-font-color': '#141714',
        'tg-paragraph-color': '#757589',
        'tg-section-background': '#EFF7FF',
        'tg-blue': '#0d6efd',
        'tg-indigo': '#8381FF',
        'tg-bubbles': '#E9F9FF',
        'tg-purple': '#6f42c1',
        'tg-pink': '#E481FD',
        'tg-red': '#FA4729',
        'tg-red-two': '#FF0000',
        'tg-orange': '#fd7e14',
        'tg-yellow': '#FFE27B',
        'tg-yellow-two': '#F3B820',
        'tg-green': '#198754',
        'tg-teal': '#20c997',
        'tg-cyan': '#0dcaf0',
        'tg-white': '#ffffff',
        'tg-black': '#070707',
        'tg-black-two': '#131313',
        'tg-black-three': '#151615',
        'tg-gray': '#9C9C9C',
        'tg-gray-two': '#B9B9B9',
        'tg-gray-three': '#FAFAFA',
        'tg-gray-four': '#F3F9FF',
        'tg-gray-five': '#7D7D7D',
        'tg-gray-six': '#F6F9FB',
        facebook: '#1877F2',
        twitter: '#1DA1F2',
        linkedin: '#0A66C2',
        pinterest: '#E60023',
        instagram: '#833AB4',
        skype: '#00aff0',
      },
      backgroundColor: {
        'tg-primary-color': '#7E54F8',
      },
      backgroundImage: {
        'hero-banner': "url('@/assets/images/service-view/service_banner_bg.jpg')",
      },
      boxShadow: {
        'service-inner': '0px 4px 32px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  // plugins: [require("@tailwindcss/line-clamp")],
}
