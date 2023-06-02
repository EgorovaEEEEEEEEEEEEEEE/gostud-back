const crypto = require('crypto');
const env = require('../db/env');
const { auth } = require('../db/models');
const { user } = require('../db/models');
const { message } = require('../db/models');
const { club } = require('../db/models');

class ClubChatController {
	async getMessages(req, res) {
		try {
			const username = req.params.username;
			const clubhandle = req.params.clubhandle;
			console.log(`начинаем попытку получения всех сообщений чата клуба: ${clubhandle}`);

			// Находим сообщения
			console.log(`находим сообщения`);
			let clubFound = await club.findOne({
				where: {
					handle: clubhandle
				},
				include: [{
					model: message,
					as: 'messages'
				}]
			})

			// Отправляем объект сообщений в ответ
			console.log(`успешно получили сообщения`);
			res.status(200).json(clubFound.messages);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения сообщений: ${err}`);
			res.status(500).send(`произошла ошибка во время получения сообщений: ${err}`);
		}
	}

	async createMessage(req, res) {
		try {
			const username = req.params.username;
			const clubhandle = req.params.clubhandle;
			const { content, sentAt } = req.body;
			
			// Начинаем попытку добавления сообщения
			console.log(`начинаем попытку добавления сообщения`);
			let userFound = await user.findOne({
				where: {
					username: username
				},
				include: [
					{
						model: club,
						as: 'userClubs',
						where: {
                            handle: clubhandle
                        }
					}
				]
			});

			// Создаем сообщение
			let messageCreated = await message.create({
				content: content,
				sentAt: sentAt,
				senderId: userFound.id,
				clubId: userFound.userClubs[0].id
			});

			// Отправляем объект сообщения в ответ
			console.log(`успешно создали сообщение`);
			res.status(200).json(messageCreated);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время создания сообщения: ${err}`);
			res.status(500).send(`произошла ошибка во время создания сообщения: ${err}`);
		}
	}

	async editMessage(req, res) {
		try {
			const username = req.params.username;
			const clubhandle = req.params.clubhandle;
			const messageid = req.params.messageid;
			const { content } = req.body;
			console.log(`начинаем попытку редактирования сообщения`);

			// Находим сообщение
			console.log('находим сообщение');
			let messageFound = await message.findOne({
				where: {
					id: messageid
				}
			});

			// Обновляем данные
			if (content !== null && messageFound.content != content) {
				messageFound.content = content;
				await messageFound.save();
			}

			// Отправляем объект сообщения в ответ
			console.log(`успешно редактировали сообщение`);
			res.status(200).json(messageFound);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время редактирования сообщения: ${err}`);
			res.status(500).send(`произошла ошибка во время редактирования сообщения: ${err}`);
		}
	}

	async deleteMessage(req, res) {
		try {
			const username = req.params.username;
			const clubhandle = req.params.clubhandle;
			const messageid = req.params.messageid;
			console.log(`начинаем попытку удаления сообщения`);

			// Находим сообщение
			console.log('находим сообщение');
			let messageFound = await message.findOne({
				where: {
					id: messageid
				}
			});

			// Удаляем сообщение
			await messageFound.destroy();

			// Отправляем код "успешно"
			console.log(`успешно удалили сообщение`);
			res.status(200).send();
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время удаления сообщения: ${err}`);
			res.status(500).send(`произошла ошибка во время удаления сообщения: ${err}`);
		}
	}
}

module.exports = new ClubChatController();