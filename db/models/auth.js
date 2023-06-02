module.exports = (sequelize, DataTypes) => {
	const auth = sequelize.define('auth', {
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				is: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,30}/i
			}
		}
	}, {
		timestamps: false,
		tableName: 'auth'
	});

	return auth;
}