import { Request, Response } from 'express'
import { connection } from 'mongoose'


export default {
    health: async (_req: Request, res: Response): Promise<Response> => {
      if (connection.readyState === 1) {
        return res.status(200).json({ db: { status: 'up' }, status: 'up' });
      } else {
        return res.status(500).json({ db: { status: 'down' }, status: 'down' });
      }
    },
}
