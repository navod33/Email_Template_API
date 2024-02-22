import express from 'express';
import controller from '../controllers/CompanyController';
const checkCompanyExists = require('../middleware/check-company-exists');

const router = express.Router();

router.post('/company/create', controller.addCompany);
router.get('/company/:company_id', checkCompanyExists, controller.editCompany);

export = router;

