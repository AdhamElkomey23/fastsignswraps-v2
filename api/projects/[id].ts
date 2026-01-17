import type { VercelRequest, VercelResponse } from '@vercel/node';

// Same static projects as in index.ts
const projects = [
  {
    id: 1,
    title: "Matte Black Tesla Model 3",
    description: "Complete color change wrap with satin finish and chrome delete.",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Color Change",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Cyberpunk GT-R Itasha",
    description: "Custom designed full wrap featuring high-detail anime character art.",
    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Itasha",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Fleet Commercial Branding",
    description: "Uniform branding design for a local logistics company fleet.",
    imageUrl: "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Commercial",
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Carbon Fiber Hood & Roof",
    description: "High-gloss carbon fiber accents for BMW M4.",
    imageUrl: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Partial Wrap",
    createdAt: new Date().toISOString()
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  const projectId = parseInt(id as string, 10);

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  return res.status(200).json(project);
}
