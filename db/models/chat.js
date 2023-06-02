module.exports = (sequelize, DataTypes) => {
	const chat = sequelize.define('chat', {
		name: {
			type: DataTypes.STRING,
		}
	}, {
		timestamps: false
	});

	return chat;
}