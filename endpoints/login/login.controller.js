const crypto = require('crypto');
const jwtAuth = require('../../jwtAuth/jwtAuth');
const env = require('../../db/env');
const { auth } = require('../../db/models');
const { user } = require('../../db/models');
const { message } = require('../../db/models');
const { chat } = require('../../db/models');
const { post } = require('../../db/models');
const { club } = require('../../db/models');

class LoginController {
    async logIn(req, res) {
        try {
            // Берем из запроса body, который сформировало клиентское приложение
            const { email, password } = req.body;
            console.log(`начинаем попытку входа пользователя с почтой ${email}`);

            // Хэшируем пароль
            let hashedPassword = crypto.pbkdf2Sync(password, env.secret, env.iterations, env.keyLength, env.algorithm).toString(env.encoding);

            // Находим пользователя по его email и паролю
            console.log('Finding user based on credentials');
            let authRes = await auth.findOne({
                where: {
                    email: email,
                    password: hashedPassword
                },
                include: [{
                    model: user,
                    as: 'user'
                }]
            });

            // Подписываем токен
            let token = jwtAuth.sign({ id: authRes.user.id, username: authRes.user.username });

            // Строи объект ответа клиенту
            let response = { userData: authRes.user, token: token };

            console.log(`отправляем полученные данные обратно клиенту`);
            res.status(200).json(response);
        } catch (err) {
            // Произошла ошибка, сообщаем об этом
            console.log(`произошла ошибка во время входа: ${err}`);
            res.status(500).send(`произошла ошибка во время входа: ${err}`);
        }
    }
}

module.exports = new LoginController();