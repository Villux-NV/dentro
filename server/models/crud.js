const { Member, Family, User } = require('./member.model')

const getTree = async (familyId) => {
  try {
    let members = await Member.findAll({
      where: {
        FamilyId: familyId
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
      deleteFamily(familyId);
      return false;
    };

    const rootFilter = members.map(doc => doc.toJSON()).filter(member => {
      return member.Parent.length === 0;
    });

    return await recursiveFind(rootFilter[0]);
  } catch (err) {
    console.log(`Error Get Tree: ${err}`);
    return { error: 'DB Connection: Get Tree'};
  };
};

const recursiveFind = async (member) => {
  try {
    if (!member.Children?.length) return member;
    
    const allMembers = member.Children?.map(async child => {
      const id = child.id;
      const memberFound = await getMemberById(id);
      return await recursiveFind(memberFound);
    });
    
    return { ...member, Children: await Promise.all(allMembers) };
  } catch (err) {
    console.log(`Error Get Recursive: ${err}`);
    return { error: 'DB Connection: Get Recursive'};
  };
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
  };
};

const getOneMember = async (id) => {
  try {
    let member = await Member.findOne({ where: { id: id } });

    return member;
  } catch (err) {
    console.log(`Error Get One Member: ${err}`);
    return { error: 'DB Connection: Get One Member'}
  }
};

const getFamilies = async (userId) => {
  try {
    let user = await User.findOne({ where: { uid: userId } });

    if (!user) {
      user = await User.create({ uid: userId });
    };

    const families = await Family.findAll({
      where: { UserId: user.id }
    });

    if (families.length === 0) {
      return false;
    };

    return families;
  } catch (err) {
    console.log(`Error Get Families: ${err}`);
    return { error: 'DB Connection: Get Families'};
  };
};

const createMember = async ({
  firstName,
  lastName,
  birthday,
  userId,
  familyNameId,
}) => {
  try {
    let family;
    let user = await User.findOne({ where: { uid: userId }, raw: true });
    
    if (!user) {
      user = await User.create({ uid: userId }, { raw: true });
    };
    if (familyNameId) {
      family = await Family.findOne({ where: { id: familyNameId } });
    } else {
      family = await Family.create({ familyName: lastName, UserId: user.id });
    };

    const member = await Member.create({ firstName, lastName, birthday, FamilyId: family.id });

    return member;
  } catch (err) {
    console.log(`Error Create Member: ${err}`);
    return { error: 'DB Connection: Create Member'};
  };
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
  };
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
  };
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
  };
};

const addImage = async (url, id) => {
  try {
    const member = await Member.update({ image: url }, {
      where: { id: id }
    });

    return id;
  } catch (err) {
    console.log(`Error Add Image: ${err}`);
    return { error: 'DB Connection: Add Image'};
  }
};

const editMember = async (memberId, firstName, lastName, birthday) => {
  try {
    const member = await Member.update({ firstName, lastName, birthday }, { where: { id: memberId } });
    return memberId;
  } catch (err) {
    console.log(`Error Edit Member: ${err}`);
    return { error: 'DB Connection: Edit Member'};
  };
};

const deleteMemberById = async (memberId) => {
  try {
    const deletedMember = await Member.destroy({ where: { id: memberId } });
    return deletedMember;
  } catch (err) {
    console.log(`Error Delete Member: ${err}`);
    return { error: 'DB Connection: Delete Member'};
  };
};

const deleteFamily = async (familyId) => {
  try {
    const deletedFamily = await Family.destroy({ 
      where: {
        id: familyId
      } 
    });
    return deletedFamily;
  } catch (err) {
    console.log(`Error Delete Member: ${err}`);
    return { error: 'DB Connection: Delete Member'};
  };
};

module.exports = {
  getTree,
  getMemberById,
  getFamilies,
  getOneMember,
  createMember,
  createChild,
  createParent,
  createConnectionByIds,
  addImage,
  editMember,
  deleteMemberById,
  deleteFamily,
};
