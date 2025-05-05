const express = require('express');
const cors = require('cors');
const db = require('./Config/db');
const nodemailer = require('nodemailer');
const bcryptjs = require('bcryptjs');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const codigos2FA = new Map();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "flyeasyofficial@gmail.com", 
    pass: "gcrfmebfwajsrdai"
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
        Utilizador.Palavra_passe,
        Tipo_Utilizador.Nome_Tipo, 
        Pais.Nome_Pais 
      FROM 
        Utilizador
      INNER JOIN Pais ON Utilizador.Id_Pais = Pais.Id 
      INNER JOIN Tipo_Utilizador ON Utilizador.Id_Tipo_Utilizador = Tipo_Utilizador.Id
      WHERE Utilizador.Email = ?;
    `;
  
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).send(err);
      if(results.length == 0) {
        return res.status(500).send(err);
      }
      const match = await bcryptjs.compare(password, results[0].Palavra_passe);
      if(!match){
        return res.status(500).send(err);
      }
      return res.json(results);
    });
  });

  app.post('/api/loginId', (req, res) => {
    const { id } = req.body;
  
    const query = `
      SELECT
        Utilizador.Id,
        Utilizador.Nome, 
        Utilizador.Email, 
        Utilizador.Telemovel, 
        Utilizador.Ativo_2FA, 
        Utilizador.Data_Aniversario,
        Utilizador.Palavra_passe,
        Tipo_Utilizador.Nome_Tipo, 
        Pais.Nome_Pais 
      FROM 
        Utilizador
      INNER JOIN Pais ON Utilizador.Id_Pais = Pais.Id 
      INNER JOIN Tipo_Utilizador ON Utilizador.Id_Tipo_Utilizador = Tipo_Utilizador.Id
      WHERE Utilizador.Id = ?;
    `;
  
    db.query(query, [id], async (err, results) => {
      if (err) return res.status(500).send(err);
      if(results.length == 0) {
        return res.status(500).send(err);
      }
      return res.json(results);
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

app.post('/api/createuser', async (req, res) => {

  const { nome, email, tele, data_aniversario, password, id_pais } = req.body;
  const query = `INSERT INTO Utilizador(Nome, Email, Telemovel, Data_Aniversario, Palavra_passe, Id_Pais) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  const salt =  await bcryptjs.genSalt(10);
  const hashedpass = await bcryptjs.hash(password, salt);

  db.query(query, [nome, email, tele, data_aniversario, hashedpass, id_pais], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });

  const mailOptions = {
    from: 'flyeasyofficial@gmail.com',
    to: email,
    subject: 'Registo',
    text: `Olá\nO seu registo ${nome} foi concluido com sucesso\nA equipa da FlyEasy`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar email:', error);
      return res.status(500).json({ mensagem: 'Erro ao enviar o email' });
    }
    res.status(200).json({ mensagem: 'Código enviado com sucesso' });
  });

});

