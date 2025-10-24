import axios, { AxiosInstance } from 'axios'
import apiBase from '../../configApi'

export default class CrudService<T> {
  protected api: AxiosInstance
  protected endpointBase: string

  constructor(endpointBase: string) {
    this.api = axios.create({
      baseURL: apiBase.defaults.baseURL,
      headers: { 'Content-Type': 'application/json' }
    })
    this.endpointBase = endpointBase
  }

  async getAll(params?: Record<string, any>): Promise<T[]> {
    const response = await this.api.get<T[]>(`/${this.endpointBase}`, { params })
    return response.data
  }

  async getById(id: number | string): Promise<T> {
    const response = await this.api.get<T>(`/${this.endpointBase}/${id}`)
    return response.data
  }

  async create(data: T): Promise<T> {
    const response = await this.api.post<T>(`/${this.endpointBase}`, data)
    return response.data
  }

  async update(id: number | string, data: T): Promise<T> {
    const response = await this.api.put<T>(`/${this.endpointBase}/${id}`, data)
    return response.data
  }

  async delete(id: number | string): Promise<void> {
    await this.api.delete(`/${this.endpointBase}/${id}`)
  }
}
