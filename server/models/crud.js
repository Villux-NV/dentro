const { Member } = require('./member.model')

const getMembers = async () => {
  try {
    let members = await Member.findAll({
      include: [{
        model: Member,
        as: 'Children'
      },{
        model: Member,
        as: 'Parent'
      }],
      attributes: { exclude: ['password'] },
    });

    return members;
  } catch (err) {
    console.log(`Error get member: ${err}`);
    return { error: 'DB Connection: get member'};
  }
};

const getMemberById = async (primaryId) => {
  try {
    let member = await Member.findOne({
      where: { id: primaryId },
      include: [{
        model: Member,
        as: 'Children'
      },{
        model: Member,
        as: 'Parent'
      }]
    });

    return member;
  } catch (err) {
    console.log(`Error get member by id: ${err}`);
    return { error: 'DB Connection: get member by id'}
  }
}

const createMember = async ({
  firstName,
  lastName,
  email,
  password,
  birthday,
}) => {
  try {
    let member = await Member.findOne({ where: { firstName } });
    if (member) return false;
    
    member = await Member.create({ firstName, lastName, email, password, birthday });

    return member;
  } catch (err) {
    console.log(`Error creating Member: ${err}`);
    return { error: 'DB Connection: create member'};
  }
};

const createChild = async (parent, child) => {
  try {
    const memberParent = await Member.findOne({ where: { id: parent } });
    await child.addParent(parent);

    const memberChild = await memberParent.addChildren(child);

    return memberChild;
  } catch (err) {
    console.log(`Error creating child: ${err}`);
    return { error: 'DB Connection: create child'};
  }
};

const createConnectionByIds = async (parent, child) => {
  try {
    const memberParent = await Member.findOne({ where: { id: parent } });
    const memberChild = await Member.findOne({ where: { id: child } });

    const memberAdd = await memberParent.addChildren(memberChild);
    await memberChild.addParent(memberParent);

    return memberAdd;
  } catch (err) {
    console.log(`Error creating child add: ${err}`);
    return { error: 'DB Connection: create child add'};
  }
}

module.exports = {
  getMembers,
  getMemberById,
  createMember,
  createChild,
  createConnectionByIds,
};