const crypto = require('crypto');
const env = require('../../db/env');
const jwtAuth = require('../../jwtAuth/jwtAuth');
const { auth } = require('../../db/models');
const { user } = require('../../db/models');
const { message } = require('../../db/models');
const { chat } = require('../../db/models');
const { post } = require('../../db/models');
const { club } = require('../../db/models');

class SignupController {
    async signUp(req, res) {
        try {
            const { email, password, username, firstName, lastName, uniName } = req.body;
            console.log(`начинаем попытку регистрации пользователя с почтой ${email}`);

            let hashedPassword = crypto.pbkdf2Sync(password, env.secret, env.iterations, env.keyLength, env.algorithm).toString(env.encoding);

            console.log('создаем пользователя');
            let userCreateRes = await auth.create({
                email: email,
                password: hashedPassword,
                user: {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    uniName: uniName,
                }
            },
            );

            console.log('пользователь создан, подписываем токен');
            let token = jwtAuth.sign({ id: userCreateRes.user.id, username: userCreateRes.user.username });

            let response = { userData: userCreateRes.user, token: token };

            console.log(`отправляем данные обратно клиенту`);
            res.status(200).json(response);
        } catch (err) {
            console.log(`произошла ошибка во время регистрации: ${err}`);
            res.status(500).send(`произошла ошибка во время регистрации: ${err}`);
        }
    }
}

module.exports = new SignupController();