# Desafio de Automação de Testes de API - Abordagem via Código (Pactum.js)

Este diretório contém a terceira e última camada da solução técnica para o desafio da API ServeRest. Para cumprir o requisito de automação em nível de código utilizando uma ferramenta de mercado, a escolha arquitetural foi 
o **Pactum.js** em conjunto com o executor **Mocha**.

## Por que o Pactum.js?
O Pactum.js foi escolhido por ser uma biblioteca de automação de testes REST avançada e moderna para Node.js. Ele oferece uma sintaxe declarativa e encadeada que facilita a leitura do código (Clean Code), tornando a manutenção dos testes extremamente ágil.

## Cobertura de Requisitos
A suíte de testes foi estruturada para garantir a cobertura de 100% das regras de negócio do fluxo de usuários exigido no desafio:
*   **Tipagem e Contratos:** Envio do campo `administrador` validado como *String*, conforme especificações do PDF.
*   **Geração de Massa Dinâmica:** Injeção de função nativa JavaScript (`Math.random()`) para criar e-mails únicos, prevenindo conflitos de massa de dados (HTTP 400).
*   **Autenticação JWT:** Rota de `/login` incorporada à suíte para extração de token e injeção via cabeçalho (`Authorization`) nos testes de PUT e DELETE.
*   **State Management:** O ID do usuário criado no primeiro teste (POST) trafega pelo escopo global do framework para ser consultado e excluído nas etapas finais, realizando o *Teardown* automático do banco de dados.

## Como Executar Localmente

### Pré-requisitos
*   [Node.js](https://nodejs.org/) (versão 18 ou superior).

### Passos para Execução
1. Acesse o diretório da automação via terminal:
   ```bash
   cd Automacao_Pactum
Instale as dependências (Pactum e Mocha):

Bash
npm install
Dispare a suíte de testes:

Bash
npm test

Autor: Paulo Victor Torres Martins
