// Define the structure of the distro info object returned by get()
export interface DistroInfo {
  ID?: string;
  NAME?: string;
  VERSION?: string;
  VERSION_ID?: string;
  PRETTY_NAME?: string;
  HOME_URL?: string;
  BUG_REPORT_URL?: string;
  [key: string]: string | undefined; // Allow other potential string properties
}

// Define the type for the distros mapping
export type Distros = {
  readonly ALPINE: 'Alpine Linux';
  readonly AMAZON: 'Amazon Linux';
  readonly AMAZON_AMI: 'Amazon Linux AMI';
  readonly ARCH: 'Arch Linux';
  readonly CENTOS: 'CentOS Linux';
  readonly DEBIAN: 'Debian GNU/Linux';
  readonly FREEBSD: 'FreeBSD';
  readonly FEDORA: 'Fedora';
  readonly GENTOO: 'Gentoo';
  readonly KALI: 'Kali GNU/Linux';
  readonly MINT: 'Linux Mint';
  readonly NIXOS: 'NixOS';
  readonly ORACLE: 'Oracle Linux Server';
  readonly RHEL: 'RHEL Linux';
  readonly SUSE_LEAP: 'openSUSE Leap';
  readonly SUSE_TUMBLEWEED: 'openSUSE Tumbleweed';
  readonly UBUNTU: 'Ubuntu';
  readonly WINDOWS: 'Windows';
  readonly MACOS: 'macOS';
  readonly MACOSX: 'Mac OS X';
  readonly ANDROID: 'Android';
};

// Define the type for the array returned by getTags, including the helper methods
export interface TagsArray extends Array<string> {
  first(): string;
  second(): string;
  third(): string;
}

export const distros: Distros;

/** Checks if the current process has root privileges. */
export function isRoot(): boolean;

/** Returns 'sudo ' if not root, otherwise returns an empty string. */
export function sudo(): string;

/** Gets the distribution name (e.g., 'Ubuntu', 'Windows', 'Fedora'). */
export function name(): string | undefined;

/** Gets the distribution version ID (e.g., '20.04', '10.0.19042'). */
export function v(): string | undefined;

/**
 * Gets distribution information.
 * @param item Optional specific item key (e.g., 'NAME', 'VERSION_ID') to retrieve.
 * @returns An object with distribution info, or a specific string value if 'item' is provided. Returns undefined if item not found.
 */
export function get(): DistroInfo;
export function get(item: keyof DistroInfo | string): string | undefined;


/**
 * Gets the appropriate package manager command for the specified operation.
 * @param operation The operation type ('install', 'update', 'uninstall', 'search'). Defaults to 'install'.
 * @param dist The distribution name. Defaults to the current OS distribution.
 * @param version The distribution version. Defaults to the current OS version.
 * @returns The package manager command string (e.g., 'apt-get install -y', 'scoop install').
 */
export function getPM(operation?: 'install' | 'update' | 'uninstall' | 'search', dist?: string, version?: string): string;

/**
 * Generates OS/distro specific tags based on current OS.
 * @param prefix Optional prefix to add to each tag.
 * @returns An array of strings representing tags (e.g., ['UBUNTU', 'UBUNTU20', 'UBUNTU2004']).
 */
export function tags(prefix?: string): string[];

/**
 * Generates OS/distro specific tags based on provided name and version.
 * @param distroName The distribution name.
 * @param version The distribution version.
 * @param prefix Optional prefix to add to each tag.
 * @returns A TagsArray with helper methods (first, second, third).
 * @throws Error if only distroName is provided without version.
 */
export function getTags(distroName: string, version: string, prefix?: string): TagsArray;
/**
 * Generates OS/distro specific tags based on current OS.
 * @param prefix Optional prefix to add to each tag.
 * @returns A TagsArray with helper methods (first, second, third).
 */
export function getTags(prefix?: string): TagsArray; // Overload for current OS

/**
 * Replaces generic 'apt-get' commands in a string with the appropriate package manager command for the specified (or current) distribution.
 * @param cmd The command string containing generic package manager commands.
 * @param distro The target distribution name. Defaults to the current OS distribution.
 * @param version The target distribution version. Defaults to the current OS version.
 * @returns The command string with package manager commands replaced.
 */
export function replacePMByDistro(cmd: string, distro?: string, version?: string): string;

/**
 * Gets the default shell path for the specified (or current) distribution.
 * @param distro The distribution name. Defaults to the current OS distribution.
 * @returns The shell path (e.g., '/bin/bash', '/bin/zsh') or `true` for Windows (indicating default shell behavior).
 */
export function getShell(distro?: string): string | true;

/**
 * Converts a Windows-style path to a Linux-style path (for WSL).
 * @param p The Windows path (e.g., 'C:\\Users\\Name').
 * @returns The Linux-style path (e.g., '/mnt/c/Users/Name').
 */
export function pathWinToLinux(p: string): string;
