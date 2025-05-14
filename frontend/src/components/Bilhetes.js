export const BilhetesId = async (id) => {
    try {
      const res = await fetch('https://backend-theta-blue-74.vercel.app/bilhete', {
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

export const BilheteVoo = async (id) => {
    try {
      const res = await fetch('https://backend-theta-blue-74.vercel.app/bilhetevoo', {
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

export const BilheteHotel = async (id) => {
    try {
      const res = await fetch('https://backend-theta-blue-74.vercel.app/bilhetehotel', {
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

export const Pagamento = async (id) => {
    try {
      const res = await fetch('https://backend-theta-blue-74.vercel.app/pagamento', {
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

export const CriaBilhete = async (id) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/criarBilhete', {
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

export const procuraLugar = async (numero_quarto, id_viagem) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/lugarid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero_quarto, id_viagem })
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

export const procuraQuarto = async (numero_quarto, id_hotel) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/quartoid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero_quarto, id_hotel })
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

export const maxBilhete = async (id_user) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/maxbilhete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_user })
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

export const updateLugar = async (id_lugar) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/disponivelugar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_lugar })
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

export const updateQuarto = async (id_quarto) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/disponivelquarto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_quarto })
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

export const inserirlugar = async (id_bilhete, id_lugar) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/inserirlugar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_bilhete, id_lugar })
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

export const inserirQuarto = async (id_bilhete, id_quarto, data_inicio, data_fim) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/inserirquarto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_bilhete, id_quarto, data_inicio, data_fim })
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

export const criarpagamento = async (id_bilhete, preco, id_estado, id_tipo, email) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/criarpag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_bilhete, preco, id_estado, id_tipo, email })
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

