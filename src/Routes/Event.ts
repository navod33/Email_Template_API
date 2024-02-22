import express from 'express';
import controller from '../controllers/EventController';
const checkCompanyExists = require('../middleware/check-company-exists');


const router = express.Router();

router.post('/event/create', controller.addEvent);
router.get('/event/:event_id', checkCompanyExists, controller.getEventById);

export = router;

