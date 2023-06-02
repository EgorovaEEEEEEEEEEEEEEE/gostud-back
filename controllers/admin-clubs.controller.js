const crypto = require('crypto');
const env = require('../db/env');
const { auth } = require('../db/models');
const { user } = require('../db/models');
const { message } = require('../db/models');
const { chat } = require('../db/models');
const { club } = require('../db/models');

class ClubAdminController {
	async getClubs(req, res) {
		try {
			const username = req.params.username;
			console.log(`начинаем попытку получения клубов, которые администрируются пользователем: ${username}`);

			// Находим админа
			console.log(`находим админа`);
			let userFound = await user.findOne({
				where: {
					username: username
				},
				include: [{
					model: club,
					as: 'adminClubs'
				}]
			});

			// Отправляем объект клубов в ответ
			console.log(`успешно получили клубы`);
			res.status(200).json(userFound.adminClubs);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения клубов: ${err}`);
			res.status(500).send(`произошла ошибка во время получения клубов: ${err}`);
		}
	}

	async getClub(req, res) {
		try {
			const username = req.params.username;
			const clubHandle = req.params.clubhandle;
			console.log(`начинаем попытку получения клуба`);

			// Находим клуб
			console.log(`находим клуб`);
			let clubFound = await club.findOne({
				where: {
					handle: clubHandle
				},
				include: [{
					model: user,
					as: 'clubAdmin',
					where: {
						username: username
					}
				}]
			});

			// Отправляем объект клуба в ответ
			console.log(`успешно получили клуб`);
			res.status(200).json(clubFound);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения клуба: ${err}`);
			res.status(500).send(`произошла ошибка во время получения клуба: ${err}`);
		}
	}

	async createClub(req, res) {
		try {
			const adminName = req.params.username;
			const { handle, name, description } = req.body;
			console.log(`начинаем попытку добавления клуба`);

			// Находим пользователя, который создает клуб
			console.log('находим админа');
			let admin = await user.findOne({
				where: {
					username: adminName
				}
			});

			// Создаем клуб в базе данных
			console.log('создаем клуб в базе данных');
			let clubCreateRes = await admin.createAdminClub({
				handle: handle,
				name: name,
				description: description,
				adminId: admin.id
			})

			// Отправляем объект клуба в ответ
			console.log(`успешно создали клуб`);
			res.status(200).json(clubCreateRes);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время создания клуба: ${err}`);
			res.status(500).send(`произошла ошибка во время создания клуба: ${err}`);
		}
	}

	async updateClub(req, res) {
		try {
			const adminName = req.params.username;
			const clubHandle = req.params.clubhandle;
			const { handle, name, description } = req.body;
			console.log(`начинаем попытку обновления клуба`);

			// Находим пользователя-админа
			console.log('находим админа');
			let admin = await user.findOne({
				where: {
					username: adminName
				},
				include: [{
					model: club,
					as: 'adminClubs',
					where: {
						handle: clubHandle
					}
				}]
			});

			// Обновляем данные
			if (handle !== null && admin.adminClubs[0].handle != handle) {
				admin.adminClubs[0].handle = handle;
			}
			if (name !== null && admin.adminClubs[0].name != name) {
				admin.adminClubs[0].name = name;
			}
			if (description !== null && admin.adminClubs[0].description != description) {
				admin.adminClubs[0].description = description;
			}
			await admin.adminClubs[0].save();

			// Отправляем объект клуба в ответ
			console.log(`успешно обновили клуб`);
			res.status(200).json(admin.adminClubs[0]);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время обновления клуба: ${err}`);
			res.status(500).send(`произошла ошибка во время обновления клуба: ${err}`);
		}
	}

	async deleteClub(req, res) {
		try {
			const adminName = req.params.username;
			const clubHandle = req.params.clubhandle;
			console.log(`начинаем попытку удаления клуба`);

			// Находим пользователя-админа
			console.log('находим админа');
			let admin = await user.findOne({
				where: {
					username: adminName
				},
				include: [{
					model: club,
					as: 'adminClubs',
					where: {
						handle: clubHandle
					}
				}]
			});

			// Удаляем клуб
			await admin.adminClubs[0].destroy();

			// Отправляем код "успешно"
			console.log(`успешно обновили клуб`);
			res.status(200).send();
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время удаления клуба: ${err}`);
			res.status(500).send(`произошла ошибка во время удаления клуба: ${err}`);
		}
	}
}

module.exports = new ClubAdminController();