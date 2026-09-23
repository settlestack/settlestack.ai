import { execFileSync } from 'node:child_process'
import { cpSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const run = (command, args, cwd = root) => execFileSync(command, args, { cwd, stdio: 'inherit' })
const git = (args, cwd) => run('git', ['-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential', ...args], cwd)
const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' }).trim()
run('npm', ['run', 'build'])
const staging = mkdtempSync(join(tmpdir(), 'settlestack-deploy-'))
try {
  git(['clone', '--branch', 'gh-pages', '--single-branch', remote, staging])
  for (const entry of readdirSync(staging)) {
    if (entry !== '.git') rmSync(join(staging, entry), { recursive: true, force: true })
  }
  cpSync(join(root, 'dist'), staging, { recursive: true })
  for (const key of ['user.name', 'user.email']) {
    const value = execFileSync('git', ['config', key], { cwd: root, encoding: 'utf8' }).trim()
    git(['config', key, value], staging)
  }
  git(['add', '--all'], staging)
  const changes = execFileSync('git', ['status', '--porcelain'], { cwd: staging, encoding: 'utf8' })
  if (changes.trim()) {
    git(['commit', '-m', 'Deploy SettleStack website'], staging)
    git(['push', 'origin', 'gh-pages'], staging)
  } else console.log('The published build is already up to date.')
} finally {
  rmSync(staging, { recursive: true, force: true })
}
