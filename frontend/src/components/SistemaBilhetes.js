export const RecomendacaoHoteis = async (nome, pessoas) => {
    try {
      const res = await fetch('http://localhost:5000/api/mostrarHoteis', {
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
      const res = await fetch('http://localhost:5000/api/mostrarVoos', {
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