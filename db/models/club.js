module.exports = (sequelize, DataTypes) => {
	const club = sequelize.define('club', {
		handle: {
			type: DataTypes.STRING,
			unique: true,
            allowNull: false
		},
		name: {
			type: DataTypes.STRING,
            allowNull: false
		},
		description: {
			type: DataTypes.STRING,
            allowNull: false
		},
	}, {
		timestamps: false
	});

	return club;
}