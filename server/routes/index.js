const { Router } = require('express');
const { createMemberCtrl, getMembersCtrl } = require('./controllers');

const router = Router();

router.post('/create', createMemberCtrl);

router.get('/members', getMembersCtrl);

module.exports = router;