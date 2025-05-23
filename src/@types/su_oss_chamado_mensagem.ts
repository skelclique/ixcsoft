export type SuOSSChamadoMensagem = {
  latitude: string
  longitude: string
  gps_time: string
  id: string
  id_chamado: string
  status: string
  data: string
  id_evento: string
  mensagem: string
  id_tecnico: string
  tipo_cobranca: string
  id_operador: string
  data_inicio: string
  data_final: string
  id_equipe: string
  id_proxima_tarefa: string
  finaliza_processo: string
  id_resposta: string
  id_evento_status: string
}

export type SuOSSChamadoMensagemPost = {
  latitude?: string
  longitude?: string
  gps_time?: string
  id?: string
  id_chamado: string
  status: string
  data?: string
  id_evento: string
  mensagem: string
  id_tecnico?: string
  tipo_cobranca: string
  id_operador?: string
  data_inicio?: string
  data_final?: string
  id_equipe?: string
  id_proxima_tarefa?: string
  finaliza_processo: string
  id_resposta?: string
  id_evento_status?: string
}
