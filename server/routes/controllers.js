const { default: validator } = require('validator');
const { createMember, getMembers } = require('../models/crud');

exports.createMemberCtrl = async (req, res) => {
  const { firstName, lastName, email, password, birthday } = req.body;
  if (!firstName || !lastName || !email || !birthday) return res.status(400).json({ error: 'Bad request', status: 400});
  if (!validator.isEmail(email)) return res.status(400).json({ error: 'Bad request. Invalid email.', status: 400 });

  try {
    const member = await createMember({
      firstName,
      lastName,
      email,
      password,
      birthday
    });

    // if (!member) return res.status(409).json({ error: 'Conflict', status: 409});
    // if (member.error) throw new Error();

    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Create', status: 500 });
  }
};

exports.getMembersCtrl = async (req, res) => {
  try {
    const members = await getMembers();

    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: 'Error Ctrl Get', status: 500 });
  }
};