const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Videogame",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://blog.ida.cl/wp-content/uploads/sites/5/2020/05/ida-uxvideojuegos-blog-1024x735.png",
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      released: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          max: 5,
        },
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
