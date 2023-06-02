module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('user', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		uniName: {
			type: DataTypes.STRING,
			allowNull: true
		},
	}, {
		timestamps: false
	});

	return user;
}