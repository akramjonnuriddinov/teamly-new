import { useHead } from '@vueuse/head'
import { getImageUrl } from '@/composables/getImgUrl'
import { HOME_VIEW, ABOUT_VIEW, PORTFOLIO_VIEW, SERVICE_VIEW, VACANCY_VIEW, CONTACT_VIEW } from '@/constant'

const pages = [HOME_VIEW, ABOUT_VIEW, PORTFOLIO_VIEW, SERVICE_VIEW, VACANCY_VIEW, CONTACT_VIEW] as any

export const useSeo = (page: any, path: any) => {
  const meta = {
    title: (pages.filter((item: any) => item.page === page))[0].title as any,
    url: `teamly.uz${path}`,
    description:
      (pages.filter((item: any) => item.page === page))[0].description,
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
}

