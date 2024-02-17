import { useHead } from '@vueuse/head'
import { getImageUrl } from '@/composables/getImgUrl'
// import { useRoute } from 'vue-router'
// import { HOME_VIEW, ABOUT_VIEW, PORTFOLIO_VIEW, VACANCY_VIEW, CONTACT_VIEW } from '@/constant'

// const route = useRoute()

// const pages = [HOME_VIEW, ABOUT_VIEW, PORTFOLIO_VIEW, VACANCY_VIEW, CONTACT_VIEW]
// logrocket, google console

export const useSeo = (page: any, path: string) => {
  const meta = {
    title: 'pages',
    url: `teamly.uz${path}`,
    description:
      'Custom software development company. We create world-class e-Commerce platforms, custom web portals, and enterprise-grade web apps',
    image: getImageUrl('logos/logo.png'),
  }

  useHead({
    title: meta.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: meta?.description,
      },
      { hid: 'og:title', property: 'og:title', content: meta?.title },
      { hid: 'og:url', property: 'og:url', content: meta?.url },
      { hid: 'og:description', property: 'og:description', content: meta?.description },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:image', property: 'og:image', content: meta?.image },
    ],
  })

  return page
}

