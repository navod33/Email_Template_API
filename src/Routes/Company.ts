import express from 'express';
import { addCompany, editCompany } from '../controllers/CompanyController';
import {checkCompanyExists} from '../middleware/check-company-exists'

const router = express.Router();

router.post('/company/create', addCompany);
router.get('/company/:company_id', checkCompanyExists, editCompany);



export default router;