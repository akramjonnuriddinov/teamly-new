export const getImageUrl = (name: any) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}