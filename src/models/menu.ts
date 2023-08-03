import { model, Document, Schema } from 'mongoose'

interface IMenu extends Document {
  name: string
  relatedId?: string
}

const menuSchema = new Schema<IMenu>({
  name: { type: String, required: true },
  relatedId: String
}, { _id: true, id: true})


menuSchema.virtual('id').get(function () {
  return this._id;
})

menuSchema.set('toJSON', { virtuals: true });

export default model<IMenu>('menu', menuSchema, 'menus')
