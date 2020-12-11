const express = require('express');
const venom = require('venom-bot');
const fs = require('fs');
const path = require('path');
const router = express();

router.set('view engine', 'pug');
router.set('views', path.join(__dirname, 'views'));

const port = 3000;
var clientVenom,
	clientQrcode,
	clientvalidator = !1;

// iniciando venom
router.get('/init', (req, res) => {
	if (!clientvalidator) {
		clientvalidator = !0;
		res.status(200).json({
			success: !0,
			message: 'Venom foi iniciado, leia o qrcode'
		});
		try {
			venom
				.create(
					// session
					'clientVenom',
					// exporting qrcode
					(base64Qr) => {
						clientQrcode = base64Qr;
					},
					// statusFind
					(statusSession) => {
						const conflits = [
							'browserClose',
							'qrReadFail',
							'autocloseCalled',
							'serverClose',
							'deleteToken'
						];
						if (conflits.includes(statusSession)) {
							clientvalidator = !1;
							clientVenom = !1;
						}
						console.log('Status Session: ', statusSession);
					},
					// options
					{
						headless: !0,
						devtools: !1,
						useChrome: !0,
						debug: !1,
						logQR: !0,
						disableSpins: !0,
						disableWelcome: !0,
						updatesLog: !0,
						autoClose: 60000
					}
				)
				.then((client) => {
					if (clientQrcode) {
						clientQrcode = !1;
					}
					clientVenom = client;
				})
				.catch((erro) => {
					clientvalidator = !1;
					clientVenom = !1;
					console.log(erro);
				});
		} catch (error) {
			clientvalidator = !1;
			clientVenom = !1;
		}
	} else {
		res.status(200).json({
			success: !0,
			message: 'venom já foi lido'
		});
	}
});

// deletando cliente
router.get('/deleteCliente', (req, res) => {
	res.status(200).json({
		success: !0,
		message: 'Cliente deletado'
	});
});

// deletando cliente
router.get('/qrcode', (req, res) => {
	if (clientQrcode) {
		res.render('qrcode', { qr: clientQrcode });
	} else {
		if (clientvalidator) {
			res.status(200).json({
				success: !0,
				message: 'Venom já foi lido'
			});
		} else {
			res.status(400).json({
				success: !1,
				message: 'Qrcode ainda não foi exportado'
			});
		}
	}
});

// Enviar mensagens
router.get('/enviarmsg', async (req, res) => {
	let chatId = req.query.numero;
	let msg = req.query.msg;
	if (clientvalidator) {
		if (chatId && msg) {
			msg = msg.replace(/<br>/gi, '\n');
			try {
				let resp = await clientVenom.sendText(chatId + '@c.us', '' + msg);
				res.status(200).json({
					success: !0,
					message: resp
				});
			} catch (e) {
				console.log(e);
				res.status(500).json({
					success: !1,
					message: 'Algo deu errado!'
				});
			}
		} else {
			res.status(400).json({
				success: !1,
				message: 'Request imcompleto, necessita revisão!'
			});
		}
	} else {
		res.status(400).json({
			success: !1,
			message: 'Venom ainda não foi lido corretamente!'
		});
	}
});

// iniciando express na porta setada.
router.listen(port, () => {
	console.log(`Api started at the port: ${port}`);
});
