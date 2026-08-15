const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.17.0/icons'
const TABLER_BASE = 'https://cdn.jsdelivr.net/npm/@tabler/icons@3.46.0/icons/outline'

export function devicon(path, invert = false) {
  return { icon: `${DEVICON_BASE}/${path}.svg`, mask: false, invert }
}

export function tabler(name) {
  return { icon: `${TABLER_BASE}/${name}.svg`, mask: true, invert: false }
}

export const techIcons = {
  HTML5: devicon('html5/html5-original'),
  CSS3: devicon('css3/css3-original'),
  JavaScript: devicon('javascript/javascript-original'),
  React: devicon('react/react-original'),
  'Next.js': devicon('nextjs/nextjs-original'),
  TypeScript: devicon('typescript/typescript-original'),
  'Tailwind CSS': devicon('tailwindcss/tailwindcss-original'),
  'Node.js': devicon('nodejs/nodejs-original'),
  'Framer Motion': devicon('framermotion/framermotion-original'),
  'REST API Development': tabler('api'),
  PostgreSQL: devicon('postgresql/postgresql-original'),
  Supabase: devicon('supabase/supabase-original'),
  Vercel: devicon('vercel/vercel-original', true),
  'Web Application Security': tabler('shield-lock'),
  Figma: devicon('figma/figma-original'),
  'Adobe Creative Suite': tabler('palette'),
  GitHub: devicon('github/github-original', true),
  'VS Code': devicon('vscode/vscode-original'),
  'Full-Stack Development': tabler('stack-2'),
  'Responsive Web Design': tabler('devices'),
  'AI Integration': tabler('brain'),
  Claude: tabler('sparkles'),
  Python: devicon('python/python-original'),
  'API Integration': tabler('plug-connected'),
}

export function getTechIcon(name) {
  return techIcons[name] ?? null
}
