const pactum = require('pactum');

describe('Suíte de Testes de API - ServeRest (PactumJS)', () => {
    
    const baseUrl = 'https://serverest.dev';
    let idUsuario = '';
    let token = '';
    
    // Gera um email randômico para evitar conflitos de dados no servidor
    const emailAleatorio = `candidato.pactum${Math.floor(Math.random() * 100000)}@teste.com`;

    it('1. Deve cadastrar um novo usuário (POST)', async () => {
        const response = await pactum.spec()
            .post(`${baseUrl}/usuarios`)
            .withJson({
                nome: "Candidato Pactum",
                email: emailAleatorio,
                password: "senha",
                administrador: "true" // Passado como string conforme regra de negócio
            })
            .expectStatus(201)
            .expectBodyContains('Cadastro realizado com sucesso');

        // Captura o ID retornado pela API para usar nos testes seguintes
        idUsuario = response.json._id;
    });

    it('2. Deve realizar login para obter o Token JWT (POST)', async () => {
        const response = await pactum.spec()
            .post(`${baseUrl}/login`)
            .withJson({
                email: emailAleatorio,
                password: "senha"
            })
            .expectStatus(200)
            .expectBodyContains('Login realizado com sucesso');

        // Captura o Token de Autorização
        token = response.json.authorization;
    });

    it('3. Deve consultar o usuário cadastrado (GET)', async () => {
        await pactum.spec()
            .get(`${baseUrl}/usuarios/${idUsuario}`)
            .expectStatus(200)
            .expectJsonLike({
                nome: "Candidato Pactum",
                email: emailAleatorio
            });
    });

    it('4. Deve atualizar o usuário (PUT)', async () => {
        await pactum.spec()
            .put(`${baseUrl}/usuarios/${idUsuario}`)
            .withHeaders('Authorization', token) // Injeta o JWT no Header
            .withJson({
                nome: "Candidato Pactum Atualizado",
                email: emailAleatorio,
                password: "senha",
                administrador: "true"
            })
            .expectStatus(200)
            .expectBodyContains('Registro alterado com sucesso');
    });

    it('5. Deve excluir o usuário para limpar a base (DELETE)', async () => {
        await pactum.spec()
            .delete(`${baseUrl}/usuarios/${idUsuario}`)
            .withHeaders('Authorization', token)
            .expectStatus(200)
            .expectBodyContains('Registro excluído com sucesso');
    });
});