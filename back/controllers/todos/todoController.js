import asyncHandler from 'express-async-handler'
import Todo from '../../models/todoModel.js'

// @desc Get all todos
// @route GET /api/todos
// @access Private
const getTodos = asyncHandler(async (req, res) => {
	const todos = await Todo.find({ user: req.user._id })
		.sort({ createdAt: 'desc' })
		.exec()

	res.json(todos)
})

// @desc Get todo
// @route GET /api/todos/:id
// @access Private
const getTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id)

	if (!todo) {
		res.status(404)
		throw new Error('Task not found')
	}

	res.json(todo)
})

// @desc Delete todo
// @route DELETE /api/todos/:id
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
	const todo = await Todo.findById(req.params.id)

	if (!todo) {
		res.status(404)
		throw new Error('Task not found')
	}

	await todo.deleteOne()
	res.json({ message: 'Task deleted' })
})

// @desc Delete all todos
// @route DELETE /api/todos/
// @access Private
const deleteAllTodos = asyncHandler(async (req, res) => {
	const todos = Todo.find({ user: req.user._id })

	if (!todos) {
		res.status(404)
		throw new Error('Tasks not found')
	}

	await todos.deleteMany()
	res.json({ message: 'All tasks has been deleted' })
})

// @desc Create todo
// @route POST /api/todos/
// @access Private
const createTodo = asyncHandler(async (req, res) => {
	const { name } = req.body

	const user = req.user._id

	const todo = new Todo({
		name,
		user,
	})

	const createdTodo = await todo.save()
	res.json(createdTodo)
})

// @desc Update todo
// @route PUT /api/todos/:id
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
	const { isChecked } = req.body
	const todo = await Todo.findById(req.params.id)

	if (!todo) {
		res.status(404)
		throw new Error('Task not found')
	}

	todo.isChecked = isChecked

	const updatedTodo = await todo.save()
	res.json(updatedTodo)
})

export { getTodos, getTodo, deleteTodo, deleteAllTodos, createTodo, updateTodo }
