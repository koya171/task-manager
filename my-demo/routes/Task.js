const express = require('express')
const router = express.Router();
const {
    getAlltasks,
    Createtask,
    gettask,
    Updatetask,
    Deletetask
} = require('../controolers/tsak')

router.route('/').get(getAlltasks).post(Createtask);
router.route('/:id').get(gettask).patch(Updatetask).delete(Deletetask);

module.exports = router


