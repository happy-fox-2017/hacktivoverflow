'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Vote.associate = function (models) {
    Vote.belongsTo(models.User);
    Vote.belongsTo(models.Question);
  };

  return Vote;
};