'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Question.associate = function (models) {
    Question.belongsTo(models.User);
    Question.hasMany(models.Answer);
    Question.hasMany(models.Vote);
  };
  return Question;
};
