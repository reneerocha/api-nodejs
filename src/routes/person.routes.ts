import { Router } from 'express';
import { PersonController } from '../controllers/person.controller.js';

const router = Router();

router.post('/', PersonController.create);
router.get('/', PersonController.getAll);
router.get('/:id', PersonController.getById);
router.patch('/:id', PersonController.update);
router.delete('/:id', PersonController.delete);

export default router;
