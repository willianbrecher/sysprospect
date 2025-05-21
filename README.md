# SysProspect

| Frontend      | Backend              | Database
| ------------- | -------------------- | ----------- |
| React + Vite  | Kotlin + Springboot  |  Postgresql |
| Cypress       | maven                |             |
| Node 20.x.x+  | jdk 21               |             |
| PrimeReact    |                      |             |

## Informações
 - O backend quando executado local ou via docker expõe a 8080 para acesso a API
 - Na Url ```http://localhost:8080/swagger-ui/index.html``` fica disponível informações da API
 - O frontend quando executado local roda na porta 5173
 - Junto no projeto existe uma pasta consumer. Essa pasta é apenas pra validar se as mensagens chegam no SNS. Ele fica bucando mensagens e mostra no console.
   Para utilizar, deve entrar na pasta consumer e rodar o comando ```node consumer.js``` depois que o localstack estiver rodando 
 - Foi implementado uma rota extra na aplicação onde é possivel ver os cadastros realizados e também edita-los, apenas para controle, caso queira utilizar.
   - Docker: ```http://localhost:8090/Leads ```
   - Local:  ```http://localhost:5173/Leads```
   ![image](https://github.com/user-attachments/assets/36536487-51f6-4280-a0db-0feddfe89863)
 - Tanto o frontend quanto o backend possui alguns testes implementados.
   - Frontend: ```yarn test:e2e``` (esse precisa que o backend esteja rodando)
   - Backend:  ```mvn test```
## Execução
  - Local
    - Primeiro é necessário ter uma banco de dados postgresql disponível e configura-lo no backend.
    ![image](https://github.com/user-attachments/assets/12e3615c-bda3-4f3d-8a1c-445b578e7f42)
    - No caso do ambiente de desenvolvimento, esta desabilitado o envio para o SNS por questões de necessidade de configurar AWS ou Localstack primeiro. A aplicação funciona e apenas não envia para o SNS.
    ![image](https://github.com/user-attachments/assets/f60b86f1-93cb-4c2c-8313-4b54d4742e36)
     
      - Executar Backend: ```mvn clean package -Pprod -DskipTests```
      - Executar Frontend: ```yarn dev```

  - Docker
    - A execução via docker-compose esta configurada no projeto, basta ter o docker instalado na máquina e executar o comando: ```docker-compose up```
    - A execução via docker já vai subir o backend, frontent e o localstack
    ![image](https://github.com/user-attachments/assets/26a5fe86-6da5-4cc5-9f1f-0c63cb80ea9d)
    - Para acessar a a aplicação basta acessa ```http://localhost:8090```
    ![image](https://github.com/user-attachments/assets/97c9fb61-ffbe-473e-b85d-71b8fc63ec64)

    
