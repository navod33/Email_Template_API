import express from 'express';
import controller from '../controllers/TemplateController'; // Corrected the import statement

const router = express.Router();

router.post('/template/create', controller.addTemplate);
router.get('/template/create', controller.getTemplate);
router.delete('/template/delete/:template_id', controller.deleteTemplate);
router.put('/template/update/:template_id', controller.updateTemplate);

export = router;

