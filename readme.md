## Descrição do Projeto. 

Este projeto foi desenvolvido como parte do desafio técnico do processo seletivo da empresa Magazine Luiza (aiqfome). O desafio consiste em criar uma API robusta e escalável para gerenciar os produtos favoritos de clientes na plataforma, permitindo integração com aplicações web, apps e sistemas externos.

A API foi desenvolvida utilizando Node.js com foco em desempenho, segurança e boas práticas RESTful, garantindo uma base sólida para ambientes de alto volume de requisições.

## :rocket: Tecnologias 

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/pt-br/)
- [pg-pool (node-postgres)](https://github.com/brianc/node-postgres)
- [JWT (JSON Web Token)](https://jwt.io/)
- [JSON Schema Validator](https://github.com/tdegrunt/jsonschema)

## :information_source: Como usar

Para clonar e rodar a aplicação, vai ser necessário [Git](https://git-scm.com) e [Node.js](https://nodejs.org) instalados no seu computador. 

Para testar os endpoints da API, você pode usar ferramentas como o Insomnia ou o Postman. Para facilitar, uma collection completa para o Postman, com todas as rotas já configuradas, está disponível no diretório `resources/postman` do projeto.

Além disso, o projeto inclui um arquivo SQL `resources/sql/tables.sql` com todos os comandos necessários para criação das tabelas, permitindo que você configure rapidamente o ambiente de testes em sua máquina local.

A requisição é feita pela url: `localhost:<porta>/v1/<nome do endpoint>`

É necessário configurar variáveis de ambiente (.env). Use `.env.example` como guia.

Usar as seguintes linhas de comando:

```bash
# Clonar o repositório
$ git clone https://github.com/ThierrryScotto/aiqfome.git

# Acessar o diretório
$ cd aiqfome

# Instalar as dependências
$ yarn install

# Rodar a API
$ yarn start
```

## Diagrama de Rotas

#### 🔓 Rotas Públicas
- `POST   /v1/auth`  
  → Autentica o cliente e retorna JWT

- `POST   /v1/clients`  
  → Cria novo cliente

#### 🔒 Rotas Protegidas (Requer JWT)

- `GET    /v1/clients`  
  → Lista todos os clientes existentes

- `GET    /v1/clients/:clientId`  
  → Busca por um cliente específico

- `PUT    /v1/clients/:clientId`  
  → Edita um determinado cliente

- `DELETE /v1/clients/:clientId`  
  → Deleta um determinado cliente

- `POST   /v1/clients/:clientId/favorite_products`  
  → Adiciona um produto aos favoritos  
  └── Body: `{ "product_id": <ID> }`

- `GET    /v1/clients/:clientId/favorite_products`  
  → Lista todos os produtos favoritados pelo cliente

## ⚒️ Justificativa das Escolhas Técnicas

#### PostgreSQL com `pg-pool`

Utilizei o `pg-pool` para gerenciar conexões com o banco de dados PostgreSQL visando alguns pontos como:

- Melhor desempenho em ambientes concorrentes;
- Reutilização eficiente de conexões;
- Redução da sobrecarga do banco de dados;
- Escalabilidade para altos volumes de acesso.

Como o desafio exige performance e escalabilidade, essa abordagem é essencial para garantir estabilidade da aplicação em produção.

#### Segurança com JSON Schema

Para assegurar a robustez e a segurança da aplicação, as entradas de dados são validadas utilizando JSON Schema. Essa abordagem garante a integridade e a previsibilidade das requisições ao validar os tipos e formatos esperados para cada campo. Além disso, atua como uma camada de defesa protegendo o sistema contra ameaças, como ataques de SQL Injection e a injeção de comandos maliciosos por meio dos parâmetros, garantindo que apenas dados limpos e seguros sejam processados.

#### Autenticação e Autorização

A API é pública, mas protege seus recursos com autenticação baseada em JWT. Apenas usuários autenticados podem acessar e manipular os produtos favoritos. Além disso, há controle de autorização para evitar acesso indevido a dados de outros clientes.

---

Desenvolvido com ♥ por Thierry A. Scotto :wave: [Linkedin](https://www.linkedin.com/in/thierry-scotto/)
