
export const fetchClasses = async () => {
    try {
        const response = await fetch('https://backend-theta-blue-74.vercel.app/Recomendacoes');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error(error);
        return [];
    }
};
