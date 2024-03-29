import express from 'express';
import controller from '../controllers/TemplateController';
import {checkCompanyExists} from '../middleware/check-company-exists'


const router = express.Router();

router.post('/template/create', controller.addTemplate);
router.get('/template/:template_id', checkCompanyExists, controller.getTemplate);
router.delete('/template/delete/:template_id', checkCompanyExists, controller.deleteTemplate);
router.put('/template/update/:template_id', checkCompanyExists, controller.updateTemplate);

// router.get('/template/:template_id', controller.getTemplate);
// router.delete('/template/delete/:template_id', controller.deleteTemplate);
// router.put('/template/update/:template_id', controller.updateTemplate);

export default router;

