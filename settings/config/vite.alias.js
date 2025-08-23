import path from 'path';

export function createAliases(monorepoRoot, opts = { asArray: false, extras: {} }) {
    const base = {
        '@components': path.resolve(monorepoRoot, 'packages/components/src'),
        '@fastest/plugins': path.resolve(monorepoRoot, 'packages/plugins/src')
    };

    const merged = { ...base, ...(opts.extras || {}) };

    if (opts.asArray) {
        return Object.entries(merged).map(([find, replacement]) => ({ find, replacement }));
    }
    return merged;
}