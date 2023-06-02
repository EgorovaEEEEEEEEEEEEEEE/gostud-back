const crypto = require('crypto');
const env = require('../../db/env');
const { auth } = require('../../db/models');
const { user } = require('../../db/models');
const { message } = require('../../db/models');
const { chat } = require('../../db/models');
const { club } = require('../../db/models');

class ClubsController {
	async getClubs(req, res) {
		try {
			console.log(`начинаем попытку получения клубов`);

			// Находим админа
			console.log(`находим клубы`);
			let clubsFound = await club.findAll({
				include: [{
					model: user,
					as: 'clubAdmin'
				},
				{
					model: user,
					as: 'clubMembers'
				},
				{
					model: message,
					as: 'messages'
				}
			]
			});

			// Отправляем объект клубов в ответ
			console.log(`успешно получили клубы`);
			res.status(200).json(clubsFound);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения клубов: ${err}`);
			res.status(500).send(`произошла ошибка во время получения клубов: ${err}`);
		}
	}

	async getClub(req, res) {
		try {
			const clubhandle = req.params.clubhandle;
			console.log(`начинаем попытку получения клуба`);

			// Находим админа
			console.log(`находим клуб`);
			let clubsFound = await club.findOne({
				where: {
					handle: clubhandle
				},
				include: [{
					model: user,
					as: 'clubAdmin'
				},
				{
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

			// Отправляем объект клубов в ответ
			console.log(`успешно получили клубы`);
			res.status(200).json(clubsFound);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения клубов: ${err}`);
			res.status(500).send(`произошла ошибка во время получения клубов: ${err}`);
		}
	}
}

module.exports = new ClubsController();