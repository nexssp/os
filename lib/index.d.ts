import * as legacy from '../../legacy'; // Import types from legacy.d.ts

// Define options for the nexssOS constructor
export interface NexssOSOptions {
  /** Cache instance (if used, requires a start method) */
  cache?: { start: () => void;[key: string]: any };
  /** Progress indicator flag (currently unused in type definition) */
  progress?: boolean;
  /** Cache duration string (e.g., '1w', '1d', '1h') */
  cacheDuration?: string;
}

// Define options for command execution functions (install, update, etc.)
export interface CommandOptions {
  /** If true, returns the command string instead of executing it. */
  dry?: boolean;
  /** If true, attempts to capture and return output as JSON (behavior might vary). */
  json?: boolean;
  /** Passed to nSpawn - specify stdio behavior ('inherit', 'pipe', etc.) */
  stdio?: 'inherit' | 'pipe' | 'ignore' | NodeJS.StdioOptions;
}

// Define options for the 'where' command
export interface WhereOptions {
  /** If true, returns all found paths separated by newlines. Otherwise, returns the first found path. */
  all?: boolean;
  /** If true, returns the command string instead of executing it. */
  dry?: boolean;
}

// Define options for the internal 'cmd' function
export interface CmdOptions {
  /** If true, returns all found paths separated by newlines. */
  all?: boolean;
  /** If true, returns the command string instead of executing it. */
  dry?: boolean;
}

// Define the structure of the object returned by the nexssOS factory function
export interface NexssOSInstance {
  /**
   * Installs packages using the appropriate package manager.
   * @param args Package name(s) or arguments for the install command.
   * @param options Command execution options.
   * @returns The command string if `dry` is true, otherwise the result of the execution (may vary, often void or process info/output).
   */
  install(args: string | string[], options?: CommandOptions): string | unknown;

  /**
   * Uninstalls packages using the appropriate package manager.
   * @param args Package name(s) or arguments for the uninstall command.
   * @param options Command execution options.
   * @returns The command string if `dry` is true, otherwise the result of the execution.
   */
  uninstall(args: string | string[], options?: CommandOptions): string | unknown;

  /**
   * Updates package lists or specific packages using the appropriate package manager.
   * @param args Package name(s) or arguments for the update command.
   * @param options Command execution options.
   * @returns The command string if `dry` is true, otherwise the result of the execution.
   */
  update(args: string | string[], options?: CommandOptions): string | unknown;

  /**
   * Searches for packages using the appropriate package manager.
   * @param args Search term(s) or arguments for the search command.
   * @param options Command execution options.
   * @returns The command string if `dry` is true, otherwise the result of the execution.
   */
  search(args: string | string[], options?: CommandOptions): string | unknown;

  /** Initializes internal state (called automatically on first use). */
  start(): void; // Assuming start returns void based on JS code

  /**
   * Finds the path(s) of an executable command.
   * @param command The command to locate.
   * @param options Where command options.
   * @returns The path(s) as a string, or `false` if not found. Returns the `where` command string if `dry` is true.
   */
  where(command: string, options?: WhereOptions): string | false;

  /**
   * Checks if a command exists and returns its path. Handles WSL path checking.
   * @param pkg The command/package name.
   * @returns The path as a string, or `false` if not found.
   */
  checkPath(pkg: string): string | false;

  /**
   * Internal helper to create command execution functions.
   * @param command Base command (e.g., 'where', 'command -v').
   * @param options Cmd options.
   * @returns A function that takes the command argument and returns the result or the constructed command string.
   */
  cmd(command: string, options?: CmdOptions): (what: string) => string | false;

  /** Re-export of `isRoot` from legacy */
  isRoot: typeof legacy.isRoot;
  /** Re-export of `sudo` from legacy */
  sudo: typeof legacy.sudo;
  /** Re-export of `name` from legacy */
  name: typeof legacy.name;
  /** Re-export of `v` from legacy */
  v: typeof legacy.v;
  /** Re-export of `distros` from legacy */
  distros: typeof legacy.distros;
  /** Re-export of `get` from legacy */
  get: typeof legacy.get;
  /** Re-export of `getPM` from legacy */
  getPM: typeof legacy.getPM;
  /** Alias for getPM */
  getPackageManager: typeof legacy.getPM;
  /** Re-export of `tags` from legacy */
  tags: typeof legacy.tags;
  /** Re-export of `getTags` from legacy */
  getTags: typeof legacy.getTags;
  /** Re-export of `replacePMByDistro` from legacy */
  replacePMByDistro: typeof legacy.replacePMByDistro;
  /** Re-export of `getShell` (uses internal `getShell2`) */
  getShell: (distro?: string) => string | true | undefined; // Adjusted return type based on getShell2 logic
  /** Re-export of `pathWinToLinux` from legacy */
  pathWinToLinux: typeof legacy.pathWinToLinux;
}

/**
 * Creates an nexssOS instance with OS-specific utility functions.
 * @param options Configuration options for the nexssOS instance.
 * @returns An object containing various OS utility functions.
 */
declare function nexssOS(options?: NexssOSOptions): NexssOSInstance;

export default nexssOS;

export function install(args: string[], options?: InstallOptions): any;
export function uninstall(args: string[], options?: InstallOptions): any;
export function update(args: string[], options?: InstallOptions): any;
export function search(args: string[], options?: InstallOptions): any;
export function where(command: string, options?: WhereOptions): string | false;
