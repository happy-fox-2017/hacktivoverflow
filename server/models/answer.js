'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Answer.associate = function (models) {
    Answer.belongsTo(models.User);
    Answer.belongsTo(models.Question);
  };

  return Answer;
};
