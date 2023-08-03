import { menuTreeCompose } from "../../../src/parsers/menu"
import * as menuMocks from '../mocks/menu'
import { cloneDeep } from 'lodash'

describe('Menu parser', () => {
  test('[PARSER] return menu tree complete', () => {
    const completeMenu = cloneDeep(menuMocks.menusDataMock)
    const result = menuTreeCompose(completeMenu);

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('name', 'Eletrodomésticos')
    expect(result[0].subMenus).toHaveLength(1)
    expect(result[0].subMenus[0]).toHaveProperty('name', 'Televisão')
    expect(result[0].subMenus[0].subMenus).toHaveLength(1)
    expect(result[0].subMenus[0].subMenus[0]).toHaveProperty('name', 'LCD')
    expect(result[0].subMenus[0].subMenus[0].subMenus).toHaveLength(2)
    expect(result[0].subMenus[0].subMenus[0].subMenus[0]).toHaveProperty('name', '110')
    expect(result[0].subMenus[0].subMenus[0].subMenus[1]).toHaveProperty('name', '220')
    expect(result[1]).toHaveProperty('name', 'Informática')
    expect(result[1].subMenus).toHaveLength(0)
  })

  test('[PARSER] return menu tree when LCD item was removed', () => {
    const partialMenu = cloneDeep(menuMocks.menusDataMock)

    delete partialMenu[2]
    const result = menuTreeCompose(partialMenu);

    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('name', 'Eletrodomésticos')
    expect(result[0].subMenus).toHaveLength(1)
    expect(result[0].subMenus[0]).toHaveProperty('name', 'Televisão')
    expect(result[0].subMenus[0].subMenus).toHaveLength(0)
    expect(result[1]).toHaveProperty('name', 'Informática')
    expect(result[1].subMenus).toHaveLength(0)
  })

  test('[PARSER] return menu tree with one element when Eletrodomésticos item was removed', () => {
    const partialMenu = cloneDeep(menuMocks.menusDataMock)

    delete partialMenu[0]
    const result = menuTreeCompose(partialMenu);

    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('name', 'Informática')
    expect(result[0].subMenus).toHaveLength(0)
  })
})