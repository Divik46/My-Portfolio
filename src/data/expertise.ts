import { Layout, Paintbrush, Zap, ShoppingBag, LayoutGrid, Boxes } from "lucide-react";

export interface Builder {
  id: number;
  name: string;
  category: string;
  description: string;
  experience: string;
  tags: string[];
  icon: any;
}

export const builders: Builder[] = [
  {
    id: 1,
    name: "Elementor",
    category: "Drag & Drop Builder",
    description: "The leading drag-and-drop page builder for WordPress. Highly experienced in building responsive landing pages, custom templates, and dynamic theme layouts with Elementor Pro.",
    experience: "5+ Years",
    tags: ["Page Builder", "Theme Builder", "Popup Builder"],
    icon: Layout
  },
  {
    id: 2,
    name: "Avada",
    category: "Theme & Page Builder",
    description: "One of the most versatile multi-purpose themes and builders. Expert in configuring global options, custom layout builders, dynamic content, and highly styled page designs.",
    experience: "4+ Years",
    tags: ["Theme Builder", "Global Styles", "Dynamic Content"],
    icon: Paintbrush
  },
  {
    id: 3,
    name: "Bricks Builder",
    category: "Visual Site Builder",
    description: "A premium, highly performant visual site builder. Skilled in using Bricks for clean HTML outputs, custom query loops, interactions, and blistering page speeds.",
    experience: "2+ Years",
    tags: ["Clean Code", "Query Loop", "Performance Focus"],
    icon: Zap
  },
  {
    id: 4,
    name: "WooCommerce",
    category: "E-Commerce Integration",
    description: "The premier e-commerce plugin for WordPress. Expert in designing custom checkout flows, product page layouts, payment integrations, and shop optimization.",
    experience: "4+ Years",
    tags: ["E-Commerce", "Payment Gateways", "Cart/Checkout"],
    icon: ShoppingBag
  },
  {
    id: 5,
    name: "WPBakery Page Builder",
    category: "Grid Builder",
    description: "A classic and widely adopted grid-based page builder. Skilled in managing and extending WPBakery setups, maintaining legacy themes, and customizing modules.",
    experience: "4+ Years",
    tags: ["Grid Builder", "Legacy Themes", "Addons"],
    icon: LayoutGrid
  },
  {
    id: 6,
    name: "Gutenberg",
    category: "Native Block Editor",
    description: "WordPress's native block-based builder. Proficient in Full Site Editing (FSE), custom block patterns, styles, and building block themes for maximum optimization.",
    experience: "3+ Years",
    tags: ["Native Editor", "FSE", "Block Themes"],
    icon: Boxes
  }
];
