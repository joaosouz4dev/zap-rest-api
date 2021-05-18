# Api Premium

> Documentação para mostrar sobre todas as rotas e possibilidades do sistema.

## Install and Run

npm start

pm2 monit

## Constantes

### token = "4D83A1B9A15FE8C3498F998E954DB"

## Exemplo

> Autenticação <http://localhost:3500/NOME%20DA%20SUA%20SESSAO/autenticacao?webhook=SUA%20URL%20WEBHOOK>

## Webhook

> Padrão de retorno aguardado

```javascript
// tipos possiveis:
// statusMudou 
// atualizarMensagem 
// recebendoMensagem
// ativandoSincronizacao 
// AlterarStatusNumero
// qrcode
{
    tipo: <tipo>,
    sessao: <sessao>,
    json: <retorno>
}
```

## Rotas

| Rota | Método | Requisitos | Descrição |
|------|--------|------------|-----------|
| `/rotas` | GET | `token` | Exibi todas as rotas da api |
| `/sessions` | GET | `token` | Exibi todas as sesões iniciadas |
| `/:sessao/autenticacao` | GET | `sessao`, `webhook` | Autenticação para iniciar uma nova conexão |
| `/:sessao/qrcode` | GET | `sessao` | Retorna o qrcode |
| `/:sessao/sair` | GET | `sessao` | Sair e deletar cliente |
| `/:sessao/me` | GET | `sessao` | Tudo sobre o whatsapp em sincronizado |
| `/:sessao/conexao` | GET | `sessao` | Checando a conexão |
| `/:sessao/conversas` | GET | `sessao` | Retorna todas as conversas |
| `/:sessao/conversascommsgs` | GET | `sessao` | Retorna todas as conversas com algumas mensagens |
| `/:sessao/todoscontatos` | GET | `sessao` | Retorna todos os contatos |
| `/:sessao/novocontatovalidar` | GET | `sessao`, `numero` | Valida se um número é válido e retorna o correto |
| `/:sessao/novocontato` | GET | `sessao`, `numero`, `msg` | Inicia uma conversar com um novo contato |
| `/:sessao/chatonline` | GET | `sessao`, `numero` | Verifica se o chat de conversa está online |
| `/:sessao/status` | GET | `sessao`, `numero` | Retorna o status de um contato |
| `/:sessao/visualizar` | GET | `sessao`, `numero` | Enviar que esta conversa foi visualizada |
| `/:sessao/marcarnlido` | GET | `sessao`, `numero` | Marcar conversa como não visto |
| `/:sessao/foto` | GET | `sessao`, `numero`, `tipo` | Retorna a url da foto de um perfil |
| `/:sessao/mensagens` | GET | `sessao`, `numero` | Retorna conversa e as ultimas mensagens |
| `/:sessao/mensagensgroup` | GET | `sessao`, `numero` | Retorna conversa e as ultimas mensagens group |
| `/:sessao/carregarmaismensagens` | GET | `sessao`, `numero`, `tipo` | Retorna mensagens de uma conversa e mais um pouco |
| `/:sessao/todasmensagens` | GET | `sessao`, `numero` | Todas as mensagens de uma conversa |
| `/:sessao/enviarmsg` | GET | `sessao`, `numero`, `msg` | Envia mensagem de texto |
| `/:sessao/encaminharmsg` | GET | `sessao`, `numero`, `msgid` | Encaminha uma mensagem para algum contato |
| `/:sessao/enviarcontato` | GET | `sessao`, `numero`, `contato` | Envia um contato para alguém |
| `/:sessao/desfile` | POST | `sessao`, `body` | Descriptografa uma mensagem do tipo mídia |
| `/:sessao/enviarimagem` | POST | `sessao`, `doc` | Envia uma mensagem de uma imagem |
| `/:sessao/enviardoc` | POST | `sessao`, `doc` | Envia uma mensagem de um documento |
| `/:sessao/enviaraudio` | POST | `sessao`, `numero` | Envia uma mensagem como um audio do wpp |
| `/:sessao/grupos` | GET | `sessao` | Retorna todos os grupos |
| `/:sessao/grupointegrantes` | GET | `sessao`, `numero` | Retorna todos os integrantes de um grupo |
| `/:sessao/grupoentrar` | GET | `sessao`, `link` | Entra em um grupo pelo link |
| `/:sessao/gruposair` | GET | `sessao`, `numero` | Sairá de um grupo pelo numero |
