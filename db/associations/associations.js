const { auth } = require('../models');
const { user } = require('../models');
const { message } = require('../models');
const { chat } = require('../models');
const { post } = require('../models');
const { club } = require('../models');

// Auth

authUserAssociate = () => {
	let authUserFKOptions = {
		name: 'authId',
		onDelete: 'CASCADE',
		allowNull: false
	};
	auth.hasOne(user, { foreignKey: authUserFKOptions, as: 'user' });
	user.belongsTo(auth, { foreignKey: authUserFKOptions, as: 'auth' });
}

// Messages and chats

messageSenderAssociate = () => {
	let userMessagesFKOptions = {
		name: 'senderId',
		onDelete: 'CASCADE',
		allowNull: false
	};
	user.hasMany(message, { foreignKey: userMessagesFKOptions, as: 'messages' });
	message.belongsTo(user, { foreignKey: userMessagesFKOptions, as: 'sender' });
}

chatMessagesAssociate = () => {
	let chatMessagesFKOptions = {
		name: 'chatId',
		onDelete: 'CASCADE',
		allowNull: false
	};
	chat.hasMany(message, { foreignKey: chatMessagesFKOptions, as: 'messages' });
	message.belongsTo(chat, { foreignKey: chatMessagesFKOptions, as: 'chat' });
}

clubChatsAssociate = () => {
	let clubChatsFKOptions = {
		name: 'clubId',
		onDelete: 'CASCADE',
		allowNull: true
	};
	club.hasMany(chat, { foreignKey: clubChatsFKOptions, as: 'chats' });
	chat.belongsTo(club, { foreignKey: clubChatsFKOptions, as: 'club' });
}

chatAdminAssociate = () => {
	let clubChatsFKOptions = {
		name: 'adminId',
		onDelete: 'CASCADE',
		allowNull: false
	};
	user.hasMany(chat, { foreignKey: clubChatsFKOptions, as: 'adminChats' });
	chat.belongsTo(user, { foreignKey: clubChatsFKOptions, as: 'chatAdmin' });
}

usersChatsAssociate = () => {
	user.belongsToMany(chat, { through: 'chat_user', as: 'userChats' });
	chat.belongsToMany(user, { through: 'chat_user', as: 'chatMembers' });
}

// Posts

clubPostsAssociate = () => {
	let clubPostsFKOptions = {
		name: 'clubId',
		onDelete: 'CASCADE',
		allowNull: false
	};
	club.hasMany(post, { foreignKey: clubPostsFKOptions, as: 'posts' });
	post.belongsTo(club, { foreignKey: clubPostsFKOptions, as: 'club' });
}

// Clubs and users

userClubAdminAssociate = () => {
	let clubAdminFKOptions = {
		name: 'adminId',
		onDelete: 'CASCADE',
		allowNull: false
	}
	user.hasMany(club, { foreignKey: clubAdminFKOptions, as: 'adminClubs' })
	club.belongsTo(user, { foreignKey: clubAdminFKOptions, as: 'clubAdmin' });
}

usersClubsMemberAssociate = () => {
	user.belongsToMany(club, { through: 'club_user', as: 'userClubs' });
	club.belongsToMany(user, { through: 'club_user', as: 'clubMembers' });
}

module.exports = function () {
	authUserAssociate();

	messageSenderAssociate();
	chatMessagesAssociate();
	clubChatsAssociate();
	chatAdminAssociate();
	usersChatsAssociate();

	clubPostsAssociate();

	userClubAdminAssociate();
	usersClubsMemberAssociate();
};
