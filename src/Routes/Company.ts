import express from 'express';
import controller from '../controllers/CompanyController'; // Corrected the import statement

const router = express.Router();

router.post('/company/create', controller.addCompany);
router.get('/company/:company_id', controller.editCompany);

export = router;

