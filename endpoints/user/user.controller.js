const express = require('express');
const crypto = require('crypto');
const env = require('../../db/env');
const { auth } = require('../../db/models');
const { user } = require('../../db/models');
const { message } = require('../../db/models');
const { post } = require('../../db/models');
const { chat } = require('../../db/models');
const { club } = require('../../db/models');

class UserController {
	async getUser(req, res) {
		try {
			const username = req.params.username;

			// Ищем пользователя по имени
			console.log(`ищем пользователя '${username}'`);
			let userData = await user.findOne({
				where: {
					username: username,
				}
			});

			// Отправляем объект пользователя в ответ
			console.log('успешно получили данные пользователя');
			res.status(200).json(userData);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время получения данных пользователя: ${err}`);
			res.status(500).send(`произошла ошибка во время получения данных пользователя: ${err}`);
		}
	}

	async updateUser(req, res) {
		try {
			const reqUsername = req.params.username;
			const { username, firstName, lastName, uniName } = req.body;

			// Ищем пользователя по имени
			console.log(`ищем пользователя '${reqUsername}'`);
			let userData = await user.findOne({
				where: {
					username: reqUsername,
				}
			});

			// Update instance name and save
			userData.username = username;
			userData.firstName = firstName;
			userData.lastName = lastName;
			userData.uniName = uniName;
			await userData.save();

			// Отправляем объект пользователя в ответ
			console.log('успешно обновили данные пользователя');
			res.status(200).json(userData);
		} catch (err) {
			// Произошла ошибка, сообщаем об этом
			console.log(`произошла ошибка во время обновления данных пользователя: ${err}`);
			res.status(500).send(`произошла ошибка во время обновления данных пользователя: ${err}`);
		}
	}

	async deleteUser(req, res) {
		try {
			const reqUsername = req.params.username;
			console.log(`попытка удалить пользователя '${reqUsername}'`);

			// Находим пользователя по имени
			console.log('находим пользователя');
			let userData = await user.findOne({
				where: {
					username: reqUsername,
				}
			});

			// Удаляем пользователя
			await userData.destroy();

			// В ответ отправляем успешный ответ
			console.log('успешно удалили пользователя');
			res.status(200).send();
		} catch (err) {
			// Send unknown error response
			console.log(`произошла ошибка во время удаления данных пользователя: ${err}`);
			res.status(500).send(`произошла ошибка во время удаления данных пользователя: ${err}`);
		}
	}

	async getUserClubs(req, res) {
		try {
			const reqUsername = req.params.username;

			// Находим пользователя по имени
			let userData = await user.findOne({
				where: {
					username: reqUsername,
				},
				include: [{
					model: club,
					as: 'userClubs'
				}]
			});

			// В ответ отправляем успешный ответ
			res.status(200).json(userData.clubs);
		} catch (err) {
			// Send unknown error response
			res.status(500).send(err);
		}
	}

	async getUserChats(req, res) {
		try {
			const reqUsername = req.params.username;

			// Находим пользователя по имени
			let userData = await user.findOne({
				where: {
					username: reqUsername,
				},
				include: [{
					model: chat,
					as: 'userChats'
				}]
			});

			// В ответ отправляем успешный ответ
			res.status(200).json(userData.chats);
		} catch (err) {
			// Send unknown error response
			res.status(500).send(err);
		}
	}

	async subClub(req, res) {
		try {
			const reqUsername = req.params.username;
			const clubhandle = req.params.clubhandle;

			let userData = await user.findOne({
				where: {
					username: reqUsername,
				}
			});

			let clubData = await user.findOne({
				where: {
					handle: clubhandle,
				}
			});

			await userData.addUserClub(clubData);

			res.status(200).json(userData.chats);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async unsubClub(req, res) {
		try {
			const reqUsername = req.params.username;
			const clubhandle = req.params.clubhandle;

			let userData = await user.findOne({
				where: {
					username: reqUsername,
				}
			});

			let clubData = await club.findOne({
				where: {
					handle: clubhandle,
				}
			});

			await userData.removeUserClub(clubData);

			res.status(200).json(userData.chats);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async joinChat(req, res) {
		try {
			const reqUsername = req.params.username;
			const chatid = req.params.chatid;

			let userData = await user.findOne({
				where: {
					username: reqUsername,
				}
			});

			let chatData = await chat.findOne({
				where: {
					id: chatid,
				}
			});

			await userData.addUserChat(chatData);

			res.status(200).json(userData.chats);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async leaveChat(req, res) {
		try {
			const reqUsername = req.params.username;
			const chatid = req.params.chatid;

			let userData = await user.findOne({
				where: {
					username: reqUsername,
				}
			});

			let chatData = await chat.findOne({
				where: {
					id: chatid,
				}
			});

			await userData.removeUserChat(chatData);

			res.status(200).json(userData.chats);
		} catch (err) {
			res.status(500).send(err);
		}
	}
}

module.exports = new UserController();