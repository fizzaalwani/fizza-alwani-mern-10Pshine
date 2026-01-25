import express from 'express'
import { createNotes, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/note.controller'
import { protect } from '../middlewares/auth.middleware'
const router=express.Router()


router.post('/create',protect,createNotes)
router.get('/get',protect,getAllNotes)
router.get('/get/:id',protect,getNoteById)
router.post('/update',protect,updateNote)
router.post('/delete',protect,deleteNote)

export default router