# Sistema de Licitações - Front-end

Este é o front-end do Sistema de Licitações, desenvolvido em React, que permite a visualização de informações sobre processos licitatórios.

## Demonstração
Você pode acessar o deploy deste projeto no Netlify:  
[Deploy do Front-end](https://chipper-taiyaki-f862b9.netlify.app)
- *E-mail*: usuario@teste.com
- *Senha*: 123

**Importante**: Se rodar localmente, o projeto só conseguirá consumir a API a partir de `localhost:5173`, devido a restrições de CORS.

## Funcionalidades
- Exibição de diferentes modalidades de licitação.
- Filtro por ano e exibição das licitações por modalidade e data.
- Visualização de anexos e observações de cada licitação.
- Responsivo para diferentes tamanhos de tela.

## Tecnologias utilizadas
- **React**: Biblioteca principal para construção da interface.
- **Axios**: Para realizar requisições HTTP.
- **Styled-Components**: Framework para estilização e criação de componentes de UI.

## Como rodar o projeto localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/viniccius-dev/frontend-sistema-licitacoes.git

2. **Instale as dependências**:
   ```bash
   npm install

3. **Iniciei o servidor de desenvolvimento**
   ```bash
   npm run dev

4. **Abra o navegador e vá para http://localhost:5173**
