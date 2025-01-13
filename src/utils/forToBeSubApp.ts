export const isSubApp = window.__POWERED_BY_QIANKUN__

export function replacePath(
  path: string,
  version: string,
  orgId: string,
  projectId: string,
  serviceId: string,
): string {
  const pathArray = path.split('/')
  pathArray[2] = version
  pathArray[4] = orgId
  pathArray[5] = projectId
  pathArray[6] = serviceId
  return pathArray.join('/')
}

// Modify according to the integrated version, such as the integrated `neuron` version `2.5.1`, please modify the version to `v2.5.1`
export const IntegratedVersion = '2.6.0'
export const IntegratePublicPath = `/integration/neuron/v${IntegratedVersion}`

export const getIntegratedAPI = (serviceId: string, url: string) => `/api/edgeservice/proxy/${serviceId}/api/v2${url}`
