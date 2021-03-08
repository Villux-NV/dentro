const { DataTypes } = require('sequelize');
const db = require('.');

const Member = db.define('Member', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
  },
});

const User = db.define('User', {
  uid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const Family = db.define('Family', {
  familyName: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Member.belongsToMany(Member, { 
  as: 'Children', 
  through: 'MemberChildren'
});

Member.belongsToMany(Member, { 
  as: 'Parent', 
  through: 'MemberParent'
});

User.hasMany(Member);
Member.belongsTo(User);

Family.hasMany(Member);
Member.belongsTo(Family);

module.exports = {
  Member,
  User,
  Family,
};

// const testCreation = async () => {
//   await db.sync({force: true});

//   const testFather = await Member.create({
//     firstName: 'Hector',
//   });

//   const testSon = await Member.create({
//     firstName: 'Nicky'
//   });

//   const testSon2 = await Member.create({
//     firstName: 'Logan'
//   })

//   const testGpa = await Member.create({
//     firstName: 'Eddie'
//   })

//   await testFather.addChildren(testSon);
//   await testFather.addChildren(testSon2);
//   await testGpa.addChildren(testFather);

//   const users = await Member.findAll({
//     include: [{
//       model: Member,
//       as: 'Children'
//     }]
//   });

//   users.forEach(user => console.log(user.toJSON()));
// }  
// testCreation();