import Menu from '../models/menu'
import { logger } from '../utils/winston'
import { menuTreeCompose } from '../parsers/menu'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default {
  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = await Menu.create(req.body)
      return res.status(StatusCodes.CREATED).json({
        id,
      })
    } catch (error) {
      logger.error('Error: ', error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Can't possible to insert a menu item" })
    }
  },
  getAll: async (_: Request, res: Response): Promise<Response> => {
    try {
      const menus = await Menu.find({})

      let menusParsed: any;
      if (menus.length > 0) {
        menusParsed = menuTreeCompose(JSON.parse(JSON.stringify(menus)))
      }

      if (menus.length === 0 || menusParsed.length === 0) {
        logger.info('Menu list was not found')
        return res.status(404).json({ message: 'Menu list not found' })
      }

      return res.status(StatusCodes.OK).json(menusParsed)
    } catch (error: any) {
      logger.error('Error: ', error)
      return res.status(500).json({ message: "Can't possible to find menu list" })
    }
  },
  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
        const paramId = req.params.id;
        const menu = await Menu.findOne({ _id: req.params.id })

        if (!menu || !menu?.id) {
          logger.info(`Menu item with id: ${paramId} was not found`)
          return res.status(StatusCodes.NOT_FOUND).json({ message: 'Menu item not found' })
        }
    
        await Menu.deleteOne({ _id: menu.id })
        return res.json({
          id: menu.id,
        })
    } catch (error: any) {
        logger.error('Error ', error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Can't possible to remove menu item"})
    }
  },
}
