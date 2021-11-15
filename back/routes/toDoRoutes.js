import express from 'express'
import * as todos from '../controllers/todos/todoController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router
	.route('/')
	.get(protect, todos.getTodos)
	.post(protect, todos.createTodo)
	.delete(protect, todos.deleteAllTodos)
router
	.route('/:id')
	.delete(protect, todos.deleteTodo)
	.put(protect, todos.updateTodo)

export default router
