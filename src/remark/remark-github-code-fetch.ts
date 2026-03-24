import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';
import type { Plugin } from 'unified';

const CACHE_DIR = join('node_modules', '.cache', 'remark-github-code-fetch');

function getCached(url: string): string | null {
  const hash = createHash('md5').update(url).digest('hex');
  const cachePath = join(CACHE_DIR, hash);
  return existsSync(cachePath) ? readFileSync(cachePath, 'utf-8') : null;
}

function setCache(url: string, content: string): void {
  mkdirSync(CACHE_DIR, { recursive: true });
  const hash = createHash('md5').update(url).digest('hex');
  writeFileSync(join(CACHE_DIR, hash), content, 'utf-8');
}

function parseUrl(raw: string): {
  url: string;
  startLine?: number;
  endLine?: number;
} {
  const trimmed = raw.trim();
  const hashIndex = trimmed.lastIndexOf('#');
  if (hashIndex === -1) {
    return { url: trimmed };
  }

  const fragment = trimmed.slice(hashIndex + 1);
  const match = fragment.match(/^L(\d+)(?:-L(\d+))?$/);
  if (!match) {
    return { url: trimmed };
  }

  return {
    url: trimmed.slice(0, hashIndex),
    startLine: parseInt(match[1], 10),
    endLine: match[2] ? parseInt(match[2], 10) : parseInt(match[1], 10),
  };
}

function extractLines(
  content: string,
  startLine: number,
  endLine: number,
): string {
  const lines = content.split('\n');
  return lines.slice(startLine - 1, endLine).join('\n');
}

const remarkGithubCodeFetch: Plugin<[], Root> = () => {
  return async (tree) => {
    const promises: Promise<void>[] = [];

    visit(tree, 'code', (node: Code) => {
      if (!node.meta?.includes('reference')) return;

      const rawUrl = node.value.trim();
      if (!rawUrl.startsWith('http')) return;

      const { url, startLine, endLine } = parseUrl(rawUrl);

      const promise = (async () => {
        const cached = getCached(rawUrl);
        let content: string;

        if (cached !== null) {
          content = cached;
        } else {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(
              `remark-github-code-fetch: Failed to fetch ${url} (${response.status} ${response.statusText})`,
            );
          }
          content = await response.text();
          setCache(rawUrl, content);
        }

        if (startLine !== undefined && endLine !== undefined) {
          content = extractLines(content, startLine, endLine);
        }

        node.value = content.replace(/\n$/, '');
        node.meta = node.meta!.replace('reference', '').trim() || null;
      })();

      promises.push(promise);
    });

    await Promise.all(promises);
  };
};

export default remarkGithubCodeFetch;
