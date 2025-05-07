import './ProgressBar.css';
import { useBilhete } from '../context/BilheteContext';

const ProgressBar = () => {
  const { passoAtual, totalPasso, tipoBilhete } = useBilhete();

  const passosPorTipo = {
    hotels: ["Escolha dos dados do Hotel", "Escolha do Hotel", "Confirmação e Pagamento"],
    idaevolta: ["Escolha dos dados do Voo", "Escolha dos Voos", "Escolha do Hotel", "Confirmação e Pagamento"],
    ida: ["Escolha dos dados do Voo", "Escolha do Voo", "Confirmação e Pagamento"],
  };

  const nomesPassos = passosPorTipo[tipoBilhete] || [];

  return (
    <div className='ContainerGeral'>
      <div className="progress-container">
        <div className="progress-bar-fundo" />
        <div
          className="progress-bar-verde"
          style={{ width: `${((passoAtual - 1) / (totalPasso - 1)) * 100}%` }}
        />
        <div className="progress-etapas">
          {nomesPassos.map((nome, i) => {
            const numero = i + 1;
            const concluido = numero < passoAtual;
            const atual = numero === passoAtual;

            return (
              <div className="etapa-wrapper" key={numero}>
                <div
                  className={`bolinha ${concluido ? 'concluido' : atual ? 'atual' : ''}`}
                >
                  {concluido ? '✔' : numero}
                </div>
                <div className="etapa-nome">{nome}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
