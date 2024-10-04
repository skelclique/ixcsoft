export type SuOSSChamadoFechar = {
  id_chamado: string
  id_tarefa_atual?: string
  eh_tarefa_decisao?: string
  sequencia_atual?: string
  proxima_sequencia_forcada?: string
  finaliza_processo?: string
  finaliza_processo_aux?: string
  gera_comissao_aux?: string
  id_processo?: string
  data_inicio: string
  data_final: string
  mensagem: string
  id_tecnico: string
  status: string
  data?: string
  id_evento?: string
  id_su_diagnostico?: string
  justificativa_sla_atrasado?: string
  id_evento_status?: string
  id_proxima_tarefa?: string
  id_proxima_tarefa_aux?: string
  latitude?: string
  longitude?: string
  gps_time?: string
}
