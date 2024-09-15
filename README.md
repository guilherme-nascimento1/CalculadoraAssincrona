Calculadora Assíncrona
Este projeto é uma aplicação de calculadora assíncrona, onde o objetivo principal é demonstrar o fluxo de processamento assíncrono de dados, utilizando RabbitMQ para mensageria, MongoDB como banco de dados e uma arquitetura distribuída com Node.js, C#, e Angular.

🛠️ Tecnologias Utilizadas
Node.js: API de backend.
Angular: Frontend.
C#: Worker para consumir e processar mensagens da fila do RabbitMQ.
MongoDB: Banco de dados NoSQL para armazenar cálculos.
RabbitMQ: Mensageria para processamento assíncrono.
Docker: Containerização de serviços para simplificar o setup. Utilizado para o MongoDB e RabbitMQ.
🚀 Fluxo de Funcionamento
Frontend (Angular): O usuário interage com o frontend e envia dois números através de um formulário. Os dados são enviados para a API em Node.js.

API (Node.js): A API recebe os números, armazena no MongoDB com status "pending", e envia uma mensagem para o RabbitMQ para processamento assíncrono.

RabbitMQ: A fila do RabbitMQ gerencia a comunicação entre a API e o Worker. A API publica o ID do cálculo na fila.

Worker (C#): O Worker consome a fila, busca os dados no MongoDB, processa a operação (soma dos números) e atualiza o status para "done" junto com o resultado final.

MongoDB: Armazena tanto o cálculo quanto o status de processamento e o resultado final.


## Explicação para rodar o projeto



### 1. **Instalação e configuração do Backend (Node.js)**

## Docker
 - Estou utilizando o mongodb e o rabbitmq no docker, então é possivel rodar o comando docker-compose build, para iniciar os containers.

1. **Clone o repositório**:
   - Comece clonando o repositório para a sua máquina local:
     ```bash
     git clone https://github.com/guilherme-nascimento1/CalculadoraAssincrona.git
     ```

2. **Acesse a pasta da API**:
   - Entre na pasta **api**:
     ```bash
     cd seu-repositorio/api
     ```

3. **Instale as dependências**:
   - Instale todas as dependências necessárias para a API:
     ```bash
     npm install
     ```

4. **Crie o arquivo `.env`**:
   - Crie um arquivo **.env** com as variáveis de ambiente necessárias. Exemplo:
     ```bash
     MONGO_URL='mongodb://127.0.0.1:27017/calculator'
     RABBITMQ_URL='amqp://localhost'
     ```

5. **Compile o TypeScript**:
   - Compile o código TypeScript para JavaScript:
     ```bash
     npm run build
     ```

6. **Inicie a API**:
   - Para iniciar a API e deixá-la rodando, execute o comando:
     ```bash
     npm run start
     ```

A API estará disponível em [http://localhost:3000](http://localhost:3000).

---

### 2. **Instalação e configuração do Frontend (Angular)**

1. **Acesse a pasta do Frontend**:
   - Saia da pasta **api** e entre na pasta **frontend-angular**:
     ```bash
     cd ../frontend-angular
     ```

2. **Instale as dependências**:
   - Instale todas as dependências necessárias para o frontend:
     ```bash
     npm install
     ```

3. **Inicie o servidor Angular**:
   - Para rodar o frontend Angular, execute o comando:
     ```bash
     ng serve
     ```

O frontend estará disponível em [http://localhost:4200](http://localhost:4200).

---

### 3. **Instalação e configuração do Worker (C#)**

1. **Acesse a pasta do Worker**:
   - Saia da pasta **frontend-angular** e entre na pasta **worker-csharp**:
     ```bash
     cd ../worker-csharp
     ```

2. **Compile o Worker**:
   - Compile o projeto C# com o seguinte comando:
     ```bash
     dotnet build
     ```

3. **Inicie o Worker**:
   - Para iniciar o Worker e deixá-lo consumindo mensagens do RabbitMQ, execute o comando:
     ```bash
     dotnet run
     ```

---

### 4. **Rodando com Docker (opcional)**

Se preferir rodar todo o projeto com **Docker**, siga os passos abaixo:

1. **Verifique se o Docker está instalado**:
   - Certifique-se de que você tem o **Docker** e o **Docker Compose** instalados na sua máquina.

2. **Acesse a raiz do projeto**:
   - Acesse a pasta raiz do projeto:
     ```bash
     cd seu-repositorio
     ```

3. **Inicie todos os serviços com Docker Compose**:
   - Execute o seguinte comando para subir os containers do **Node.js**, **Angular**, **Worker C#**, **MongoDB** e **RabbitMQ**:
     ```bash
     docker-compose up --build
     ```

O Docker Compose irá subir todos os serviços de uma vez só. Certifique-se de que as portas necessárias (3000, 4200, etc.) estejam disponíveis.

---

### 5. **Testando a aplicação**

Agora que você tem todos os serviços rodando, você pode testar a aplicação. Aqui está o fluxo básico:

1. **Acesse o Frontend**:
   - Abra o navegador e vá para [http://localhost:4200](http://localhost:4200).
   - Preencha o formulário com dois números e envie o cálculo.

2. **API em Node.js**:
   - A API em **Node.js** irá receber os números, armazená-los no **MongoDB** com o status "pending", e então enfileirar uma mensagem para o **RabbitMQ**.

3. **Worker C#**:
   - O Worker, rodando em **C#**, irá consumir a mensagem da fila no RabbitMQ, processar o cálculo (neste caso, a soma dos dois números), e atualizar o resultado no **MongoDB** com o status "done".

4. **Verifique o resultado**:
   - O resultado será exibido no frontend quando o cálculo for processado pelo Worker e o MongoDB for atualizado.
---

