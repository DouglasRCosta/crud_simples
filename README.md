# crud_simples


necessário mysql

npm i 

npm run dev

altere as credencias necessária no .env


foi usado o postman com body em raw, mas pode ser usado outro ou fazendo em node mesmo.



---------------cadastro------------------------
POST http://localhost:5000/user/signup

body
{
    "firstName": "teste",
    "lastName": "teste",
    "email": "teste@teste.com",
    "password": "teste"
}


---------------------login---------------------

POST http://localhost:5000/user/signin

body
{
    "email": "teste@teste.com",
    "password": "teste"
}


-------------obtem dados de um usuario ---------------

GET http://localhost:5000/user/4 <<< 4 user id


------------edita dados ------------------

PUT http://localhost:5000/user/me  << todos os dados podem ser editados até o email mas será comparado no banco para ver se é existente

cookies  jwt=exemplo   <<< colocado automaticamente o header pelo backend talves seja necessário manualmente dependendo de voce esteja fazendo

body
{
    "firstName": "testeEditado",
    "lastName": "testeEditado",
    "email": "teste@teste.com",
    "password": "editado"
}


-------------obtem dados --------------

GET http://localhost:5000/user/me 

cookies  jwt=exemplo 

---------------deleta user--------------

DELETE http://localhost:5000/user/me 

cookies  jwt=exemplo 

body
{
    "firstName": "testeEditado",
    "lastName": "testeEditado",
    "email": "teste@teste.com",
    "password": "editado"
}


------------cria post -----------

POST http://localhost:5000/post

cookies  jwt=exemplo 

body{
    "title":"titulo 13","content":"texto 7"
}


----------------like-----------------------

POST http://localhost:5000/post/like?postId=14af3d7f-c407-400c-8029-b029dab19dfc1680886135376 << id exemplo

cookies  jwt=exemplo 


-------------obtem post do usuario------------

GET http://localhost:5000/post/my

cookies  jwt=exemplo 


------------obtem os ultimos  por paginas ------------

GET http://localhost:5000/post?page=0 <<< paginação


----------obtem um post pelo id ---------

GET http://localhost:5000/post?postId=a6d5d9c0-413a-461e-8399-d3040ce4a78e1681398805720 << pega um post pelo id


------deleta post -----------

DELETE http://localhost:5000/post

cookies  jwt=exemplo 

body {"postId":"a6d5d9c0-413a-461e-8399-d3040ce4a78e1681398805720"}
