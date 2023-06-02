const crypto = require('crypto');
const env = require('../../db/env');
const { auth } = require('../../db/models');
const { user } = require('../../db/models');
const { message } = require('../../db/models');
const { chat } = require('../../db/models');
const { club } = require('../../db/models');

class ChatController {
	async getChat(req, res) {
		try {
			const chatid = req.params.chatid;
			let chatFound = await chat.findOne({
				where: {
					id: chatid
				},
				include: [{
					model: user,
					as: 'clubMembers'
				},
				{
					model: message,
					as: 'messages',
					include: {
						model: user,
						as: 'sender'
					}
				}
			]
			});
			res.status(200).json(chatFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async updateChat(req, res) {
		try {
			const chatid = req.params.chatid;
			let chatFound = await chat.findOne({
				where: {
					id: chatid
				},
				include: [{
					model: user,
					as: 'clubMembers'
				},
				{
					model: message,
					as: 'messages',
					include: {
						model: user,
						as: 'sender'
					}
				}
			]
			});

			chatFound.name = req.body.chatName;

			await chatFound.save();

			res.status(200).json(chatFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async deleteChat(req, res) {
		try {
			const chatid = req.params.chatid;
			let chatFound = await chat.findOne({
				where: {
					id: chatid
				}
			});

			await chatFound.destroy();

			res.status(200).send(0);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async createMessage(req, res) {
		try {
			const { content, sentAt } = req.body;
			const chatid = req.params.chatid;
			const senderid = req.clientPayload.id;

			let messageRes = await message.create({
				content: content,
				sentAt: sentAt,
				senderId: senderid,
				chatid: chatid
			})

			res.status(200).json(messageRes);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async updateMessage(req, res) {
		try {
			const { content } = req.body;
			const messageId = req.clientPayload.messageId;

			let messageFound = await message.findOne({
				where: {
					id: messageId
				}
			})

			messageFound.content = content;
			await messageFound.save();

			res.status(200).json(messageFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async deleteMessage(req, res) {
		try {
			const messageId = req.clientPayload.messageId;

			let messageFound = await message.findOne({
				where: {
					id: messageId
				}
			})

			await messageFound.destroy();

			res.status(200).send();
		} catch (err) {
			res.status(500).send(err);
		}
	}
}

module.exports = new ChatController();