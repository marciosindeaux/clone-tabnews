# CloneTabNews

Este projeto é uma reinterpretação do [tabnews.com.br](https://github.com/filipedeschamps/tabnews.com.br), desenvolvido do zero como parte do curso.dev. O objetivo é estudar, entender e reconstruir a arquitetura de um projeto Next.js moderno, com backend desacoplado e integração a banco de dados PostgreSQL.

## Sobre o Projeto

O CloneTabNews busca replicar e expandir as funcionalidades do TabNews, focando em boas práticas de arquitetura, organização de código e escalabilidade. O projeto está em constante evolução, acompanhando os aprendizados do curso.

## Arquitetura

No projeto original do tabnews, o projeto era feito inteiramente em nextjs, Existia uma certa limitação em entender os limites entre o que era backend e o que era front-end. Em muitas situações acontecia o que a gente chama de `layer-violation`, quando uma camada que não deveria ter acesso a determinado arquivo ou camada tem esse acesso (Ex : Pagina tendo acesso a função que busca no banco de dados sem passar por uma requisição HTTP para isso)

Aqui a estrutura do projeto foi reorganizada para separar claramente as responsabilidades entre frontend, backend e infraestrutura:

- **Frontend (Next.js):**
    - Localizado em `src/pages/`
    - Utiliza o framework Next.js para renderização de páginas e rotas de API.
    - Exemplo de rota: `src/pages/api/v1/status/index.js` expõe a api do status da aplicação.

- **Backend:**
    - Localizado em `src/backend/`
    - Segue princípios de Clean Architecture, separando camadas de aplicação, domínio e recursos.
        - `application/controller/`: Controladores responsáveis por orquestrar as requisições (ex: `HealthController.js`).
        - `domain/services/`: Serviços de domínio (lógica de negócio).
        - `resources/database/`: Configuração e acesso ao banco de dados PostgreSQL.

- **Infraestrutura:**
    - Localizada em `infra/`
    - Contém arquivos de configuração para ambientes de desenvolvimento, como Docker Compose (`infra/docker/compose.yml`), facilitando a inicialização de dependências como o banco de dados.

Essa é a arquitetura implementada no projeto :

```
clonetabnews/
├── 🛠️ infra/                            # Infraestrutura e ambiente
│   └── 🐳 docker/
│       └── compose.yml                  # Orquestração de containers
├── 📦 src/
│   ├── 🧠 backend/                      # Backend desacoplado do framework
│   │   ├── 🎯 application/              # Camada de aplicação (casos de uso)
│   │   │   └── 🎮 controller/           # Controllers (interfaces de entrada)
│   │   │       └── HealthController.js
│   │   ├── 🧩 domain/                   # Domínio (regras de negócio)
│   │   │   └── 🧠 services/             # Serviços de domínio
│   │   └── 🗄️ resources/                # Recursos externos (infra técnica)
│   │       └── 🐘 database/
│   │           └── postgresql/
│   │               ├── ⚙️ config/       # Configuração de acesso ao banco
│   │               │   └── database.js
│   │               └── 📚 repositories/ # Implementações de repositórios
│   ├── 🌐 pages/                        # Camada de framework (Next.js)
│   │   ├── 🏠 index.js                  # Página inicial (UI)
│   │   ├── 🔌 api/                      # Adaptadores HTTP (API Routes)
│   │   │   └── v1/
│   │   │       └── 🧭 status/
│   │   │           └── index.js         # Endpoint /api/v1/status -> Rota para HealthController
│   │   └── 🌐 produtos/                 # Feature de domínio (exemplo)
│   │       └── index.js
├── 🧪 tests/                            # Testes automatizados
│   ├── 🔗 integration/                  # Testes de integração
│   │   └── api/
│   │       └── v1/
│   │           └── ❤️ status/
│   │               └── get.test.js      # Teste do endpoint de status
│   └── 🧩 unit/                         # Testes unitários (domínio/aplicação)
├── 🔐 .env                              # Variáveis de ambiente
├── 📦 package.json                      # Dependências e scripts
└── 📘 README.md                         # Documentação do projeto
```

## Banco de Dados

A conexão com o PostgreSQL é feita via pacote `pg`, com parâmetros sensíveis configurados em variáveis de ambiente (`.env`). O backend consulta o banco de dados para verificar o status e realizar operações futuras.

## Como Executar

1. Instale as dependências:
    ```
    npm install
    ```
2. Configure o arquivo `.env` com as variáveis do banco de dados.
3. Suba o banco de dados com Docker Compose:
    ```
    docker compose -f infra/docker/compose.yml up
    ```
4. Inicie o projeto Next.js:
    ```
    npm run dev
    ```

## Testes

Os testes estão organizados em `tests/`, separados por integração e unidade.

---

Este projeto é um estudo, não visa fins lucrativos, e pode ser usado para entendimento caso julgue que serve para tal.

O Projeto pode ser acessado no site
tab.msindeaux.dev.br
