# Desafio de Automação de Testes de API - Abordagem Array 

Este diretório contém a solução técnica para o desafio de automação de testes de API RESTful focado no gerenciamento de usuários (ServeRest). Esta documentação é exclusiva para a arquitetura da Collection_Array, projetada para demonstrar o domínio em manipulação de estado complexo e estruturas de dados dinâmicas utilizando JavaScript puro dentro do Postman.

## Cobertura de Requisitos do Desafio

A automação foi rigorosamente arquitetada para cumprir as regras de negócio e restrições exigidas no escopo técnico:

*    Autenticação via Token JWT: O fluxo extrai dinamicamente o e-mail do usuário gerado no teste, executa o login em tempo real e injeta o *Bearer Token* gerado no *Header* de autorização das rotas restritas (PUT e DELETE).
*   Limitações de Taxa (100 requisições/min): Foi configurado o parâmetro de controle de cadência (`delay-request`) no motor de execução do Newman para adicionar uma pausa estratégica de milissegundos entre as chamadas, garantindo que o *Rate Limiting* da API nunca seja violado, mesmo em testes de carga.
*   Tipagem Estrita no Body JSON: O campo `administrador` foi tipado propositalmente como *String* (`"true"`), desviando do padrão booleano (`true`) para cumprir a especificação exata do documento e evitar falhas de validação de contrato (*Bad Request*).

## Fluxo de Execução Validado (CRUD End-to-End)

A collection executa o fluxo de forma autônoma e interligada utilizando. Os IDs são gerados no cadastro, armazenados em um Array na memória volátil do Postman e consumidos um a um pelas rotas seguintes:

1.  POST `/usuarios`: Criação do usuário gerando variáveis randômicas e armazenamento do ID retornado no Array.
2.  GET `/usuarios/{id}`: Extração do primeiro ID da fila (função `.shift()`) para montagem dinâmica da URL e consulta de dados.
3.  POST `/login`: Captura do e-mail retornado na consulta para autenticação e geração da credencial JWT.
4.  PUT `/usuarios/{id}`: Atualização de dados autenticada utilizando o ID mantido em estado e o Token.
5.  DELETE `/usuarios/{id}`: Exclusão do registro validado, garantindo a limpeza completa do banco de dados Teardown automático).

## Como Executar os Testes

Para garantir que o fluxo gerencie os estados, popule e consuma o Array corretamente, não execute as requisições de forma isolada. Utilize o Newman (CLI) ou a interface do Postman Runner.

###  Pré-requisitos
*   [Node.js](https://nodejs.org/) instalado.
*   Navegador web para visualização dos relatórios.

### Execução via Linha de Comando (CLI)

1. Acesse o diretório específico desta collection no seu terminal:
   ```bash
   cd Collection_Array

2.	Instale as dependências do gerador de relatórios:
Bash
npm install
3.	Execute o fluxo ponta a ponta passando o ambiente e o controle de delay:
Bash
npx newman run "Desafio_Array.postman_collection.json" --env-var "url_base=https://serverest.dev" --delay-request 600 -r htmlextra,cli
 Relatório Visual de Qualidade
Ao finalizar a execução dos testes pelo terminal, a biblioteca htmlextra gerará uma pasta chamada /newman. Abra o arquivo .html lá contido diretamente no seu navegador para acessar o Dashboard gerencial com as métricas detalhadas, validação de asserções e volumetria das respostas.
Autor: Paulo Victor Torres Martins

