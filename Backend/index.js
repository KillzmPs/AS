const express = require('express');
const cors = require('cors');
const db = require('./Config/db');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const codigos2FA = new Map();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "flyeasyofficial@gmail.com", 
    pass: "xsulwgudolgdqzdm"
  }
});

app.get('/api/bilhetes', (req, res) => {
    db.query('SELECT * FROM Pagamento INNER JOIN Bilhete ON Pagamento.Id_Bilhete = Bilhete.Id INNER JOIN Bilhete_Lugar ON Bilhete.Id = Bilhete_Lugar.Id_Bilhete INNER JOIN Lugar ON Bilhete_Lugar.Id_Lugar = Lugar.Id INNER JOIN Viagem ON Lugar.Id_Viagem = Viagem.Id INNER JOIN Aeroporto AS Aeroporto_Origem ON Viagem.Id_Aeroporto_Origem = Aeroporto_Origem.Id INNER JOIN Aeroporto AS Aeroporto_Destino ON Viagem.Id_Aeroporto_Destino = Aeroporto_Destino.Id INNER JOIN Pais AS Pais_Aeroporto ON Aeroporto_Origem.Id_Pais = Pais_Aeroporto.Id INNER JOIN Bilhete_Quarto ON Bilhete.Id = Bilhete_Quarto.Id_Bilhete INNER JOIN Quarto ON Bilhete_Quarto.Id_Quarto = Quarto.Id INNER JOIN Hotel ON Quarto.Id_Hotel = Hotel.Id INNER JOIN Tipo_Quarto ON Quarto.Id_Tipo_Quarto = Tipo_Quarto.Id INNER JOIN Utilizador ON Bilhete.Id_Utilizador = Utilizador.Id INNER JOIN Pais AS Pais_Utilizador ON Utilizador.Id_Pais = Pais_Utilizador.Id INNER JOIN Tipo_Utilizador ON Utilizador.Id_Tipo_Utilizador = Tipo_Utilizador.Id INNER JOIN Estado ON Pagamento.Id_Estado_Pagamento = Estado.Id INNER JOIN Tipo_Pagamento ON Pagamento.Id_Tipo_Pagamento = Tipo_Pagamento.Id;', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/api/aeroportos', (req, res) => {
    db.query('SELECT Aeroporto.Id, Aeroporto.Nome, Aeroporto.Morada, Pais.Nome_Pais FROM Aeroporto INNER JOIN Pais ON Aeroporto.Id_Pais = Pais.Id;', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/api/quartos', (req, res) => {
    db.query('SELECT Quarto.Id, Hotel.Nome, Quarto.Numero_Quarto, Tipo_Quarto.Nome_Tipo_Quarto, Quarto.Preco, Disponibilidade.Disponivel, Pais.Nome_Pais From Quarto INNER JOIN Hotel ON Quarto.Id_Hotel = Hotel.Id INNER JOIN Tipo_Quarto ON Quarto.Id_Tipo_Quarto = Tipo_Quarto.Id INNER JOIN Disponibilidade ON Quarto.Id_Tipo_Quarto = Disponibilidade.Id INNER JOIN Pais ON Hotel.Id_Pais = Pais.Id;', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/utilizadores', (req, res) => {
    const { email, password } = req.body;
  
    const query = `
      SELECT 
        Utilizador.Id, 
        Utilizador.Nome, 
        Utilizador.Email, 
        Utilizador.Telemovel, 
        Utilizador.Ativo_2FA, 
        Utilizador.Data_Aniversario,
        Tipo_Utilizador.Nome_Tipo, 
        Pais.Nome_Pais 
      FROM 
        Utilizador
      INNER JOIN Pais ON Utilizador.Id_Pais = Pais.Id 
      INNER JOIN Tipo_Utilizador ON Utilizador.Id_Tipo_Utilizador = Tipo_Utilizador.Id
      WHERE Utilizador.Email = ? AND Utilizador.Palavra_Passe = ?;
    `;
  
    db.query(query, [email, password], (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });


  app.post('/api/emails', (req, res) => {
    const { email } = req.body;
  
    const query = `
      SELECT 
        Utilizador.Id, 
        Utilizador.Nome, 
        Utilizador.Email, 
        Utilizador.Telemovel, 
        Utilizador.Ativo_2FA, 
        Tipo_Utilizador.Nome_Tipo, 
        Pais.Nome_Pais 
      FROM 
        Utilizador
      INNER JOIN Pais ON Utilizador.Id_Pais = Pais.Id 
      INNER JOIN Tipo_Utilizador ON Utilizador.Id_Tipo_Utilizador = Tipo_Utilizador.Id
      WHERE Utilizador.Email = ?;
    `;
  
    db.query(query, email, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });
app.post('/api/createuser', (req, res) => {

  const { nome, email, tele, data_aniversario, password, id_pais } = req.body;
  const query = `INSERT INTO Utilizador(Nome, Email, Telemovel, Data_Aniversario, Palavra_passe, Id_Pais) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome, email, tele, data_aniversario, password, id_pais], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/api/classes', (req, res) => {
    db.query('SELECT * FROM Classe;', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});


app.get('/api/paises', (req, res) => {
  db.query('SELECT * FROM Pais;', (err, results) => {
      if(err) return res.status(500).send(err);
      res.json(results);
  });
});

app.get('/api/recomendacoes', (req, res) => {
    db.query('SELECT Viagem.Id, Viagem.Data_Partida, Viagem.Data_Chegada, Companhia_Aerea.Abreviacao, Aeroporto_Origem.Nome AS Aeroporto_Origem, Aeroporto_Destino.Nome AS Aeroporto_Destino, COUNT(Lugar.Id_Disponivel) AS lugares_ocupados, Companhia_Aerea.Nome, Classe.Tipo_Classe, Viagem.Preco, Pais.Nome_Pais As Pais_Origem, pais_destino.Nome_Pais as pais_destino FROM Lugar INNER JOIN Viagem ON Lugar.Id_Viagem = Viagem.Id INNER JOIN Companhia_Aerea ON Viagem.Id_Companhia_Aerea = Companhia_Aerea.Id INNER JOIN Aeroporto AS Aeroporto_Origem ON Viagem.Id_Aeroporto_Origem = Aeroporto_Origem.Id INNER JOIN Aeroporto AS Aeroporto_Destino ON Viagem.Id_Aeroporto_Destino = Aeroporto_Destino.Id INNER JOIN Classe ON Viagem.Id_Classe = Classe.Id INNER join Pais ON Aeroporto_Origem.Id_Pais = Pais.Id inner join Pais as pais_destino on Aeroporto_Destino.Id_Pais = pais_destino.Id WHERE Lugar.Id_Disponivel = 2 GROUP BY Viagem.Id, Aeroporto_Origem.Nome, Aeroporto_Destino.Nome, Companhia_Aerea.Nome ORDER BY lugares_ocupados DESC LIMIT 4;', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/2fa/send', (req, res) => {
  const { email } = req.body;
  const codigo = Math.floor(100000 + Math.random() * 900000);
  codigos2FA.set(email, codigo);

  const mailOptions = {
    from: 'flyeasyofficial@gmail.com',
    to: email,
    subject: 'Código de Verificação 2FA',
    text: `Olá\nO seu código de verificação é: ${codigo}\nA equipa da FlyEasy`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar email:', error);
      return res.status(500).json({ mensagem: 'Erro ao enviar o email' });
    }
    res.status(200).json({ mensagem: 'Código enviado com sucesso' });
  });
});

app.post('/api/2fa/verify', (req, res) => {
  const { email, codigo } = req.body;
  const codigoGuardado = codigos2FA.get(email);

  if (codigoGuardado && parseInt(codigo) === parseInt(codigoGuardado)) {
    codigos2FA.delete(email); 
    res.status(200).json({ sucesso: true, mensagem: 'Código verificado com sucesso' });
  } else {
    res.status(400).json({ sucesso: false, mensagem: 'Código inválido ou expirado' });
  }
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));