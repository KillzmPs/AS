
export const fetchCountries = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/paises');
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
