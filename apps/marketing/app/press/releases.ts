import { asset } from "../_lib/asset";

export interface PressRelease {
  slug: string;
  date: string;
  outlet: string;
  headline: string;
  /** One-line summary shown on the press list card. */
  excerpt: string;
  /** Cover image, per-release, at marketing/images/press-<slug>.jpg. */
  image: string;
  /** External link (e.g. a video). When set, the card opens this in a new
   *  tab instead of an internal /press/<slug> article. */
  href?: string;
  /** Dateline shown at the top of the article body, e.g. "New York, NY". */
  dateline?: string;
  /** Article body paragraphs, rendered in order. Omitted for link-outs. */
  body?: string[];
}

export const PRESS_RELEASES: PressRelease[] = [
  {
    slug: "sava-on-tbpn",
    date: "June 2026",
    outlet: "TBPN",
    headline: "Watch: Sava on TBPN",
    excerpt:
      "Sava joins TBPN to talk about the trust infrastructure it's building for modern families.",
    image: asset("press-tbpn.webp"),
    href: "https://www.youtube.com/live/dAmGwYH4d74?si=XmWqko0s8bVAJa4Z&t=7571",
  },
  {
    slug: "nevada-trust-charter-application",
    date: "May 2026",
    outlet: "Sava",
    headline:
      "Sava Files Application for a Trust Company Charter with the Nevada Financial Institutions Division",
    excerpt:
      "Sava has submitted an application with the Nevada Financial Institutions Division (FID) to establish Sava Trust Company.",
    image: asset("press-nevada-trust-charter-application.webp"),
    dateline: "",
    body: [
      "Sava has submitted an application with the Nevada Financial Institutions Division (FID) to charter Sava Trust Company, a state-chartered fiduciary built for modern families.",
      "The filing is a step toward Sava's goal of building the operational infrastructure for modern fiduciary administration — bringing trust administration, custody coordination, and a real-time family portal under one roof.",
      "“Families entrust trust companies with the assets that move wealth between generations, and most of the institutions administering them still run on decades-old processes,” said Nimit, co-founder of Sava. “We filed in Nevada because it pairs one of the country's strongest trust frameworks with a regulator that takes fiduciary discipline seriously.”",
      "Sava does not sell investment products or take a cut of the assets it holds. Directed-trust structures keep the trustee and the adviser cleanly separated, so the family's interests stay first.",
      "Subject to regulatory approval, Sava Trust Company would operate under the oversight of the Nevada Financial Institutions Division, hold trust assets with independent custodians, and maintain a minimum capital reserve of $1 million from day one, at least half in cash.",
    ],
  },
];
