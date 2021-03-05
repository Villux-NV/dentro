const { Router } = require('express');
const { getMembersCtrl, getMemberByIdCtrl, getParentByChildIdCtrl, getChildrenByParentIdCtrl,createMemberCtrl, createChildrenCtrl, addConnectionCtrl } = require('./controllers');

const router = Router();

router.get('/members', getMembersCtrl);
router.get('/members/:primaryId', getMemberByIdCtrl);
router.get('/parent/:primaryId', getParentByChildIdCtrl);
router.get('/children/:primaryId', getChildrenByParentIdCtrl);

router.post('/create', createMemberCtrl);
router.post('/create/:primaryId', createChildrenCtrl);
router.post('/add/:parentId/:childId', addConnectionCtrl);

module.exports = router;