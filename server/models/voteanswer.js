'use strict';
module.exports = function(sequelize, DataTypes) {
  var VoteAnswer = sequelize.define('VoteAnswer', {
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  VoteAnswer.associate = function (models) {
    VoteAnswer.belongsTo(models.User);
    VoteAnswer.belongsTo(models.Answer);
  };

  return VoteAnswer;
};