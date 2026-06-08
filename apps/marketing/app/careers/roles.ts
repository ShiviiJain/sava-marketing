export interface OpenRole {
  slug: string;
  title: string;
  meta: string;
  /** Short summary rendered on the careers listing row. */
  body: string;
  /** Long-form sections rendered on the role detail page. */
  responsibilities: string[];
  qualifications: string[];
  mailto: string;
  /**
   * External application URL. When set, the Apply button on the role
   * detail page links here (and opens in a new tab) instead of the
   * mailto fallback. Useful for roles syndicated to YC Work at a Startup
   * or a similar pipeline.
   */
  applyUrl?: string;
}

export const OPEN_ROLES: OpenRole[] = [
  {
    slug: "platform-engineer",
    title: "Software Engineer, Platform",
    meta: "New York, NY · Engineering",
    body: "Sava is building the operational infrastructure of a chartered trust company: intake, KYC, signatures, custody, the trust ledger, distributions, and reconciliation. You'll work across the stack on a small team, and you'll spend time with the trust officers using what you build.",
    responsibilities: [
      "Build product surfaces end-to-end in Next.js and Go, from spec to production on the order of weeks, not quarters.",
      "Own the data model and APIs that fiduciary administration depends on: schema design, migrations, query design. The work the audit hangs on.",
      "Pair with the trust officers using the platform. Their workflows are the test.",
      "Take operational reliability seriously: monitoring, runbooks, recovery. This is regulated infrastructure.",
    ],
    qualifications: [
      "Three or more years building production software, across both frontend and backend.",
      "Comfortable with TypeScript, React, Go, Postgres, and the parts of AWS that handle storage and queues.",
      "A taste for the fiduciary domain: what a directed trust is, how a distribution gets approved, how custody gets reconciled.",
      "Bias for writing things down. The codebase reads like the records it represents.",
    ],
    mailto:
      "mailto:founders@savahq.com?subject=Application%20%E2%80%94%20Software%20Engineer%2C%20Platform",
    applyUrl:
      "https://www.ycombinator.com/companies/savahq/jobs/74xutqF-founding-engineer?utm_source=syn_li",
  },
];
