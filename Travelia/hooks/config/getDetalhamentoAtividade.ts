// utils/getDetalhamentoAtividade.ts
const getDetalhamentoAtividade = (nomeAtividade: string, atividadesFull: any[]) => {
  const lowerNome = nomeAtividade.toLowerCase();
  
  // Lista de atividades que NUNCA têm horário no seu JSON
  const SEM_HORARIO = [
    // Refeições (principal foco)
    'almoço',
    'jantar', 
    'café da manhã',
    
    // Tempo livre
    'tarde livre',
    'manhã livre',
    'dia livre',
    'tempo livre',
    'descanso',
    
    // Processos hotel
    'check-in',
    'check-out',
    
    // Transportes
    'transfer',
    'chegada',
    'partida',
    
    // Genéricos
    'compras',
    'fotos',
    'orientações'
  ];
  
  // 1. Verifica se é atividade sem horário
  const isSemHorario = SEM_HORARIO.some(termo => lowerNome.includes(termo));
  
  if (isSemHorario) {
    // Sugere horário inteligente baseado no contexto
    let horarioSugerido = '09:00'; // padrão
    
    if (lowerNome.includes('café da manhã')) horarioSugerido = '08:00';
    else if (lowerNome.includes('almoço')) horarioSugerido = '12:30';
    else if (lowerNome.includes('jantar')) horarioSugerido = '19:30';
    else if (lowerNome.includes('tarde')) horarioSugerido = '14:00';
    else if (lowerNome.includes('manhã')) horarioSugerido = '10:00';
    else if (lowerNome.includes('check-in')) horarioSugerido = '15:00';
    else if (lowerNome.includes('check-out')) horarioSugerido = '11:00';
    else if (lowerNome.includes('transfer') || lowerNome.includes('chegada')) horarioSugerido = 'conforme voo';
    
    return {
      titulo: nomeAtividade,
      horario: horarioSugerido,
      tipo: 'sem_horario' // flag importante
    };
  }
  
  // 2. Busca em atividades com horário definido
  const detalhe = atividadesFull.find((a: any) => a.nome === nomeAtividade);
  if (detalhe && detalhe.horario) {
    return {
      titulo: detalhe.nome,
      horario: detalhe.horario.split(' - ')[0], // pega início do horário
      tipo: detalhe.id_atividade
    };
  }
  
  // 3. Fallback para atividades não encontradas
  return { 
    titulo: nomeAtividade, 
    horario: "09:00", // horário padrão genérico
    tipo: null 
  };
};

export default getDetalhamentoAtividade;