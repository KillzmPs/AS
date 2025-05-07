export const BilhetesId = async (id) => {
    try {
      const res = await fetch('http://localhost:5000/api/bilhete', {
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
      const res = await fetch('http://localhost:5000/api/bilhetevoo', {
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
      const res = await fetch('http://localhost:5000/api/bilhetehotel', {
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
      const res = await fetch('http://localhost:5000/api/pagamento', {
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
    const res = await fetch('http://localhost:5000/api/criarBilhete', {
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
    const res = await fetch('http://localhost:5000/api/lugarid', {
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
    const res = await fetch('http://localhost:5000/api/quartoid', {
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
    const res = await fetch('http://localhost:5000/api/maxbilhete', {
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
    const res = await fetch('http://localhost:5000/api/disponivelugar', {
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
    const res = await fetch('http://localhost:5000/api/disponivelquarto', {
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
    const res = await fetch('http://localhost:5000/api/inserirlugar', {
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
    const res = await fetch('http://localhost:5000/api/inserirquarto', {
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
    const res = await fetch('http://localhost:5000/api/criarpag', {
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

