// This interface defines the shape of a generic service interface
export interface IServiceInterface<T = any, U = any> {
  data?: T; // Data of the service response
  meta?: U; // Metadata of the service response
}
