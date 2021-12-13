// Express Router Setup
const express = require('express');
const router = express.Router();

// Import Controllers
const {getAllTasks, getTask, updateTask, deleteTask, createTask} = require('../controllers/tasks');

// router.get('/', getThing);
// router.post('/', createThing);
// router.post('/postman', createThing);
// router.put('/', updateThing);
// router.delete('/:id', deleteThing);

// OR

// router.route('/').get((req, res) => {
//    res.send('All Items');
// })

// router.route('/').get(getAllTasks);
// router.route('/postman').post(createPostmanThing);
// router.route('/:id').get(updateThing).delete(deleteThing);

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').patch(updateTask).delete(deleteTask).get(getTask);

module.exports = router;
