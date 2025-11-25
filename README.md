# Sistema de Gerenciamento de Estoque

Este é um projeto de sistema de gerenciamento de estoque simples, desenvolvido com Spring Boot no backend e uma interface web moderna utilizando HTML, CSS e JavaScript.

## 🚀 Tecnologias Utilizadas

- **Backend**:
  - Java 17+
  - Spring Boot 3
  - Spring Data JPA
  - H2 Database (Banco de dados em memória)
  - Lombok
  - Validation API

- **Frontend**:
  - HTML5
  - CSS3 (Design Responsivo e Tema Escuro)
  - JavaScript (Fetch API)

## ✨ Funcionalidades

- **Listar Produtos**: Visualização de todos os produtos cadastrados em uma tabela.
- **Cadastrar Produto**: Formulário para adição de novos produtos com validação.
- **Buscar Produto**: Pesquisa de produtos por ID.
- **Alterar Produto**: Edição de dados de produtos existentes.
- **Remover Produto**: Exclusão de produtos do sistema.

## 📦 Como Executar

### Pré-requisitos

- Java JDK 17 ou superior instalado.

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/estoque.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd estoque
   ```

3. Execute a aplicação usando o Maven Wrapper:
   - **Windows**:
     ```powershell
     ./mvnw spring-boot:run
     ```
   - **Linux/macOS**:
     ```bash
     ./mvnw spring-boot:run
     ```

4. Acesse a aplicação no navegador:
   ```
   http://localhost:8080
   ```

## 🔌 Endpoints da API

A API REST está disponível nos seguintes endpoints:

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/listar` | Retorna a lista de todos os produtos. |
| `GET` | `/buscar/{id}` | Retorna um produto específico pelo ID. |
| `POST` | `/cadastrar` | Cadastra um novo produto. |
| `PUT` | `/alterar` | Atualiza um produto existente. |
| `DELETE` | `/remover/{id}` | Remove um produto pelo ID. |

## 📂 Estrutura do Projeto

```
src/
├── main/
│   ├── java/com/anm/estoque/
│   │   ├── controller/   # Controladores REST
│   │   ├── dto/          # Objetos de Transferência de Dados
│   │   ├── model/        # Entidades JPA
│   │   ├── repository/   # Repositórios de Dados
│   │   └── service/      # Regras de Negócio
│   └── resources/
│       ├── static/       # Arquivos Frontend (HTML, CSS, JS)
│       └── application.properties # Configurações
```

## 📝 Licença

Este projeto está sob a licença MIT.
