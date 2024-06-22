import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
    from: string
    content: string
}

const MessageSchema: Schema = new Schema({
  from: { type: String, required: true},
  content: { type: String, required: true},
})

export default mongoose.model<IMessage>('Message', MessageSchema);
