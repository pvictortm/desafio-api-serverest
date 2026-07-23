# Desafio de Automação de Testes de API - Carrefour

Este repositório contém a solução técnica para o desafio de automação de testes de API RESTful focado no gerenciamento de usuários. O projeto foi construído utilizando a API pública ServeRest para simular as operações de negócio exigidas.

## Tecnologias Utilizadas

*   Postman: Criação da estrutura de requisições, testes unitários de status e encadeamento de dados.
*   Newman: Motor de execução dos testes via linha de comando (CLI) para viabilizar a automação em lote.
* Newman HTML Extra: Biblioteca de relatórios para geração de dashboards visuais de qualidade.
*   Node.js & npm: Gerenciamento do ecossistema de dependências locais do projeto.

## Estrutura do Projeto
O repositório foi modularizado para demonstrar diferentes abordagens de automação. Esta documentação refere-se à abordagem DDT (Data-Driven Testing).

*   `/Collection_DDT/` (Pasta atual)
*   `Desafio_Carrefour.postman_collection.json`: Arquivo central contendo a suíte de testes (Endpoints, Headers, Scripts e Asserções).
*   `dados_usuarios.csv`: Arquivo de massa de dados iterativo.
*   `package.json` / `package-lock.json`: Mapeamento das ferramentas de linha de comando isoladas para este escopo.
*   `/newman`: Diretório gerado de forma autônoma após as execuções contendo os relatórios visuais.

## Casos de Teste Cobertos (Cobertura CRUD)

O escopo do projeto garante a validação 100% automatizada do ciclo de vida de um usuário na plataforma, atendendo aos requisitos de Payload e Autenticação:

1.  POST `/usuarios` (Criação):
*   Valida a criação de um novo usuário ingerindo dados dinâmicos do arquivo `.csv` (nome, email, password e perfil de administrador).
*   Asserção: Status Code `201 Created`.
2.  GET `/usuarios/{id}` (Leitura):
*   Valida a persistência no banco de dados consultando o ID gerado dinamicamente no passo anterior (State Management).
*   Asserção: Status Code `200 OK`.
3.  POST `/login` (Autenticação):
*   Executa o login utilizando a mesma massa de dados injetada para capturar o Token JWT (Bearer Token), requisito essencial de segurança para rotas protegidas.
*   Asserção:** Status Code `200 OK`.
4.  PUT `/usuarios/{id}` (Atualização):
*   Valida a modificação do registro enviando os novos dados via Body e a credencial JWT no Header de autorização.
*   Asserção: Status Code `200 OK`.
5.  DELETE `/usuarios/{id}` (Exclusão):
*   Garante a limpeza e segurança do ambiente apagando o usuário gerado, exigindo autenticação JWT ativa.
*   Asserção: Status Code `200 OK`.

*Nota de Arquitetura: A automação foi desenhada em formato cíclico e isolado. Cada linha do arquivo CSV executa o fluxo completo do passo 1 ao 5 sequencialmente, garantindo que testes futuros não falhem por retenção indevida de dados no servidor.*

## Como Executar os Testes

Esta suíte adota o padrão arquitetural de separar a lógica do teste dos seus dados de entrada (DDT). Por exigir injeção de variáveis em tempo real, os testes devem ser executados obrigatoriamente via CLI ou Collection Runner, evitando falhas de _Bad Request_ por execução isolada.

### Pré-requisitos
*   [Node.js](https://nodejs.org/) instalado na máquina.
*   Terminal da sua preferência (CMD, PowerShell, Git Bash).

### Execução via Linha de Comando (Recomendado)

1. Clone o repositório para o seu ambiente local.
2. Pelo terminal, navegue até a pasta da collection específica:
```bash
cd Collection_DDT
3. Instale as dependências locais do Newman:
Bash
npm install
4. Execute a suíte de testes passando os parâmetros de coleção, massa de dados, variável de ambiente e tipo de relatório:
Bash
npx newman run "Desafio_Carrefour.postman_collection.json" -d dados_usuarios.csv --env-var "url_base=[https://serverest.dev](https://serverest.dev)" -r htmlextra,cli

Relatórios Visuais
Ao final das execuções via CLI, um diretório /newman será gerado automaticamente contendo o Dashboard .html com o detalhamento completo das métricas, asserções e tempos de resposta.
Autor: Paulo Victor Torres Martins 

