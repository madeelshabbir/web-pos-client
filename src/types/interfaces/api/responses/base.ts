export interface ResponseBase extends Record<string, any> {
  message?: string,
  error?: Record<string, string>,
}
