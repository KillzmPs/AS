export const Login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/utilizadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) {
        throw new Error('Erro inesperado ao autenticar');
      }
  
      const data = await res.json();
      return data;
  
    } catch (error) {
      console.error(error);
      return { erro: 'Erro de rede ou servidor' };
    }
};

export const Login2 = async (id) => {
  try {
    const res = await fetch('http://localhost:5000/api/loginId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    
    if (!res.ok) {
      throw new Error('Erro inesperado ao autenticar');
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    return { erro: 'Erro de rede ou servidor' };
  }
};

export const veriEmail = async (email) => {
  try {
    const res = await fetch('http://localhost:5000/api/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (!res.ok) {
      throw new Error('Erro inesperado ao autenticar');
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    return { erro: 'Erro de rede ou servidor' };
  }
};

export const Register = async (nome, email, tele, data_aniversario, password, id_pais) => {
  try {
    const res = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, tele, data_aniversario, password, id_pais })
    });
    
    if (!res.ok) {
      throw new Error('Erro inesperado ao registar');
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    return { erro: 'Erro de rede ou servidor' };
  }
};

export const send2FACode = async (email) => {
  const response = await fetch("http://localhost:5000/api/2fa/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await response.json();
};

export const verify2FACode = async (email, codigo) => {
  const response = await fetch("http://localhost:5000/api/2fa/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, codigo }),
  });
  return await response.json();
};

export const updatePass = async (Id, password) => {
  try {
    const res = await fetch('http://localhost:5000/api/updateUserPass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({Id, password})
    });
    
    if (!res.ok) {
      throw new Error('Erro inesperado ao autenticar');
    }
    
    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    return { erro: 'Erro de rede ou servidor' };
  }
};

export const updateData = async (Id, email, tele, fa) => {
  try {
    const res = await fetch('http://localhost:5000/api/updateUserData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, tele, fa, Id})
    });
    
    if (!res.ok) {
      throw new Error('Erro inesperado ao autenticar');
    }
    
    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    return { erro: 'Erro de rede ou servidor' };
  }
};

export const Pass2 = async (email) => {
  try {
    const res = await fetch('http://localhost:5000/api/NovaPass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email})
    });
    
    if (!res.ok) {
      throw new Error('Erro inesperado ao autenticar');
    }
    
    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    return { erro: 'Erro de rede ou servidor' };
  }
};