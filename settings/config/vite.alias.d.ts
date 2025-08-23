declare module '@fastest/config' {
    export function createAliases(
        monorepoRoot: string,
        opts?: { asArray?: boolean; extras?: Record<string, string> }
    ): any;
}