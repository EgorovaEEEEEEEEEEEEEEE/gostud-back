const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('../db/env');

class JwtAuth {
	auth(req, res, next) {
		// Проверяем наличие токена
		if (!req.headers.authorization) {
			return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
		}
	
		// Получаем токен
		let token = req.headers.authorization.split(' ')[1];
		if (token === null) {
			return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
		}
	
		// Подтверждаем токен
		let payload = jwt.verify(token, env.secret);
		if (!payload) {
			return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized request');
		}
	
		// Добавляем к запросу расшифрованные данные запрашивающего
		req.payload = payload;
	
		next();
	}

	sign(toSign) {
		const token = jwt.sign(toSign, env.secret);
		return token;
	}
}
module.exports = new JwtAuth();