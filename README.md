# PP Restaurante
#### _Churrascaria, Chopperia e Restaurante_
Site do restaurante PP, desenvolvido com a biblioteca React, com o objetivo de atender os pedidos de marmita. O projeto priorizou a acessibilidade, de modo que algumas funcionalidades podem ser feitas de duas formas, pois o público alvo do estabelecimento são pessoas com idade avançada e de pouca afinidade com tecnologia.

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black) ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

## Descrição
O projeto é uma *Single-Page Application* feita com componentes **React** e estilizados com [Styled-Components](https://styled-components.com/). O **TypeScript** foi utilizado para declarar os tipos das variáveis **JavaScript** e dos objetos armazenados no banco de dados.

Foi utilizado o framework [NextJS](https://nextjs.org/) para criar o projeto e atender às novas recomendações da documentação do [React](https://react.dev/learn/start-a-new-react-project). O *NextJs* também ofereceu outros recursos extras, que o *React* puro não possui, como a renderização do lado do servidor (Server-Side Rendering - SSR) e o sistema de roteamento.

As informações dos usuários e o cardápio foram salvas em um banco de dados do [Firebase](https://firebase.google.com/?hl=pt-br). Essa plataforma também foi utilizada no sistema de autenticação dos usuários com as suas próprias contas do *Google*, dispensando assim o armazenamento de imagens de perfil, e-mails e senhas no banco de dados.

O banco de dados do Firebase foi configurado com regras, que restringem o acesso de algumas informações apenas aos administradores do site. Desse modo, um cliente (usuário) consegue acessar as suas informações cadastradas no  banco de dados, mas não consegue acessar as informações de outros usuários.

<img src="./src/assets/animation1.gif" alt="gif"/>

## Instruções
A tela inicial (**Home**) mostras as informações de horário de funcionamento, a localização e contato do estabelecimento, além de um botão que direciona o usuário à página do cardápio e um outro botão para fazer *signin* com a sua conta do *Google*. O cabecalho da página é fixo e permite a navegação entre as rotas "Home", "Cardápio" e "Entrega".

A rota **Cardápio** mostra os produtos do cardápio do dia na rota raiz da página, permitindo que o usuário adicione os ingredientes que ele desejar em sua marmita. As informações ficam salvas no *localStorage* do *browser*, então mesmo que a página seja reiniciada, o cliente poderá continuar montando a sua marmita. Os ingredientes são classificados pelos tipos: "bases", "carnes", "hortaliças" e "preparos", que se tornam rotas aninhadas à rota raiz da página "cardápio". O cliente pode escolher quantos ingredientes quiser, exceto os tipos de carne, que é restrito a dois tipos.

Após escolher os ingredientes, o cliente deve clicar no botão "Revisar Marmita", que aparece no momento que forem escolhidos no mínimo três ingredientes. A revisão é feita na rota raiz da página "cardápio", onde o cliente pode conferir todos os ingredientes escolhidos e ainda definir o tamanho da marmita, para então enviar essa marmita para a sacola de compras.

Antes de acessar a sacola de compras na página "entrega", o cliente é interceptado por um *Higher-Order Component (HOC)*, que verifica se há um usuário logado e se todas as informações de contato e endereço estão preenchidas. Caso essas informações não estejam preenchidas, o cliente é redirecionado para a página de "perfil", onde deverá preencher todos os dados e só então acessar a página de "entrega".

A rota **Entrega** mostra todas as marmitas montadas, com seus respectivos ingredientes e tamanhos. Logo abaixo tem um formulário para que o cliente escolha a forma de pagamento e uma opção para escolher se deseja fazer a retirada das marmitas no restaurante, já que é cobrado o valor de R$5,00 para realizar a entrega no endereço cadastrado. Após clicar no botão de "Enviar Pedido", o usuário é redirecionado para a página "perfil", onde ele acompanhará o status do pedido feito.

Na rota **Perfil**, é possível acompanhar os pedidos feitos no dia, ver o histórico de pedidos e alterar os dados cadastrados. Caso o cliente queira entrar em contato com o restaurante, em cada pedido feito no dia, há um botão que coleta todos os dados do pedido e os converte em formato URL-encoded, para que o cliente seja redirecionado para o whatsapp do restaurante e então envie o seu pedido já formatado.

A administração do restaurante pode utilizar de um perfil autorizado pelo banco de dados, para acessar a rota protegida **Admin**, onde é possível: definir a disponibilidade dos produtos no cardápio do dia; visualizar os pedidos do dia para definir seus status; visualizar o histórico de pedidos; visualizar os clientes cadastrados e seus dados; cadastrar e excluir produtos do banco de dados.

<img src="./src/assets/animation2.gif" alt="gif"/>

> Caso você seja um desenvolvedor, use as instruções abaixo para instalar as dependências e sugerir alterações para a aplicação.

É possível verificar o conteúdo de cada versão, selecionando a *branch* específica e o histórico de [commits].

Após baixar o projeto deste repositório, dentro do diretório do projeto você deve usar o comando `npm install` em um terminal, para gerar a pasta **node_modules**.
```sh
npm install
```
Concluída a instalação das dependências do projeto, use o comando `npm run dev` para visualizar a aplicação na porta [localhost:3000](http://localhost:3000).
```sh
npm run dev
```
A página irá recarregar a cada alteração feita no código e mostrará eventuais erros no console.

É recomendado que você use o comando `npm run build` antes de fazer um *commit*, para verficar a ocorrência de erros na aplicação e garantir o deploy da aplicação.
```sh
npm run build
```

## Histórico de versões

Clique nas versões abaixo, para observar a evolução do projeto ao longo do tempo.

| Versão | Update |
| ------ | ------ |
| [versão_0.1](https://pp-restaurante-git-v01-pedropaivadev.vercel.app/) | Primeira versão do projeto. |
| [versão_0.2](https://pp-restaurante-git-v02-pedropaivadev.vercel.app/) | Permite o administrador do estabelecimento: fazer o cadastro de novos produtos; alterar o cardápio do dia em tempo real, conforme os ingredientes se esgotam; armazenar no banco de dados os pedidos dos clintes, para análisar as vendas; |
| [versão_0.3](https://pp-restaurante-git-v03-pedropaivadev.vercel.app/) | Em desenvolvimento: Inserir os testes automatizados dos componentes; Permitir admin ver o peril do cliente, clicando no nome do mesmo no pedido; Aba na página de admin, para controlar pagamentos; |

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[commits]: <https://github.com/PedroPaivaDev/pp-restaurante/commits/main>