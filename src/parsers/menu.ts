import { defaults } from 'lodash'

export function menuTreeCompose(data: any[]) {
  const nodes: any = {}
  return data.filter(obj => {
    const id = obj['_id'],
      relatedId = obj['relatedId']

    nodes[id] = defaults(obj, nodes[id], { submenus: [] })

    relatedId &&
      (nodes[relatedId] = nodes[relatedId] || { submenus: [] })['submenus'].push(obj)
    return !relatedId
  })
}
