const crypto = require('crypto');
const env = require('../../db/env');
const { auth } = require('../../db/models');
const { user } = require('../../db/models');
const { message } = require('../../db/models');
const { chat } = require('../../db/models');
const { club } = require('../../db/models');

class ClubController {
	async getClubs(req, res) {
		try {
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
					model: chat,
					as: 'chats',
					include: {
						model: message,
						as: 'messages'
					}
				}
				]
			});

			res.status(200).json(clubsFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async getClub(req, res) {
		try {
			const clubhandle = req.params.clubhandle;
			let clubFound = await club.findOne({
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
					model: chat,
					as: 'chats',
					include: {
						model: message,
						as: 'messages'
					}
				}
				]
			});

			res.status(200).json(clubFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async createClub(req, res) {
		try {
			const { clubHandle, clubName, clubDescription } = req.body;
			const adminId = req.clientPayload.id;

			let clubRes = await club.create({
				handle: clubHandle,
				name: clubName,
				description: clubDescription,
				adminId: adminId
			})

			res.status(200).json(clubRes);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async updateClub(req, res) {
		try {
			const { clubHandle, clubName, clubDescription } = req.body;
			const clubhandle = req.params.clubhandle;
			let clubFound = await club.findOne({
				where: {
					handle: clubhandle
				}
			});

			if (clubHandle) {
				clubFound.handle = clubHandle;
			}
			if (clubName) {
				clubFound.name = clubName;
			}
			if (clubDescription) {
				clubFound.description = clubDescription;
			}

			await club.save();

			res.status(200).json(clubFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async deleteClub(req, res) {
		try {
			const { clubHandle, clubName, clubDescription } = req.body;
			const clubhandle = req.params.clubhandle;
			let clubFound = await club.findOne({
				where: {
					handle: clubhandle
				}
			});

			await club.destroy();

			res.status(200).json(clubFound);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async createPost(req, res) {
		try {
			const { content, createdAt } = req.body;
			const clubhandle = req.params.clubhandle;

			let clubRes = await club.findOne({
				where: {
					handle: clubhandle
				}
			})

			let postRes = await clubRes.createPost({
				content: content,
				createdAt: createdAt
			})

			res.status(200).json(postRes);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async updatePost(req, res) {
		try {
			const { content } = req.body;
			const postid = req.params.postid;

			let postRes = await post.findOne({
				where: {
					id: postid
				}
			})

			if (content) {
				postRes.content = content;
				await postRes.save();
			}

			res.status(200).json(postRes);
		} catch (err) {
			res.status(500).send(err);
		}
	}

	async deletePost(req, res) {
		try {
			const postid = req.params.postid;

			let postRes = await post.findOne({
				where: {
					id: postid
				}
			})

			await postRes.destroy();

			res.status(200).json(postRes);
		} catch (err) {
			res.status(500).send(err);
		}
	}
}

module.exports = new ClubController();