module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("products", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detail: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.BOOLEAN
        }
    
    })

    return Product

}