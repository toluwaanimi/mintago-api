// This interface defines the shape of an environment object
export interface IEnvironmentInterface {
  getPort(): number; // Method to retrieve the port number
  getEnvironment(): string; // Method to retrieve the environment name
  getDatastore(): string; // Method to retrieve the datastore name
  getSupabaseUrl(): string; // Method to retrieve the Supabase URL
  getSupabaseKey(): string; // Method to retrieve the Supabase key
}
