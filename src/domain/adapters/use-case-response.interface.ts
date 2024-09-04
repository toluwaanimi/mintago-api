// This interface defines the shape of a generic use case response
export interface IUseCaseResponse<T = any, U = any> {
  data?: T; // Data of the use case response
  meta?: U; // Metadata of the use case response
}
