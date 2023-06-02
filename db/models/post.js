module.exports = (sequelize, DataTypes) => {
	const post = sequelize.define('post', {
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		}
	}, {
		timestamps: false
	});

	return post;
}