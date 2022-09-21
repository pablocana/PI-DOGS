const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('temperament', {
    //no defindo el ID porque lo va a hacer solo.
    // ver si tengo que definir array y despues string (como 3tkla)
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false
  }
  );    
};
