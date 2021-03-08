const { Member } = require('./member.model')

const getTree = async () => {
  try {
    let members = await Member.findAll({
      include: [{
        model: Member,
        as: 'Parent'
      },{
        model: Member,
        as: 'Children',
      }],
    });

    if (members.length === 0) {
      return false;
    }

    const rootFilter = members.map(doc => doc.toJSON()).filter(member => {
      return member.Parent.length === 0;
    })

    // need to refactor when parent is added to root
    //.Children.length === 0 ? rootFilter[1] : rootFilter[0]
    return await recursiveFind(rootFilter[0]);
  } catch (err) {
    console.log(`Error Get Tree: ${err}`);
    return { error: 'DB Connection: Get Tree'};
  }
};

const recursiveFind = async (member) => {
  if (!member.Children?.length) return member;

  const allMembers = member.Children?.map(async child => {
    const id = child.id;
    const memberFound = await getMemberById(id);
    return await recursiveFind(memberFound);
  });

  return { ...member, Children: await Promise.all(allMembers) };
};

const getMembers = async () => {
  try {
    let members = await Member.findAll({
      include: [{
        model: Member,
        as: 'Children',
      },{
        model: Member,
        as: 'Parent'
      }],
      attributes: { exclude: ['password'] },
    });
    return members;
  } catch (err) {
    console.log(`Error Get Members: ${err}`);
    return { error: 'DB Connection: Get Members'};
  }
};

const getMemberById = async (primaryId) => {
  try {
    let member = await Member.findOne({
      where: { id: primaryId },
      include: [{
        model: Member,
        as: 'Children'
      }]
    });
    return member.toJSON();
  } catch (err) {
    console.log(`Error Get Member by Id: ${err}`);
    return { error: 'DB Connection: Get Member by Id'}
  }
};

const createMember = async ({
  firstName,
  lastName,
  // email,
  // password,
  // birthday,
}) => {
  try {
    // not needed for creating members in tree, will need for auth
    // let member = await Member.findOne({ where: { firstName } });
    // if (member) return false;
    
    // email, password, birthday
    member = await Member.create({ firstName, lastName });

    return member;
  } catch (err) {
    console.log(`Error Create Member: ${err}`);
    return { error: 'DB Connection: Create Member'};
  }
};

const createChild = async (parentId, child) => {
  try {
    const memberParent = await Member.findOne({ where: { id: parentId } });

    await child.addParent(memberParent);
    await memberParent.addChildren(child);

    return child;
  } catch (err) {
    console.log(`Error Create Child: ${err}`);
    return { error: 'DB Connection: Create Child'};
  }
};

const createParent = async (childId, parent) => {
  try {
    const memberChild = await Member.findOne({ where: { id: childId } });

    await memberChild.addParent(parent);
    await parent.addChildren(memberChild);

    return parent;
  } catch (err) {
    console.log(`Error Create Parent: ${err}`);
    return { error: 'DB Connection: Create Parent'};
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
    console.log(`Error Create Connection: ${err}`);
    return { error: 'DB Connection: Create Connection'};
  }
};

const editMember = async (memberId, firstName, lastName) => {
  try {
    const member = await Member.update({ firstName, lastName}, { where: { id: memberId } });
    return member;
  } catch (err) {
    console.log(`Error Edit Member: ${err}`);
    return { error: 'DB Connection: Edit Member'};
  }
};

const deleteMemberById = async (memberId) => {
  try {
    const deletedMember = await Member.destroy({ where: { id: memberId } });
    return deletedMember;
  } catch (err) {
    console.log(`Error Delete Member: ${err}`);
    return { error: 'DB Connection: Delete Member'};
  }
};

module.exports = {
  getTree,
  getMembers,
  getMemberById,
  createMember,
  createChild,
  createParent,
  createConnectionByIds,
  editMember,
  deleteMemberById,
};