app.post('/api/updateUserPass', async (req, res) => {

  const {Id, password} = req.body;
  const query = `UPDATE Utilizador
  SET Palavra_passe = ?
  WHERE Id = ?`;

  const salt =  await bcryptjs.genSalt(10);
  const hashedpass = await bcryptjs.hash(password, salt);

  db.query(query, [hashedpass, Id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/updateUserData', (req, res) => {

  const {email, tele, fa, Id} = req.body;
  const query = `UPDATE Utilizador
  SET Email = ?, Telemovel = ?, Ativo_2FA = ? 
  WHERE Id = ?`;

  db.query(query, [email, tele, fa, Id], (err, results) => {
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

app.post('/api/bilhete', async (req, res) => {

  const { id } = req.body; 

  const query = `
    SELECT *
    FROM Bilhete
    WHERE Id_Utilizador = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });

});


app.post('/api/bilhetevoo', async (req, res) => {

  const { id } = req.body; 


  const query = `
    SELECT Bilhete_Lugar.Id_Bilhete,
     l.Lugar,
     a1.Nome AS Aeroporto_Origem,
     a2.Nome AS Aeroporto_Destino,
     Companhia_Aerea.Nome AS Companhia_Aerea,
     Companhia_Aerea.Abreviacao, 
     v.Data_Partida, v.Data_Chegada, 
     Classe.Tipo_Classe 
     FROM Bilhete_Lugar 
     INNER join Lugar AS l on Bilhete_Lugar.Id_Lugar = l.Id 
     INNER JOIN Viagem AS v ON l.Id_Viagem = v.Id 
     INNER JOIN Aeroporto AS a1 ON v.Id_Aeroporto_Origem = a1.Id 
     INNER JOIN Aeroporto AS a2 ON v.Id_Aeroporto_Destino = a2.Id 
     INNER JOIN Companhia_Aerea ON v.Id_Companhia_Aerea = Companhia_Aerea.Id 
     INNER JOIN Classe ON v.Id_Classe = Classe.Id 
     WHERE Id_Bilhete = ?
    ORDER BY v.Data_Partida;
  `;

  db.query(query, id, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });

});

app.post('/api/bilhetehotel', async (req, res) => {

  const { id } = req.body; 

  const query = `
    SELECT Id_Bilhete, 
    Data_Inicio,
    Data_Fim,
    Hotel.Nome, 
    Quarto.Numero_Quarto 
    FROM Bilhete_Quarto 
    INNER JOIN Quarto ON Bilhete_Quarto.Id_Quarto = Quarto.Id 
    INNER JOIN Hotel on Quarto.Id_Hotel = Hotel.Id 
    WHERE Id_Bilhete = ?;
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });

});


app.post('/api/pagamento', async (req, res) => {

  const { id } = req.body; 

  const query = `
    SELECT Pagamento.Data_Pagamento,
     Pagamento.Preco,
     Estado.Tipo_Estado,
     Estado.Cor,
     Tipo_Pagamento.Tipo_Pagamento
     FROM Pagamento 
     INNER JOIN Estado ON Pagamento.Id_Estado_Pagamento = Estado.Id
     INNER JOIN Tipo_Pagamento on Pagamento.Id_Tipo_Pagamento = Tipo_Pagamento.Id
    WHERE Pagamento.Id_Bilhete = ?;
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });

});

app.post('/api/mostrarHoteis', async (req, res) => {

  const { nome, pessoas} = req.body; 

  const query = `
    SELECT Hotel.Id AS Id_Hotel,
    COUNT(Quarto.Numero_Quarto) AS Quartos_Disponiveis, 
    Hotel.Nome,
    Hotel.Morada, 
    Hotel.Lotacao, 
    Hotel.Avaliacao, 
    Pais.Nome_Pais 
    FROM Quarto 
    INNER JOIN Hotel ON Quarto.Id_Hotel = Hotel.Id 
    INNER JOIN Pais ON Hotel.Id_Pais = Pais.Id 
    WHERE Hotel.Morada LIKE ? AND Quarto.Id_Disponivel = 1 
    GROUP BY Hotel.Id 
    HAVING COUNT(Quarto.Numero_Quarto) >= ? ;
  `;

  db.query(query, [nome, pessoas], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });

});

app.post('/api/mostrarVoos', async (req, res) => {

  const { aero1, aero2, data_inicio, classe, pessoas } = req.body; 

  const query = `
    SELECT 
    a1.Id AS Id_Aeroporto_Origem,
    a1.Nome AS Nome_Aeroporto_Origem,
    a2.Id AS Id_Aeroporto_Destino,
    a2.Nome AS Nome_Aeroporto_Destino,
    v.Id AS Id_Viagem,
    ca.Nome AS Companhia_Aerea,
    p1.Nome_Pais AS Pais_Origem,
    p2.Nome_Pais AS Pais_Destino,
    c.Tipo_Classe,
    v.Data_Partida,
    v.Data_Chegada,
    v.Preco,
    COUNT(l.Id) AS Lugares_Disponiveis
    FROM 
    Lugar l
    INNER JOIN Viagem v ON l.Id_Viagem = v.Id
    INNER JOIN Aeroporto a1 ON v.Id_Aeroporto_Origem = a1.Id
    INNER JOIN Aeroporto a2 ON v.Id_Aeroporto_Destino = a2.Id
    INNER JOIN Companhia_Aerea ca ON v.Id_Companhia_Aerea = ca.Id
    INNER JOIN Pais p1 ON a1.Id_Pais = p1.Id
    INNER JOIN Pais p2 ON a2.Id_Pais = p2.Id
    INNER JOIN Classe c ON v.Id_Classe = c.Id
    WHERE 
    l.Id_Disponivel = 1
    AND a1.Morada LIKE ?
    AND a2.Morada LIKE ?
    AND DATE(v.Data_Partida) = ?
    AND c.Id = ?
    GROUP BY 
    v.Id,
    a1.Id,
    a1.Nome,
    a2.Id,
    a2.Nome,
    ca.Nome,
    p1.Nome_Pais,
    p2.Nome_Pais,
    c.Tipo_Classe,
    v.Data_Partida,
    v.Data_Chegada,
    v.Preco
    HAVING 
    COUNT(l.Id) >= ?;
  `;
    
  db.query(query, [aero1, aero2, data_inicio, classe, pessoas], (err, results) => {
    if (err) {
      console.error("Erro na query:");
      console.error("Valores:", [aero1, aero2, data_inicio]);
      console.error("Erro MySQL:", err.sqlMessage);
      return res.status(500).json({ erro: "Erro ao buscar voos" });
    }
    res.json(results);
  });
  

});


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));