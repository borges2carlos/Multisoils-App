export type TImageForm = {
  assetId: string,
  fileName: string,
  type: string,
  uri: string,
}

export const ImageFormSchema = {
  name: "ImageForm",
  properties: {
    assetId: "string",
    fileName: "string",
    type: "string",
    uri: "string",
  },
}
