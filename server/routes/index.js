const { Router } = require('express');
const { getTreeCtrl, getMemberByIdCtrl, getFamiliesCtrl, createMemberCtrl, createChildCtrl, createParentCtrl, addConnectionCtrl, editMemberCtrl, deleteMemberByIdCtrl, deleteFamilyCtrl } = require('./controllers');

const router = Router();


router.get('/membertree/:familyId', getTreeCtrl);
router.get('/members/:primaryId', getMemberByIdCtrl);
router.get('/families/:userId', getFamiliesCtrl);

router.post('/create/:userId', createMemberCtrl);
router.post('/create/child/:primaryId/:userId', createChildCtrl);
router.post('/create/parent/:primaryId/:userId', createParentCtrl);
router.post('/add/:parentId/:childId', addConnectionCtrl);

router.put('/edit/:primaryId', editMemberCtrl);

router.delete('/delete/:primaryId', deleteMemberByIdCtrl);


// delete family if no members??
router.delete('/delete/:primaryId/:familyId', deleteFamilyCtrl);

module.exports = router;