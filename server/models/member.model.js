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
    type: DataTypes.DATEONLY,
  },
  image: {
    type: DataTypes.STRING,
  }
});

const User = db.define('User', {
  uid: {
    type: DataTypes.STRING,
  },
});

const Family = db.define('Family', {
  familyName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Member.belongsToMany(Member, { 
  as: 'Children', 
  through: 'MemberChildren',
});

Member.belongsToMany(Member, { 
  as: 'Parent', 
  through: 'MemberParent',
});

User.hasMany(Family);
Family.belongsTo(User);

Family.hasMany(Member);
Member.belongsTo(Family);

module.exports = {
  Member,
  User,
  Family,
};