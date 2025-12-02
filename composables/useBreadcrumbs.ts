import { queryCollection } from '#imports'

type Breadcrumb = {
  label: string
  to: string
}

export const useBreadcrumbs = async (fullPath: string): Promise<Breadcrumb[]> => {
  const clean = fullPath.replace(/(^\/|\/$)/g, '')
  if (!clean) return []

  const segments = clean.split('/').filter(Boolean)
  const crumbs: Breadcrumb[] = []
  let acc = ''

  for (const seg of segments) {
    acc += '/' + seg
    const page = await queryCollection('pages').path(acc).first()
    if (page?.title) {
      crumbs.push({ label: page.title, to: acc })
    }
  }

  return crumbs
}
