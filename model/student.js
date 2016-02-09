'use strict';
module.exports = function (sequelize, DataTypes) {
    console.log("hihiii");
    var oneofThem = sequelize.define(
        'oneofThem',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            rollnumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            firstName: {
                type: DataTypes.STRING,
                field: 'first_name',
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                field: 'last_name',
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            marks: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'teststudentnow',
            createdAt: false,
            updatedAt: false

        }
    );

    return oneofThem;
};