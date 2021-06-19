const payload = {
  "last_quote": "?last_quotes=2",
	"remetente": {
		"cnpj": "17184406000174"
	},
	"codigo_plataforma": "588604ab3",
	"token": "c8359377969ded682c3dba5cb967c07b",
	"destinatario": {
		"endereco": {
			"cep": "01311000"
		}
	},
	"volumes": [
		{
			"tipo": 7,
			"quantidade": 1,
			"peso": 5,
			"valor": 349,
			"sku": "abc-teste-123",
			"altura": 0.2,
			"largura": 0.2,
			"comprimento": 0.2
		},
		{
			"tipo": 7,
			"quantidade": 2,
			"peso": 4,
			"valor": 556,
			"sku": "abc-teste-527",
			"altura": 0.4,
			"largura": 0.6,
			"comprimento": 0.15
		}
	]
}

module.exports = payload;