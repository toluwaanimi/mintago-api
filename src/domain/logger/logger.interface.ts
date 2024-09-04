export interface ILogger {
  debug(context: string, message: string): void; // Method for logging debug messages
  log(context: string, message: string): void; // Method for logging standard messages
  error(context: string, message: string, trace?: string): void; // Method for logging error messages
  warn(context: string, message: string): void; // Method for logging warning messages
  verbose(context: string, message: string): void; // Method for logging verbose messages
}
