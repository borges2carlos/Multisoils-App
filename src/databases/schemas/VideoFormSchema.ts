export type TVideoForm = {
  assetId: string,
  fileName: string,
  type: string,
  uri: string,
}

export const VideoFormSchema = {
  name: "VideoForm",
  properties: {
    assetId: "string",
    fileName: "string",
    type: "string",
    uri: "string",
  },
}
