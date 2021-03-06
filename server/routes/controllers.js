const { default: validator } = require('validator');
const { getTree, getMembers, getMemberById, createMember, createChild, createConnectionByIds } = require('../models/crud');

exports.getTreeCtrl = async (req, res) => {
  try {
    const members = await getTree();

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
  const member = await getMemberById(primaryId);

  res.status(200).json(member);
};

exports.getParentByChildIdCtrl = async (req, res) => {
  const { primaryId } = req.params;
  const member = await getMemberById(primaryId);

  res.status(200).json(member.Parent);
}

exports.getChildrenByParentIdCtrl = async (req, res) => {
  const { primaryId } = req.params;
  const member = await getMemberById(primaryId);

  res.status(200).json(member.Children);
};

exports.createMemberCtrl = async (req, res) => {
  const { firstName, lastName, email, password, birthday } = req.body;

  // if (!firstName || !lastName || !email || !birthday) return res.status(400).json({ error: 'Bad request', status: 400});
  // if (!validator.isEmail(email)) return res.status(400).json({ error: 'Bad request. Invalid email.', status: 400 });

  try {
    const member = await createMember({
      firstName,
      lastName,
      email,
      password,
      birthday,
    });

    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Create', status: 500 });
  }
};

exports.createChildrenCtrl = async (req, res) => {
  const { firstName, lastName, email, password, birthday } = req.body;
  const { primaryId } = req.params;

  try {
    const member = await createMember({
      firstName,
      lastName,
      email,
      password,
      birthday
    })

    await createChild(primaryId, member);

    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Child', status: 500 });
  }
};

exports.addConnectionCtrl = async (req, res) => {
  const { parentId, childId } = req.params;
  
  try {
    const memberAdd = await createConnectionByIds(parentId, childId);

    res.status(200).json(memberAdd);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Child Add', status: 500 });
  }

};