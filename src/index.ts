import axios, { AxiosInstance } from 'axios'
import { Cidade } from './@types/cidade'
import { Cliente } from './@types/cliente'
import { ClienteContrato } from './@types/cliente_contrato'
import { SuOSSChamado } from './@types/su_oss_chamado'
import { RadpopRadioClienteFibra } from './@types/radpop_radio_cliente_fibra'
import { SuDiagnostico } from './@types/su_diagnostico'
import { SuOSSAssunto } from './@types/su_oss_assunto'
import { Funcionarios } from './@types/funcionarios'

type UriColumnMap = {
  cliente: keyof Cliente
  su_oss_chamado: keyof SuOSSChamado
  cidade: keyof Cidade
  cliente_contrato: keyof ClienteContrato
  radpop_radio_cliente_fibra: keyof RadpopRadioClienteFibra
  su_diagnostico: keyof SuDiagnostico
  su_oss_assunto: keyof SuOSSAssunto
  funcionarios: keyof Funcionarios
}

type Uri = keyof UriColumnMap

type IXCReturn<T> = {
  page: string
  total: number
  registros?: T[]
}

type UriReturnMap = {
  cliente: IXCReturn<Cliente>
  su_oss_chamado: IXCReturn<SuOSSChamado>
  cidade: IXCReturn<Cidade>
  cliente_contrato: IXCReturn<ClienteContrato>
  radpop_radio_cliente_fibra: IXCReturn<RadpopRadioClienteFibra>
  su_diagnostico: IXCReturn<SuDiagnostico>
  su_oss_assunto: IXCReturn<SuOSSAssunto>
  funcionarios: IXCReturn<Funcionarios>
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
  ): Promise<UriReturnMap[T]> =>
    await this.fetch({
      method: 'GET',
      url: uri,
      data: {
        qtype: `${uri}.${qtype}`,
        grid_param: JSON.stringify(grid_param),
        ...rest,
      },
    })
      .then((response) => response.data)
      .catch((err) => err)

  post = async <T extends Uri>(
    uri: T,
    { qtype, ...rest }: IXCQuery<T>,
  ): Promise<UriReturnMap[T]> =>
    await this.fetch({
      method: 'GET',
      url: uri,
      data: {
        qtype: `${uri}.${qtype}`,
        ...rest,
      },
    })
      .then((response) => response.data)
      .catch((err) => err)
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
}
