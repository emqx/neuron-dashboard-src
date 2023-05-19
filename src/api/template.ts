import http from '@/utils/http'
import type { AxiosResponse } from 'axios'
import type { RawTemplateData, TemplateFormData } from '@/types/config'

export const queryTemplateList = async (): Promise<Array<RawTemplateData>> => {
  const { data }: AxiosResponse<{ error: number; templates: Array<RawTemplateData> }> = await http.get('/template')
  return Promise.resolve(data?.templates || [])
}

// without name，delete all
export const deleteTemplate = async (templateName?: string): Promise<AxiosResponse> => {
  return http.delete('/template', {
    params: { name: templateName },
  })
}

export const createTemplate = async (data: TemplateFormData): Promise<AxiosResponse> => {
  return http.post('/template', data)
}

export const updateTemplate = async (data: TemplateFormData): Promise<AxiosResponse> => {
  return http.post('/template', data)
}

export const getTemplateDetailByName = async (templateName: string): Promise<AxiosResponse> => {
  return http.get('/template', { params: { name: templateName } })
}