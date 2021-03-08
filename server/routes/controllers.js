const { default: validator } = require('validator');
const { getTree, getMembers, getMemberById, createMember, createChild, createParent, createConnectionByIds, editMember, deleteMemberById } = require('../models/crud');

exports.getTreeCtrl = async (req, res) => {
  try {
    const members = await getTree();
    if (members === false) return res.status(400).send(false);
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Tree', status: 500 });
  }
}

exports.getMembersCtrl = async (req, res) => {
  try {
    const members = await getMembers();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Get', status: 500 });
  }
};

exports.getMemberByIdCtrl = async (req, res) => {
  const { primaryId } = req.params;

  try {
    const member = await getMemberById(primaryId);
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl GetById', status: 500 });
  }
};

exports.createMemberCtrl = async (req, res) => {
  // password, birthday
  const { firstName, lastName, email } = req.body;

  // if (!firstName || !lastName || !email || !birthday) return res.status(400).json({ error: 'Bad request', status: 400});
  // if (!validator.isEmail(email)) return res.status(400).json({ error: 'Bad request. Invalid email.', status: 400 });

  try {
    const member = await createMember({
      firstName,
      lastName,
      // email,
      // password,
      // birthday,
    });

    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Create', status: 500 });
  }
};

exports.createChildCtrl = async (req, res) => {
  // email, password, birthday
  const { firstName, lastName } = req.body;
  const { primaryId } = req.params;

  try {
    const member = await createMember({
      firstName,
      lastName,
      // email,
      // password,
      // birthday
    });
    const child = await createChild(primaryId, member);
    res.status(200).json(child);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Child', status: 500 });
  }
};

exports.createParentCtrl = async (req, res) => {
  const { firstName, lastName } = req.body;
  const { primaryId } = req.params;

  try {
    const member = await createMember({
      firstName,
      lastName,
    });
    const parent = await createParent(primaryId, member);
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Parent', status: 500 });
  }
};

exports.addConnectionCtrl = async (req, res) => {
  const { parentId, childId } = req.params;
  
  try {
    const memberAdd = await createConnectionByIds(parentId, childId);
    res.status(200).json(memberAdd);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Connection', status: 500 });
  }
};

exports.editMemberCtrl = async (req, res) => {
  const { firstName, lastName } = req.body;
  const { primaryId } = req.params;

  try {
    const member = await editMember(primaryId, firstName, lastName);
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Edit', status: 500 });
  }
};

exports.deleteMemberByIdCtrl = async (req, res) => {
  const { primaryId } = req.params;

  try {
    const deletedMember = await deleteMemberById(primaryId);
    res.status(200).json(deletedMember);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Delete', status: 500 });
  }
};