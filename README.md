<!DOCTYPE html>
<html lang="en">
<head>
<body>


<h1>Imagens e GIF do Projeto</h1>

<div class="container">
    <img src="https://drive.google.com/uc?export=view&id=1D_0smPui3biK1rdQABVmrIWSHCqp6li6" alt="Imagem 1">
    <img src="https://drive.google.com/uc?export=view&id=1n6d7-aJ9oCUs7fzyxOD_pO5kESbSbIHi" alt="Imagem 2">
    <img src="https://drive.google.com/uc?export=view&id=1Krflf5PJI3NnyjbNYFEtj8V5mfA7tqoL" alt="Imagem 3">
    <img src="https://drive.google.com/uc?export=view&id=11kyI9rzK3he7aVXFNnJ5916iYaYzidce" alt="Imagem 4">
    <img src="https://drive.google.com/uc?export=view&id=1_QKolfb4IQozF3nOYEeRDtaH0m4Mv4uk" alt="Imagem 5">
</div>

<h2>GIF</h2>
<img src="https://drive.google.com/uc?export=view&id=1xrZAgYnTpVQ8g9HXczJLX_UtiuN9k1Gv" alt="GIF">


<h1>Calculadora Assíncrona</h1>

<p>Este projeto é uma aplicação de <strong>calculadora assíncrona</strong>, onde o objetivo principal é demonstrar o fluxo de processamento assíncrono de dados, utilizando <strong>RabbitMQ</strong> para mensageria, <strong>MongoDB</strong> como banco de dados, e uma arquitetura distribuída com <strong>Node.js</strong>, <strong>C#</strong> e <strong>Angular</strong>.</p>

<hr>

<h2>🛠️ Tecnologias Utilizadas</h2>
<ul>
    <li><strong>Node.js</strong>: API de backend.</li>
    <li><strong>Angular</strong>: Frontend.</li>
    <li><strong>C#</strong>: Worker para consumir e processar mensagens da fila do <strong>RabbitMQ</strong>.</li>
    <li><strong>MongoDB</strong>: Banco de dados NoSQL para armazenar cálculos.</li>
    <li><strong>RabbitMQ</strong>: Mensageria para processamento assíncrono.</li>
    <li><strong>Docker</strong>: Containerização de serviços para simplificar o setup. Utilizado para o MongoDB e RabbitMQ.</li>
</ul>

<hr>

<h2>🚀 Fluxo de Funcionamento</h2>
<ol>
    <li><strong>Frontend (Angular)</strong>: O usuário interage com o frontend e envia dois números através de um formulário. Os dados são enviados para a API em <strong>Node.js</strong>.</li>
    <li><strong>API (Node.js)</strong>: A API recebe os números, armazena no <strong>MongoDB</strong> com status "pending", e envia uma mensagem para o <strong>RabbitMQ</strong> para processamento assíncrono.</li>
    <li><strong>RabbitMQ</strong>: A fila do RabbitMQ gerencia a comunicação entre a API e o Worker. A API publica o ID do cálculo na fila.</li>
    <li><strong>Worker (C#)</strong>: O Worker consome a fila, busca os dados no MongoDB, processa a operação (soma dos números) e atualiza o status para "done" junto com o resultado final.</li>
    <li><strong>MongoDB</strong>: Armazena tanto o cálculo quanto o status de processamento e o resultado final.</li>
</ol>

<hr>

<h2>🛠️ Como Executar o Projeto</h2>

<h3>1. Instalação e Configuração do Backend (Node.js)</h3>

<h4>Docker</h4>
<p>Utilizando o MongoDB e RabbitMQ no Docker. Para iniciar os containers, execute:</p>
<pre><code>docker-compose build</code></pre>

<h4>Passos para rodar o Backend</h4>
<ol>
    <li><strong>Clone o repositório:</strong>
        <pre><code>git clone https://github.com/guilherme-nascimento1/CalculadoraAssincrona.git</code></pre>
    </li>
    <li><strong>Acesse a pasta da API:</strong>
        <pre><code>cd seu-repositorio/api</code></pre>
    </li>
    <li><strong>Instale as dependências:</strong>
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Crie o arquivo `.env`:</strong>
        <pre><code>
MONGO_URL='mongodb://127.0.0.1:27017/calculator'
RABBITMQ_URL='amqp://localhost'
        </code></pre>
    </li>
    <li><strong>Compile o TypeScript:</strong>
        <pre><code>npm run build</code></pre>
    </li>
    <li><strong>Inicie a API:</strong>
        <pre><code>npm run start</code></pre>
    </li>
</ol>

<p>A API estará disponível em <a href="http://localhost:3000">http://localhost:3000</a>.</p>

<hr>

<h3>2. Instalação e Configuração do Frontend (Angular)</h3>
<ol>
    <li><strong>Acesse a pasta do Frontend:</strong>
        <pre><code>cd ../frontend-angular</code></pre>
    </li>
    <li><strong>Instale as dependências:</strong>
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Inicie o servidor Angular:</strong>
        <pre><code>ng serve</code></pre>
    </li>
</ol>

<p>O frontend estará disponível em <a href="http://localhost:4200">http://localhost:4200</a>.</p>

<hr>

<h3>3. Instalação e Configuração do Worker (C#)</h3>
<ol>
    <li><strong>Acesse a pasta do Worker:</strong>
        <pre><code>cd ../worker-csharp</code></pre>
    </li>
    <li><strong>Compile o Worker:</strong>
        <pre><code>dotnet build</code></pre>
    </li>
    <li><strong>Inicie o Worker:</strong>
        <pre><code>dotnet run</code></pre>
    </li>
</ol>


<h3>5. Testando a Aplicação</h3>
<ol>
    <li><strong>Acesse o Frontend</strong>: Abra o navegador e vá para <a href="http://localhost:4200">http://localhost:4200</a>. Preencha o formulário com dois números e envie o cálculo.</li>
    <li><strong>API em Node.js</strong>: A API em <strong>Node.js</strong> recebe os números, armazena-os no <strong>MongoDB</strong> com status "pending", e enfileira uma mensagem para o <strong>RabbitMQ</strong>.</li>
    <li><strong>Worker C#</strong>: O Worker, rodando em <strong>C#</strong>, consome a mensagem da fila no <strong>RabbitMQ</strong>, processa o cálculo, e atualiza o resultado no <strong>MongoDB</strong> com status "done".</li>
    <li><strong>Verifique o Resultado</strong>: O resultado será exibido no frontend quando o cálculo for processado pelo Worker e o <strong>MongoDB</strong> for atualizado.</li>
</ol>

</body>
</html>
