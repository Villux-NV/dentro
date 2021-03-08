const { Router } = require('express');
const { getTreeCtrl, getMembersCtrl, getMemberByIdCtrl, getParentByChildIdCtrl, getChildrenByParentIdCtrl,createMemberCtrl, createChildCtrl, createParentCtrl, addConnectionCtrl, editMemberCtrl, deleteMemberByIdCtrl } = require('./controllers');

const router = Router();


router.get('/membertree', getTreeCtrl);
router.get('/members', getMembersCtrl);
router.get('/members/:primaryId', getMemberByIdCtrl);

router.post('/create', createMemberCtrl);
router.post('/create/child/:primaryId', createChildCtrl);
router.post('/create/parent/:primaryId', createParentCtrl);
router.post('/add/:parentId/:childId', addConnectionCtrl);

router.put('/edit/:primaryId', editMemberCtrl);

router.delete('/delete/:primaryId', deleteMemberByIdCtrl);

module.exports = router;