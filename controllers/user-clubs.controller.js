const crypto = require('crypto');
const env = require('../db/env');
const { auth } = require('../db/models');
const { user } = require('../db/models');
const { message } = require('../db/models');
const { chat } = require('../db/models');
const { club } = require('../db/models');

class UserClubsController {
	async getClubs(req, res) {
		try {
			const username = req.params.username;

			// Находим пользователя
			console.log(`находим пользователя и клубы`);
			let userFound = await user.findOne({
				where: {
					username: username
				},
				include: [{
					model: club,
					as: 'userClubs',
					include: {
						model: message,
						as: 'messages',
						include: {
							model: user,
							as: 'sender'
						}
					}
				}]
			})

			// Отправляем объект клубов в ответ
			console.log(`успешно получили клубы, на которые подписан пользователь`);
			res.status(200).json(userFound);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения клубов: ${err}`);
			res.status(500).send(`произошла ошибка во время получения клубов: ${err}`);
		}
	}

	async getClub(req, res) {
		try {
			const userName = req.params.username;
			const clubHandle = req.params.clubhandle;
			console.log(`начинаем попытку получения клуба`);

			// Находим клуб
			console.log(`находим клуб`);
			let clubFound = await user.findOne({
				where: {
					username: userName
				},
				include: [{
					model: club,
					as: 'userClubs',
					where: {
						handle: clubHandle
					},
					include: {
						model: message,
						as: 'messages',
						include: {
							model: user,
							as: 'sender'
						}
					}
				}]
			});

			// Отправляем объект клуба в ответ
			console.log(`успешно получили клуб`);
			res.status(200).json(clubFound.userClubs);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения клуба: ${err}`);
			res.status(500).send(`произошла ошибка во время получения клуба: ${err}`);
		}
	}

	async subToClub(req, res) {
		try {
			const username = req.params.username;
			const clubHandle = req.params.clubhandle;

			// Находим пользователя
			console.log(`находим пользователя`);
			let userFound = await user.findOne({
				where: {
					username: username
				}
			});

			// Находим клуб, на который хочет подписаться пользователь
			console.log(`находим клуб`);
			let clubFound = await club.findOne({
				where: {
					handle: clubHandle
				}
			});

			// Подписываем пользователя в клуб
			console.log(`подписываем пользователя в клуб`);
			await clubFound.addClubMember(userFound);

			// Отправляем код успеха в ответ
			console.log(`успешно подписали пользователя в клуб`);
			res.status(200).send();
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время подписки в клуб: ${err}`);
			res.status(500).send(`произошла ошибка во время подписки в клуб: ${err}`);
		}
	}

	async unsubFromClub(req, res) {
		try {
			const username = req.params.username;
			const clubHandle = req.params.clubhandle;

			// Находим пользователя
			console.log(`находим пользователя`);
			let userFound = await user.findOne({
				where: {
					username: username
				}
			});

			// Находим клуб, на который хочет подписаться пользователь
			console.log(`находим клуб`);
			let clubFound = await club.findOne({
				where: {
					handle: clubHandle
				}
			});

			// Отписываем пользователя от клуба
			console.log(`отписываем пользователя от клуба`);
			clubFound.removeClubMember(userFound);

			// Отправляем код успеха в ответ
			console.log(`успешно отписали пользователя от клуба`);
			res.status(200).send();
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время отписывания от клуба: ${err}`);
			res.status(500).send(`произошла ошибка во время отписывания от клуба: ${err}`);
		}
	}
}

module.exports = new UserClubsController();