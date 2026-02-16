import express from 'express'
import { createNotes, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/note.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
const router=express.Router()


router.post('/create',protect,createNotes)
router.get('/get',protect,getAllNotes)
router.get('/get/:id',protect,getNoteById)
router.post('/update/:id',protect,updateNote)
router.post('/delete/:id',protect,deleteNote)

export default router