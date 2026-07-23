# Desafio de Automação de Testes de API - ServeRest

Este repositório contém a entrega final para o desafio técnico de automação de testes de API. O objetivo é garantir 100% de cobertura das operações de usuários (CRUD), validar regras de negócio, limites de taxa (Rate Limiting) e autenticação JWT.

Para demonstrar versatilidade e domínio arquitetural, a solução foi construída utilizando três abordagens distintas de mercado, documentadas em suas respectivas pastas:

*    `/Collection_DDT`: Automação Postman/Newman utilizando Data-Driven Testing (Massa de dados externa via `.csv`).
*    `/Collection_Array`: Automação Postman/Newman utilizando manipulação de estado (State Management) e Arrays via JavaScript.
*    `/Automacao_Pactum`: Automação via código puro utilizando Pactum.js e Mocha (Node.js).

## Configuração do Ambiente Local

Para executar qualquer uma das suítes localmente, é necessário garantir os seguintes pré-requisitos:

1. Instalar o [Node.js](https://nodejs.org/) (versão 18 ou superior).
2. Clonar este repositório:
   ```bash
   git clone https://github.com/pvictortm/desafio-api-serverest.git