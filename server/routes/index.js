const { Router } = require('express');
const { getTreeCtrl, getMemberByIdCtrl, getFamiliesCtrl, createMemberCtrl, createChildCtrl, createParentCtrl, addConnectionCtrl, addImageCtrl, editMemberCtrl, deleteMemberByIdCtrl, deleteFamilyCtrl } = require('./controllers');

const router = Router();


router.get('/membertree/:familyId', getTreeCtrl);
router.get('/members/:primaryId', getMemberByIdCtrl);
router.get('/families/:userId', getFamiliesCtrl);

router.post('/create/:userId', createMemberCtrl);
router.post('/create/child/:primaryId/:userId', createChildCtrl);
router.post('/create/parent/:primaryId/:userId', createParentCtrl);
router.post('/add/:parentId/:childId', addConnectionCtrl);
router.post('/image/:userId', addImageCtrl);

router.put('/edit/:primaryId', editMemberCtrl);

router.delete('/delete/:primaryId', deleteMemberByIdCtrl);
router.delete('/delete/:primaryId/:familyId', deleteFamilyCtrl);

module.exports = router;