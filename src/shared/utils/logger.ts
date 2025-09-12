type LogLevel = "debug" | "info" | "warn" | "error";

interface Logger {
  debug: (message: string, ...meta: unknown[]) => void;
  info: (message: string, ...meta: unknown[]) => void;
  warn: (message: string, ...meta: unknown[]) => void;
  error: (message: string, ...meta: unknown[]) => void;
}

const formatMessage = (level: LogLevel, message: string) =>
  `[${level.toUpperCase()}] ${new Date().toISOString()}: ${message}`;

export const logger: Logger = {
  debug: (message, ...meta) => {
    if (process.env.NODE_ENV === "dev") {
      console.debug(formatMessage("debug", message), ...meta);
    }
  },
  info: (message, ...meta) => {
    console.log(formatMessage("info", message), ...meta);
  },
  warn: (message, ...meta) => {
    console.warn(formatMessage("warn", message), ...meta);
  },
  error: (message, ...meta) => {
    console.error(formatMessage("error", message), ...meta);
  },
};
