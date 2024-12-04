# Profissoes Frontend

Este é o repositório do frontend do **Gerenciamento de Profissões**, desenvolvido com **Next.js**. O projeto utiliza **Tailwind CSS** para estilização e **SweetAlert2** para notificações, garantindo uma interface moderna e amigável.

---

## **Requisitos**
Antes de começar, certifique-se de ter os seguintes itens instalados:

- **Node.js** (v16 ou superior)
- **npm** (ou **yarn**)

---

## **Como Rodar o Projeto**

1. **Clonar o Repositório**

```bash
# Clone o repositório
$ git clone <url-do-repositorio>

# Acesse o diretório
$ cd profissao-frontend
```

2. **Instalar Dependências**

```bash
# Instale as dependências do projeto
$ npm install
```

3. **Configurar Variáveis de Ambiente**

No arquivo `next.config.mjs`, configure a URL da API:

```javascript
const nextConfig = {
  env: {
    API_URL: 'http://127.0.0.1:8000/', // URL da API Laravel
  },
};

export default nextConfig;
```

4. **Rodar o Servidor de Desenvolvimento**

```bash
# Inicie o servidor de desenvolvimento
$ npm run dev
```

Por padrão, o projeto estará disponível em: `http://localhost:3000`

---

## **Estrutura do Projeto**

### **Principais Pastas**

- **`components/`**: Contém componentes reutilizáveis, como:
  - `Modal.js`: Modal utilizado para cadastrar e editar profissões.
  - `Table.js`: Tabela que lista as profissões e gerencia as ações (editar e excluir).

- **`services/`**: Contém funções que fazem chamadas à API, como:
  - `profissoesService.js`: Gerencia requisições CRUD para a API de profissões.
  - `formatDinheiro.js`: Função para formatar valores monetários no padrão brasileiro (BRL).

- **`src/app/page.js`**: Componente principal da aplicação, que integra os componentes e gerencia os estados do frontend.

### **Tecnologias Utilizadas**

- **Next.js**: Framework React para renderização no lado do cliente e servidor.
- **Tailwind CSS**: Framework para estilização.
- **SweetAlert2**: Biblioteca para notificações visuais (ex.: sucesso, erro, confirmação).
- **react-number-format**: Biblioteca para formatação de campos monetários.

---

## **Funcionalidades**

### 1. **Gerenciamento de Profissões**
- Listar todas as profissões com formatação monetária.
- Cadastrar novas profissões.
- Editar profissões existentes.
- Excluir profissões com confirmação visual.

### 2. **Filtro de Busca**
- Campo de pesquisa que permite buscar profissões por:
  - **Nome**
  - **Empresa**
  - **Salário** (busca maior ou igual ao valor informado).

---

## **Como Usar**

### Cadastrar Profissão
1. Clique no botão **Cadastrar Profissão**.
2. Preencha os campos obrigatórios: Nome, Descrição, Salário e Empresa.
3. Clique em **Salvar**.

### Visualizar Descrição
1. Clique no botão 📘 na linha correspondente à profissão.
2. Uma janela exibirá a descrição da profissão.

### Editar Profissão
1. Clique no ícone ✏️ na linha correspondente à profissão.
2. Altere os campos desejados.
3. Clique em **Salvar**.

### Excluir Profissão
1. Clique no ícone 🗑️ na linha correspondente à profissão.
2. Confirme a exclusão na janela de diálogo.

### Pesquisar Profissões
1. Digite um termo no campo **Pesquisar...** (nome, empresa ou valor de salário).
2. Clique no botão **Buscar**.
3. A tabela será atualizada com os resultados filtrados.
4. filtre vazio pra listar todos

---

## **Observações**

1. Certifique-se de que a API (backend) está rodando antes de iniciar o frontend.
2. A API deve estar configurada para permitir requisições CORS do domínio `http://localhost:3000`.
3. Os valores de salário são enviados para a API como números (`float`), mesmo sendo formatados no frontend.

---

## **Contribuição**

Sinta-se à vontade para contribuir com melhorias. Faça um fork do projeto, crie uma branch com sua feature e envie um pull request!
