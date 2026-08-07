export interface EvidenceItem {
  id: string;
  title: string;
  category: string;
  track: "tech" | "design";
  lastUpdated: string;
}

export const evidenceItems: EvidenceItem[] = [
  { id: "dr-aggarwal", title: "Dr Aggarwal Physio Centre", category: "Healthcare", track: "tech", lastUpdated: "2024-01-15" },
  { id: "scan-centre", title: "Scan Centre Near Me", category: "Marketplace", track: "tech", lastUpdated: "2023-11-20" },
  { id: "buy-secondhand-book", title: "Buy Second Hand Books Marketplace", category: "Marketplace", track: "tech", lastUpdated: "2024-01-15" },
  { id: "sattvaos", title: "SattvaOS AI Architecture", category: "Artificial Intelligence", track: "tech", lastUpdated: "2024-03-10" },
  { id: "aatma-guru", title: "aatma.guru", category: "AI Infrastructure", track: "tech", lastUpdated: "2024-02-28" },
  { id: "nirvandham", title: "Nirvandham Operations", category: "Business Systems", track: "tech", lastUpdated: "2024-02-28" },
  { id: "muktibodh", title: "Muktibodh Publishing System", category: "Publishing", track: "design", lastUpdated: "2023-09-05" },
  { id: "digixpro", title: "DigiXPro — Our Own Architecture", category: "Platform", track: "tech", lastUpdated: "2024-05-15" },
  { id: "360-neck-shoulder", title: "360 Neck & Shoulder Care", category: "Healthcare / Web Design", track: "design", lastUpdated: "2024-05-15" }
];