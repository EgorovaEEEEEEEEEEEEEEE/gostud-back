module.exports = (sequelize, DataTypes) => {
	const message = sequelize.define('message', {
		content: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sentAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		timestamps: false
	});

	return message;
}