import express from 'express';
import controller from '../controllers/EventController'; // Corrected the import statement

const router = express.Router();

router.post('event/create', controller.addEvent);
router.get('event/:event_id', controller.getEventById);

export = router;

