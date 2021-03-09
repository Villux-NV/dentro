const { Member, Family, User } = require('./member.model')

const getTree = async (familyNameId) => {
  try {
    let members = await Member.findAll({
      where: {
        FamilyId: familyNameId
      },
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

const getFamilies = async (userId) => {
  try {
    const user = await User.findOne({ where: { uid: userId } });
    const families = await Family.findAll({
      where: { UserId: user.id }
    })
    return families;
  } catch (err) {
    console.log(`Error Get Families: ${err}`);
    return { error: 'DB Connection: Get Families'};
  }
};

const createMember = async ({
  firstName,
  lastName,
  birthday,
  userId,
  familyId,
}) => {
  try {
    // not needed for creating members in tree, will need for auth
    // let member = await Member.findOne({ where: { firstName } });
    // if (member) return false;
    let family;
    let user = await User.findOne({ where: { uid: userId } });
    
    if (familyId) {
      family = await Family.findOne({ where: { id: familyId } });
    } else {
      family = await Family.create({ familyName: lastName, UserId: user.id });
    }

    if (!user) {
      user = await User.create({ uid: userId });
    }

    
    const member = await Member.create({ firstName, lastName, birthday, FamilyId: family.id });

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

const editMember = async (memberId, firstName, lastName, birthday) => {
  try {
    const member = await Member.update({ firstName, lastName, birthday }, { where: { id: memberId } });
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
  getMemberById,
  getFamilies,
  createMember,
  createChild,
  createParent,
  createConnectionByIds,
  editMember,
  deleteMemberById,
};


// const getMembers = async () => {
//   try {
//     let members = await Member.findAll({
//       include: [{
//         model: Member,
//         as: 'Children',
//       },{
//         model: Member,
//         as: 'Parent'
//       }],
//       attributes: { exclude: ['password'] },
//     });
//     return members;
//   } catch (err) {
//     console.log(`Error Get Members: ${err}`);
//     return { error: 'DB Connection: Get Members'};
//   }
// };