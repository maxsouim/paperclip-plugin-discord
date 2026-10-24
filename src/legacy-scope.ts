import type { PluginContext } from "@paperclipai/plugin-sdk";

/**
 * Read a key from the legacy "default" scope, which predates company scoping.
 *
 * When a real company was already checked, this is only a fallback. Newer
 * Paperclip hosts refuse state access for a scope that is not a real company,
 * so a refused fallback read means there is no legacy data to return. Without
 * a company, "default" is the primary scope and errors propagate.
 */
export async function readLegacyDefault(
  ctx: PluginContext,
  stateKey: string,
  checkedCompanyId?: string,
): Promise<unknown> {
  const read = () => ctx.state.get({ scopeKind: "company", scopeId: "default", stateKey });
  if (!checkedCompanyId || checkedCompanyId === "default") return read();
  try {
    return await read();
  } catch {
    return null;
  }
}
