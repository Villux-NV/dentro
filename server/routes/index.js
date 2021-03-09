const { Router } = require('express');
const { getTreeCtrl, getMembersCtrl, getMemberByIdCtrl, getFamiliesCtrl, createMemberCtrl, createChildCtrl, createParentCtrl, addConnectionCtrl, editMemberCtrl, deleteMemberByIdCtrl } = require('./controllers');

const router = Router();


router.get('/membertree/:familyNameId', getTreeCtrl);
router.get('/members', getMembersCtrl);
router.get('/members/:primaryId', getMemberByIdCtrl);
router.get('/families/:userId', getFamiliesCtrl);

router.post('/create/:userId', createMemberCtrl);
router.post('/create/child/:primaryId/:userId', createChildCtrl);
router.post('/create/parent/:primaryId/:userId', createParentCtrl);
router.post('/add/:parentId/:childId', addConnectionCtrl);

router.put('/edit/:primaryId', editMemberCtrl);

router.delete('/delete/:primaryId', deleteMemberByIdCtrl);

module.exports = router;