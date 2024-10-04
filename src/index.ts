import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Cidade } from './@types/cidade'
import { Cliente } from './@types/cliente'
import { ClienteContrato } from './@types/cliente_contrato'
import { SuOSSChamado } from './@types/su_oss_chamado'
import { RadpopRadioClienteFibra } from './@types/radpop_radio_cliente_fibra'
import { SuDiagnostico } from './@types/su_diagnostico'
import { SuOSSAssunto } from './@types/su_oss_assunto'
import { Funcionarios } from './@types/funcionarios'
import { FnAReceber } from './@types/fn_areceber'
import { SuOSSChamadoMensagem } from './@types/su_oss_chamado_mensagem'
import { SuOSSChamadoExecutar } from './@types/su_oss_chamado_executar'
import { SuTicket } from './@types/su_ticket'
import { WflTarefa } from './@types/wfl_tarefa'
import { SuOSSChamadoFechar } from './@types/su_oss_chamado_fechar'
import { RadpopRadio } from './@types/radpop_radio'

type UriColumnMap = {
  cliente: keyof Cliente
  su_oss_chamado: keyof SuOSSChamado
  cidade: keyof Cidade
  cliente_contrato: keyof ClienteContrato
  radpop_radio_cliente_fibra: keyof RadpopRadioClienteFibra
  su_diagnostico: keyof SuDiagnostico
  su_oss_assunto: keyof SuOSSAssunto
  funcionarios: keyof Funcionarios
  fn_areceber: keyof FnAReceber
  su_oss_chamado_mensagem: keyof SuOSSChamadoMensagem
  su_ticket: keyof SuTicket
  wfl_tarefa: keyof WflTarefa
  radpop_radio: keyof RadpopRadio
}

type Uri = keyof UriColumnMap

type UriBody = {
  su_oss_chamado_executar: SuOSSChamadoExecutar
  su_oss_chamado_fechar: SuOSSChamadoFechar
}

type UriPost = keyof UriBody

export type IXCResponse<T> = {
  page: string
  total: number
  registros?: T[]
}

type UriReturnMap = {
  cliente: IXCResponse<Cliente>
  su_oss_chamado: IXCResponse<SuOSSChamado>
  cidade: IXCResponse<Cidade>
  cliente_contrato: IXCResponse<ClienteContrato>
  radpop_radio_cliente_fibra: IXCResponse<RadpopRadioClienteFibra>
  su_diagnostico: IXCResponse<SuDiagnostico>
  su_oss_assunto: IXCResponse<SuOSSAssunto>
  funcionarios: IXCResponse<Funcionarios>
  fn_areceber: IXCResponse<FnAReceber>
  su_oss_chamado_mensagem: IXCResponse<SuOSSChamadoMensagem>
  su_ticket: IXCResponse<SuTicket>
  wfl_tarefa: IXCResponse<WflTarefa>
  radpop_radio: IXCResponse<RadpopRadio>
}

type Operator = '=' | '>' | '<' | '!='

type GridParam<T extends Uri> = {
  TB: UriColumnMap[T]
  OP: Operator
  P: string
}

type IXCQuery<T extends Uri> = {
  qtype: UriColumnMap[T]
  query: string
  oper: Operator
  page?: string
  rp?: string
  sortname?: UriColumnMap[T]
  sortorder?: 'asc' | 'desc'
  grid_param?: GridParam<T>[]
}

type IXCPostResponse = {
  type: string
  message: string
  id: number
  atualiza_campos: {
    tipo: string
    campo: string
    valor: string
  }[]
}

type IXCConfig = {
  baseURL: string
  token: string
}

class IXC {
  private fetch: AxiosInstance

  constructor(config: IXCConfig) {
    const { baseURL, token } = config

    this.fetch = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(token).toString('base64'),
        get: {
          ixcsoft: 'listar',
        },
      },
    })
  }

  static create(config: IXCConfig): IXC {
    return new IXC(config)
  }

  get = async <T extends Uri>(
    uri: T,
    { qtype, grid_param, ...rest }: IXCQuery<T>,
  ): Promise<AxiosResponse<UriReturnMap[T]>> =>
    await this.fetch({
      method: 'GET',
      url: uri,
      data: {
        qtype: `${uri}.${qtype}`,
        grid_param: JSON.stringify(grid_param),
        ...rest,
      },
    })

  post = async <T extends UriPost>(
    uri: T,
    data: UriBody[T],
  ): Promise<AxiosResponse<IXCPostResponse>> =>
    await this.fetch({
      method: 'POST',
      url: uri,
      data,
    })
}

export default IXC

export {
  IXC,
  Cidade,
  Cliente,
  ClienteContrato,
  SuOSSChamado,
  RadpopRadioClienteFibra,
  SuDiagnostico,
  SuOSSAssunto,
  FnAReceber,
  SuTicket,
  WflTarefa,
  RadpopRadio,
}
