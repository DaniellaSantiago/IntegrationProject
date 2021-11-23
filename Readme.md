Aplicação desenvolvida para integrar as plataformas Pipedrive e Bling.

--> Busca as oportunidades com status igual a ganho no Pipedrive e as insere como pedido no Bling.

- Para pegar as oportunidades do dia e salvar no Bling, utilizar o curl:

curl --location --request POST 'localhost:5000/api/pipedrive/deals/timeLine' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Date": "2021-11-22 00:19:50"
}'

--> Salva todos os Ids do pedidos das oportunidades inseridas no Bling por dia e valor total no MongoDB.

- Para trazer os dados consolidados da collection do MongoDB, utilizar o curl:

curl --location --request GET 'localhost:5000/api/bling/getOpportunities?startDate=2021-11-22&endDate=2021-11-24'