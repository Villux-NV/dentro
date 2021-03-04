const Member = require('./member.model')

const createMember = async ({
  firstName,
  lastName,
  email,
  password,
  birthday
}) => {
  try {
    let member = await Member.findOne({ where: { email } });
    if (member) return false;
    
    member = await Member.create({ firstName, lastName, email, password, birthday });

    return member;
  } catch (err) {
    console.log(`Error creating Member: ${err}`);
    return { error: 'DB Connection Error'};
  }
}

const getMembers = async () => {
  try {
    let members = await Member.findAll({
      attributes: { exclude: ['password'] },
    });

    return members;
  } catch (err) {
    console.log(`Error creating Member: ${err}`);
    return { error: 'DB Connection Error'};
  }
}

module.exports = {
  createMember,
  getMembers,
};