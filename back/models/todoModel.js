import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const todoSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isChecked: {
			type: Boolean,
			default: false,
		},
		user: {
			type: ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
