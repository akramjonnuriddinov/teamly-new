import { useHead } from '@vueuse/head'
import { getImageUrl } from '@/composables/getImgUrl'
import { seoTexts } from '@/constant'

export const useSeo = (page: any, path: any) => {
  const meta = {
    title: seoTexts[page]?.title,
    url: `teamly.uz${path}`,
    description:
      seoTexts[page]?.description,
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

