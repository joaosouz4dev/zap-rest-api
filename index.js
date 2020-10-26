const express = require('express')
const venom = require('venom-bot');
const fs = require('fs');
const router = express();

const port = 3000;
var clientVenom;


// iniciando venom
router.get('/init', (req, res) => {
    if (!clientVenom || clientVenom == false) {
        res.status(200).json({
            success: true,
            message: 'Venom foi iniciado, leia o qrcode'
        });
        if (fs.existsSync(__dirname +'/qrcode.png')) {
            fs.unlinkSync(__dirname +'/qrcode.png');
        }
        venom
            .create(
                // session
                'clientVenom',
                // exporting qrcode
                (base64Qr) => {
                    var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                        response = {};

                    if (matches.length !== 3) {
                        return new Error('Invalid input string');
                    }
                    response.type = matches[1];
                    response.data = new Buffer.from(matches[2], 'base64');

                    var imageBuffer = response;
                    fs.writeFile(
                        'qrcode.png',
                        imageBuffer['data'],
                        'binary',
                        function (err) {
                            if (err != null) {
                                console.log(err);
                            }
                            console.log('qrcode exportado');
                        }
                    );

                },
                // statusFind
                (statusSession) => {
                    
                    console.log('Status Session: ', statusSession);
                },
                // options
                {
                    headless: true,
                    devtools: false,
                    useChrome: true,
                    debug: false,
                    logQR: true,
                    browserWS: '',
                    disableSpins: true,
                    disableWelcome: true,
                    updatesLog: true,
                    autoClose: 60000
                }
            )
            .then((client) => {
                if (fs.existsSync(__dirname +'/qrcode.png')) {
                    fs.unlinkSync(__dirname +'/qrcode.png');
                }
                clientVenom = client;
            })
            .catch((erro) => {
                clientVenom = false;
                console.log(erro);
            });
    } else {
        res.status(200).json({
            success: true,
            message: 'venom já foi lido'
        });
    }
});

// deletando cliente
router.get('/deleteCliente', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Cliente deletado'
    });
});

// deletando cliente
router.get('/qrcode', (req, res) => {
    if (fs.existsSync(__dirname +'/qrcode.png')) {
        res.sendFile('qrcode.png', { root: __dirname });
    }else{
        if (clientVenom && clientVenom != false) {
            res.status(200).json({
                success: true,
                message: 'Venom já foi lido'
            });
        }else{
            res.status(400).json({
                success: false,
                message: 'Qrcode ainda não foi exportado'
            });
        }
    }
});

// Enviar mensagens
router.get('/enviarmsg', async (req, res) => {
    let chatId = req.query.numero;
    let msg = req.query.msg;
    if (clientVenom && clientVenom != false) {
        if (chatId && msg) {
            msg = msg.replace(/<br>/gi, "\n");
            try {
                let resp = await clientVenom.sendText(chatId + '@c.us', '' + msg);
                res.status(200).json({
                    success: true,
                    message: resp
                });
            } catch (e) {
                console.log(e);
                res.status(500).json({
                    success: false,
                    message: 'Algo deu errado!'
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Request imcompleto, necessita revisão!'
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Venom ainda não foi lido corretamente!'
        });
    }
});

// iniciando express na porta setada.
router.listen(port, () => {
    console.log(`Api inicada na porta: ${port}`)
});