# PDriver

Este é um projeto de estudo para criar um clone do Google Drive utilizando Next.js, Prisma ORM, Tailwind CSS e Firebase. O objetivo é aprender e praticar o desenvolvimento web full-stack, explorando tecnologias modernas e populares.

## Funcionalidades Principais

- **Autenticação de Usuários:** Os usuários podem criar contas e fazer login usando o Next Auth, que simplifica o processo de autenticação no Next.js.
- **Armazenamento de Arquivos:** Os usuários podem fazer upload e armazenar arquivos no Firebase Storage, simulando a funcionalidade de armazenamento do Google Drive.
- **Gerenciamento de Arquivos:** Os usuários podem visualizar, renomear, excluir e organizar seus arquivos em pastas.
- **Segurança:** O acesso aos arquivos é protegido e os usuários só podem acessar, modificar ou excluir seus próprios arquivos.

## Tecnologias Utilizadas

- **Next.js:** Framework React para construção de aplicativos web modernos.
- **Prisma ORM:** Biblioteca ORM (Object-Relational Mapping) para interagir com o banco de dados SQL de forma fácil e segura.
- **Tailwind CSS:** Framework CSS utilitário para desenvolvimento de interfaces modernas e responsivas.
- **Next Auth:** Biblioteca de autenticação para Next.js, simplificando o processo de autenticação de usuários.
- **Firebase:** Plataforma de desenvolvimento de aplicativos da Google, incluindo Firebase Authentication para autenticação de usuários e Firebase Storage para armazenamento de arquivos.

## Como Executar o Projeto

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina.

1. **Clonar o repositório:**

   ```
   git clone https://github.com/Preduh/pdriver.git
   ```

2. **Instalar as dependências:**

   ```
   cd pdriver
   pnpm install
   ```

3. **Configurar as Variáveis de Ambiente:**

   - Copie o conteúdo do arquivo `.env.example` para `.env`.
   - Preencha as variáveis de ambiente necessárias, como chaves de API do Firebase e as credenciais para autenticação com o Github, no arquivo `.env`.

4. **Iniciar o banco de dados com o Docker:**

   ```
   docker-compose up -d
   ```

5. **Executar o servidor de desenvolvimento:**

   ```
   pnpm run dev
   ```

6. **Acessar o aplicativo:**
   O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000) no seu navegador.

## Contribuição

Contribuições são bem-vindas! Se você quiser melhorar este projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
