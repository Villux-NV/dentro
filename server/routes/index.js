const { Router } = require('express');
const { getTreeCtrl, getMembersCtrl, getMemberByIdCtrl, getParentByChildIdCtrl, getChildrenByParentIdCtrl,createMemberCtrl, createChildCtrl, addConnectionCtrl, deleteMemberByIdCtrl } = require('./controllers');

const router = Router();


router.get('/membertree', getTreeCtrl);
router.get('/members', getMembersCtrl);
router.get('/members/:primaryId', getMemberByIdCtrl);
router.get('/parent/:primaryId', getParentByChildIdCtrl);
router.get('/children/:primaryId', getChildrenByParentIdCtrl);

router.post('/create', createMemberCtrl);
router.post('/create/:primaryId', createChildCtrl);
router.post('/add/:parentId/:childId', addConnectionCtrl);

router.delete('/delete/:primaryId', deleteMemberByIdCtrl);

module.exports = router;