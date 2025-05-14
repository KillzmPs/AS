export const RecomendacaoHoteis = async (nome, pessoas) => {
    try {
      const res = await fetch('https://backend-theta-blue-74.vercel.app/mostrarHoteis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, pessoas })
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

export const RecomendacaoVoo = async (aero1, aero2, data_inicio, classe, pessoas) => {
    try {
      const res = await fetch('https://backend-theta-blue-74.vercel.app/mostrarVoos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aero1, aero2, data_inicio, classe, pessoas })
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

export const Lugares = async (id_viagem) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/mostrarLugares', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_viagem })
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

export const Quartos = async (id_viagem) => {
  try {
    const res = await fetch('https://backend-theta-blue-74.vercel.app/mostrarquarto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_viagem })
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