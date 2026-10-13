import { useEffect, useState, type ReactNode } from "react"

type Page = "home" | "how" | "capabilities" | "docs" | "access" | "app"
type AppView = "overview" | "new" | "run" | "findings" | "finding" | "worlds" | "witness" | "relationships" | "inventory" | "evidence" | "jobs" | "repository" | "coverage" | "settings"

const navItems: { label: string page: Page }[] = [
  { label: "How It Works", page: "how" },
  { label: "Capabilities", page: "capabilities" },
  { label: "Documentation", page: "docs" },
]

function Icon({
  name,
  size = 18,
}: {
  name: "arrow" | "check" | "menu" | "close" | "search" | "chevron" | "sun" | "moon" | "grid"
  size?: number
}) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 7" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    moon: <path d="M20 15.1A8 8 0 0 1 8.9 4a8.1 8.1 0 1 0 11.1 11.1Z" />,
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="logo-lockup">
      <img src="/faultline-logo.png" alt="" className="logo-mark" />
      {!compact && <span className="logo-type">FAULTLINE</span>}
    </span>
  )
}

function navigate(page: Page) {
  window.location.hash = page === "home" ? "" : page
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function Button({
  children,
  secondary = false,
  onClick,
}: {
  children: ReactNode
  secondary?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className={secondary ? "button button-secondary" : "button"}
      onClick={onClick}
    >
      <span>{children}</span>
      <Icon name="arrow" />
    </button>
  )
}

function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark"
  onToggle: () => void
}) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} size={17} />
    </button>
  )
}

function Header({
  page,
  onStart,
  theme,
  onTheme,
}: {
  page: Page
  onStart: () => void
  theme: "light" | "dark"
  onTheme: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <button
        className="brand-button"
        onClick={() => navigate("home")}
        aria-label="FAULTLINE home"
      >
        <Logo />
      </button>
      <nav
        className={open ? "site-nav is-open" : "site-nav"}
        aria-label="Main navigation"
      >
        <button className="nav-link" onClick={() => navigate("home")}>
          Product
        </button>
        {navItems.map((item) => (
          <button
            key={item.page}
            className={page === item.page ? "nav-link is-active" : "nav-link"}
            onClick={() => {
              navigate(item.page)
              setOpen(false)
            }}
          >
            {item.label}
          </button>
        ))}
        <button className="nav-link" onClick={() => navigate("access")}>
          Sign in
        </button>
        <ThemeToggle theme={theme} onToggle={onTheme} />
        <button className="nav-cta" onClick={onStart}>
          Explore the interface
          <Icon name="arrow" size={16} />
        </button>
      </nav>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} size={22} />
      </button>
    </header>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  )
}

function InvestigationVisual() {
  return (
    <div className="investigation-visual" aria-label="Illustrative dependency investigation preview">
      <div className="visual-topline">
        <div className="visual-title-lockup">
          <span className="visual-live-indicator" />
          <span>Investigation preview</span>
        </div>
        <span className="mode-badge">EXAMPLE DATA</span>
      </div>

      <div className="visual-context-row">
        <span>INVESTIGATION / 041</span>
        <span>PYTHON ECOSYSTEM</span>
      </div>

      <div className="visual-relation-map">
        <div className="visual-repo producer">
          <div className="visual-repo-top"><span className="repo-glyph">P</span><span>PRODUCER</span></div>
          <strong>shared-contracts</strong>
          <code>ref · a13f9c2</code>
          <div className="repo-meta"><span className="mini-state state-pinned" /> Source pinned</div>
        </div>

        <div className="visual-edge">
          <span className="edge-line"><i /></span>
          <span className="edge-label">CONTRACT</span>
          <span className="edge-line"><i /></span>
        </div>

        <div className="visual-repo consumer">
          <div className="visual-repo-top"><span className="repo-glyph">C</span><span>CONSUMER</span></div>
          <strong>billing-api</strong>
          <code>ref · d82b641</code>
          <div className="repo-meta"><span className="mini-state state-review" /> Review required</div>
        </div>
      </div>

      <div className="visual-divider"><span>Evidence trail</span><span>03 RECORDS</span></div>
      <div className="visual-evidence-list">
        <div className="visual-evidence-row">
          <span className="evidence-index">01</span>
          <span className="evidence-symbol symbol-source">↗</span>
          <span className="evidence-copy"><strong>Source revisions pinned</strong><small>Immutable repository inputs</small></span>
          <span className="evidence-status status-complete">RECORDED</span>
        </div>
        <div className="visual-evidence-row">
          <span className="evidence-index">02</span>
          <span className="evidence-symbol symbol-delta">Δ</span>
          <span className="evidence-copy"><strong>Environment delta identified</strong><small>Candidate difference · not proof</small></span>
          <span className="evidence-status status-candidate">CANDIDATE</span>
        </div>
        <div className="visual-evidence-row">
          <span className="evidence-index">03</span>
          <span className="evidence-symbol symbol-verdict">!</span>
          <span className="evidence-copy"><strong>Behavioral witness</strong><small>Fresh runs still required</small></span>
          <span className="evidence-status status-pending">PENDING</span>
        </div>
      </div>

      <div className="visual-footnote">
        <span>Illustrative data only</span>
        <span><span className="footnote-dot" /> No live analysis implied</span>
      </div>
    </div>
  )
}
const values = [
  [
    "Cross-repository",
    "Investigate connected producer and consumer repositories.",
  ],
  [
    "Environment-aware",
    "Compare relevant dependency and environment differences.",
  ],
  [
    "Evidence-first",
    "Separate potential causes from reproducible behavioral evidence.",
  ],
  [
    "Transparent by design",
    "See the scope, coverage, and limitations of an investigation.",
  ],
]

const workflow = [
  [
    "01",
    "Pin the inputs",
    "Start from repository references and resolve them to immutable source revisions.",
  ],
  [
    "02",
    "Map the relationship",
    "Inspect manifests, imports, package visibility, and the evidence connecting producer and consumer.",
  ],
  [
    "03",
    "Compare worlds",
    "Inspect reference and consumer dependency worlds, including relevant differences and coverage.",
  ],
  [
    "04",
    "Test the behavior",
    "Run applicable checks and preserve each outcome. Fresh runs and reused artifacts remain distinct.",
  ],
  [
    "05",
    "Read the verdict",
    "Follow the finding through the witness, dependency delta, relationship evidence, and verdict rule.",
  ],
]

const features = [
  [
    "Funnel",
    "See where an investigation stands.",
    "Follow persisted stages without fabricated percentages or decorative progress.",
  ],
  [
    "World matrix",
    "Compare the worlds cell by cell.",
    "Inspect applicable, unsupported, incomplete, and analyzed cells while preserving the coverage denominator.",
  ],
  [
    "Witness",
    "Examine all six required runs.",
    "Keep reference and consumer runs, freshness, outcome, and signature agreement individually inspectable.",
  ],
  [
    "Why-path",
    "Follow the reasoning, not just the result.",
    "Trace the supported path from pinned sources and relationship evidence through worlds, runs, witness, and verdict.",
  ],
]

const marketingCapabilities = [
  [
    "Repository provenance",
    "Keep source references and pinned revisions visible.",
  ],
  [
    "Dependency worlds",
    "Inspect resolved environments, importer visibility, and relevant deltas.",
  ],
  [
    "Repeatable witnesses",
    "Review individual runs and the normalized failure signature.",
  ],
  [
    "Attribution",
    "Trace a finding to candidate changes, counterfactual checks, and attribution limits.",
  ],
  [
    "Coverage transparency",
    "See what ran, what was skipped, what failed to initialize, and what remains unsupported.",
  ],
  [
    "Portable evidence",
    "Inspect bundle integrity and replay outcomes where those capabilities are enabled.",
  ],
]

function HomePage({ onStart }: { onStart: () => void }) {
  const [feature, setFeature] = useState(0)
  return (
    <main>
      <section className="hero page-shell">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-rule" /> ENGINEERING INTELLIGENCE <span className="kicker-index">/ 07</span></div>
          <h1>
            A dependency changed.
            <br />
            <em>Trace the break.</em>
          </h1>
          <p className="hero-lede">
            Compatibility failures rarely explain themselves.
          </p>
          <p className="hero-description">
            FAULTLINE investigates dependency drift across producer and consumer
            repositories—connecting pinned source revisions, environment
            differences, and behavioral evidence to a conclusion you can inspect.
          </p>
          <div className="button-row">
            <Button onClick={onStart}>Start an investigation</Button>
            <Button secondary onClick={() => navigate("how")}>
              Explore the method
            </Button>
          </div>
          <div className="hero-proofline">
            <span className="proof-mark"><Icon name="check" size={13} /></span>
            <span>Built around evidence, not assumptions</span>
          </div>
          <div className="hero-meta">
            <span><b>01</b> PIN THE SOURCE</span>
            <span><b>02</b> TEST THE BEHAVIOR</span>
            <span><b>03</b> SCOPE THE VERDICT</span>
          </div>
        </div>
        <div className="hero-visual-wrap">
          <div className="hero-visual-index"><span>FIG. 01</span><span>THE INVESTIGATION MODEL</span></div>
          <InvestigationVisual />
          <div className="hero-visual-caption"><span>Every conclusion has a trail.</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>

      <section className="value-strip page-shell" aria-label="Product values">
        {values.map(([title, body]) => (
          <div key={title}>
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
        ))}
      </section>

      <section className="section page-shell problem-section">
        <div className="section-intro sticky-intro">
          <Eyebrow>The problem</Eyebrow>
          <h2>
            When a dependency changes, the real question is <em>why.</em>
          </h2>
          <p>
            The version difference is easy to notice. Establishing whether it
            caused the failure is much harder.
          </p>
          <p>
            Developers may need to compare source revisions, inspect dependency
            environments, reproduce behavior, and determine whether a failure is
            related to the change—or to something else entirely.
          </p>
        </div>
        <div className="problem-list">
          {[
            [
              "Differences are easy to find.",
              "Causes are harder to establish. A changed version may be relevant, but it does not automatically explain a failure.",
            ],
            [
              "Repositories do not exist in isolation.",
              "The relationship between a producer and its consumers matters when investigating compatibility.",
            ],
            [
              "A failed run is not always proof.",
              "Infrastructure problems, timeouts, and test harness failures can obscure the actual behavior being investigated.",
            ],
          ].map(([title, body], i) => (
            <article className="numbered-row" key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dark-section">
        <div className="section page-shell">
          <div className="wide-heading">
            <Eyebrow>The method</Eyebrow>
            <h2>
              Turn dependency drift into an investigation{" "}
              <em>you can follow.</em>
            </h2>
            <p>
              Instead of stopping at “something changed,” follow the evidence to
              understand what was compared, what was tested, and what the
              results actually support.
            </p>
          </div>
          <div className="workflow-grid">
            {workflow.map(([num, title, copy]) => (
              <article key={num}>
                <span className="workflow-number">{num}</span>
                <div className="workflow-rule" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className="closing-line">
            From repository snapshots to evidence-backed conclusions.
          </p>
        </div>
      </section>

      <section className="section page-shell">
        <div className="wide-heading centered">
          <Eyebrow>Evidence, not assumption</Eyebrow>
          <h2>
            A version difference is a clue.
            <br />
            <em>Not a verdict.</em>
          </h2>
          <p>
            Many dependency tools tell you that something changed. FAULTLINE
            focuses on the harder question: whether a relevant difference is
            associated with a reproducible compatibility failure.
          </p>
        </div>
        <div className="comparison">
          <article>
            <span className="status status-neutral">Candidate difference</span>
            <h3>A signal worth investigating</h3>
            <ul>
              <li>
                <Icon name="arrow" />A dependency or environment difference has
                been observed.
              </li>
              <li>
                <Icon name="arrow" />
                The difference may be relevant to the failure.
              </li>
              <li>
                <Icon name="arrow" />
                Its causal relationship remains unverified.
              </li>
            </ul>
          </article>
          <div className="comparison-divider">
            <img src="/faultline-logo.png" alt="" />
          </div>
          <article className="finding-panel">
            <span className="status status-copper">
              Evidence-backed finding
            </span>
            <h3>A conclusion with clear boundaries</h3>
            <ul>
              <li>
                <Icon name="check" />
                Valid behavioral evidence supports the conclusion.
              </li>
              <li>
                <Icon name="check" />
                Applicable witness requirements are satisfied.
              </li>
              <li>
                <Icon name="check" />
                The conclusion is scoped to tested conditions.
              </li>
            </ul>
          </article>
        </div>
        <p className="notice">
          <strong>Important:</strong> A timeout, environment failure, test
          harness issue, or dependency-resolution problem must not automatically
          be treated as proof of a behavioral compatibility regression.
        </p>
      </section>

      <section className="section page-shell product-section">
        <div className="section-intro">
          <Eyebrow>Inside the investigation</Eyebrow>
          <h2>
            Everything you need to <em>follow the evidence.</em>
          </h2>
          <p>
            Explore the repository relationship, compare available environments,
            examine behavioral evidence, and inspect the reasoning behind a
            conclusion.
          </p>
        </div>
        <div className="product-showcase">
          <div
            className="feature-tabs"
            role="tablist"
            aria-label="Product features"
          >
            {features.map(([label], i) => (
              <button
                className={feature === i ? "feature-tab active" : "feature-tab"}
                onClick={() => setFeature(i)}
                role="tab"
                aria-selected={feature === i}
                key={label}
              >
                <span>0{i + 1}</span>
                {label}
              </button>
            ))}
          </div>
          <div className="product-preview">
            <div className="app-bar">
              <Logo compact />
              <span>
                Analysis / <strong>Example investigation</strong>
              </span>
              <span className="mode-badge">FIXTURE</span>
            </div>
            <div className="preview-body">
              <div className="preview-heading">
                <div>
                  <span className="micro-label">Why-path</span>
                  <h3>{features[feature][1]}</h3>
                </div>
                <span className="status status-neutral">Illustrative</span>
              </div>
              <div className="evidence-chain">
                {[
                  "Relationship",
                  "Environment delta",
                  "Behavior",
                  "Evidence",
                  "Verdict",
                ].map((step, i) => (
                  <div
                    className={
                      i <= feature ? "evidence-step active" : "evidence-step"
                    }
                    key={step}
                  >
                    <span>{i + 1}</span>
                    <strong>{step}</strong>
                    <small>
                      {i < 2 ? "Observed" : i === 2 ? "Tested" : "Pending"}
                    </small>
                  </div>
                ))}
              </div>
              <div className="preview-evidence">
                <span>Selected evidence</span>
                <code>producer-service@a13f9c2 → consumer-app@d82b641</code>
                <p>{features[feature][2]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-capabilities page-shell">
        <div className="wide-heading">
          <Eyebrow>Capability, with boundaries</Eyebrow>
          <h2>
            Everything you need to <em>follow the evidence.</em>
          </h2>
          <p>
            Each capability remains explicit about its implementation status and
            the boundary of what it can establish.
          </p>
        </div>
        <div className="marketing-capability-grid">
          {marketingCapabilities.map(([title, copy], index) => (
            <button key={title} onClick={() => navigate("capabilities")}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <small>
                Status to confirm <Icon name="arrow" size={14} />
              </small>
            </button>
          ))}
        </div>
      </section>

      <section className="section page-shell transparency">
        <div>
          <Eyebrow>Transparent by design</Eyebrow>
          <h2>
            Know what was tested.
            <br />
            <em>Know what remains uncertain.</em>
          </h2>
        </div>
        <div>
          <p className="large-copy">
            An investigation is only as useful as its evidence and its
            boundaries. FAULTLINE distinguishes completed checks from
            unavailable capabilities, partial coverage, and inconclusive
            outcomes.
          </p>
          {[
            [
              "Explicit scope",
              "Understand which repositories, revisions, and environments were included.",
            ],
            [
              "Honest outcomes",
              "Distinguish a verified result from a candidate, an inconclusive investigation, or an execution failure.",
            ],
            [
              "Visible limitations",
              "Understand when missing evidence or unsupported functionality limits the conclusion.",
            ],
          ].map(([title, copy]) => (
            <div className="principle" key={title}>
              <Icon name="check" />
              <div>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection onStart={onStart} />
    </main>
  )
}

function PageHero({
  eyebrow,
  title,
  copy,
  onStart,
  secondary,
}: {
  eyebrow: string
  title: ReactNode
  copy: string
  onStart?: () => void
  secondary?: ReactNode
}) {
  return (
    <section className="subpage-hero page-shell">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{copy}</p>
      <div className="button-row">
        {onStart && <Button onClick={onStart}>Start an investigation</Button>}
        {secondary}
      </div>
    </section>
  )
}

const howSteps = [
  [
    "01",
    "Source revisions",
    "Start with a known state.",
    "Pin the producer and consumer source revisions so the examined repositories are identifiable and the investigation scope is explicit.",
    [
      "Which repository snapshots are being examined.",
      "Which revisions define the scope.",
      "Which inputs the investigation used.",
    ],
  ],
  [
    "02",
    "Relationship evidence",
    "Understand how the repositories are connected.",
    "FAULTLINE records or inspects available relationship evidence so developers can understand why the repositories are being compared.",
    [
      "The producer and consumer under investigation.",
      "Available evidence for their relationship.",
      "Missing, conflicting, or incomplete information.",
    ],
  ],
  [
    "03",
    "Environment delta",
    "Find the relevant differences.",
    "Compare available reference and consumer environments to identify differences that may matter. A difference is a candidate, not proof of causality.",
    [
      "Which environment information is available.",
      "Which values differ.",
      "Where coverage is partial.",
    ],
  ],
  [
    "04",
    "Behavioral evidence",
    "Test the hypothesis, not just the environment.",
    "Use supported methods to examine whether the suspected issue corresponds to observable behavior. Infrastructure or harness failure is not automatically a valid witness.",
    [
      "Which checks were actually run.",
      "Which outcomes were observed.",
      "Whether applicable witness requirements were met.",
    ],
  ],
  [
    "05",
    "Scoped verdict",
    "Know what the evidence supports.",
    "Review the conclusion alongside tested revisions, relationship evidence, environment differences, behavioral results, and scope limitations.",
    [
      "The outcome and its scope.",
      "The evidence that supports it.",
      "Coverage, limitations, and available artifacts.",
    ],
  ],
]

function HowPage({ onStart }: { onStart: () => void }) {
  const [openFaq, setOpenFaq] = useState(0)
  const faqs = [
    [
      "Does every dependency difference mean something is broken?",
      "No. A dependency or environment difference is a candidate for investigation. It does not prove that the difference caused a behavioral failure.",
    ],
    [
      "Does every failed test count as a witness?",
      "No. Infrastructure failures, harness failures, timeouts, resource failures, and dependency-resolution problems must not automatically be treated as valid behavioral witnesses.",
    ],
    [
      "What if the evidence is incomplete?",
      "The interface shows partial coverage, unsupported conditions, or an inconclusive result where appropriate. It does not imply a stronger conclusion than the evidence supports.",
    ],
    [
      "Does FAULTLINE support every ecosystem?",
      "Universal support is not promised. Refer to the Capabilities page for implementation-backed ecosystem and oracle status.",
    ],
    [
      "Can every investigation be replayed?",
      "Only when replay is supported for the particular investigation and its available artifacts. Universal replay is not implied.",
    ],
  ]
  return (
    <main>
      <PageHero
        eyebrow="The investigation workflow"
        title={
          <>
            From a dependency change to an{" "}
            <em>evidence-backed investigation.</em>
          </>
        }
        copy="FAULTLINE organizes cross-repository dependency investigation into a traceable workflow, helping developers move from relevant differences to behavioral evidence and a conclusion whose scope is clear."
        onStart={onStart}
        secondary={
          <Button secondary onClick={() => navigate("capabilities")}>
            Explore capabilities
          </Button>
        }
      />
      <section className="process-overview page-shell">
        {howSteps.map(([n, label]) => (
          <div key={n}>
            <span>{n}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </section>
      <section className="steps-section page-shell">
        {howSteps.map(([n, label, title, copy, bullets]) => (
          <article className="detail-step" key={n}>
            <div className="step-meta">
              <span>{n}</span>
              <small>{label}</small>
            </div>
            <div className="step-copy">
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
            <div className="establishes">
              <span className="micro-label">What this establishes</span>
              <ul>
                {(bullets as string[]).map((b) => (
                  <li key={b}>
                    <Icon name="check" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="section page-shell faq-section">
        <div>
          <Eyebrow>Common questions</Eyebrow>
          <h2>
            Every investigation should make its <em>reasoning visible.</em>
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <div className="faq" key={q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                aria-expanded={openFaq === i}
              >
                <span>{q}</span>
                <Icon name="chevron" />
              </button>
              {openFaq === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>
      <CtaSection onStart={onStart} />
    </main>
  )
}

const capabilities = [
  [
    "Repository revision pinning",
    "Identifies source revisions used to define an investigation's scope.",
    "Do not imply every remote source or revision format is supported.",
  ],
  [
    "Repository relationship evidence",
    "Records or inspects evidence connecting a producer and consumer repository.",
    "A suspected relationship requires supporting evidence.",
  ],
  [
    "Dependency inventory",
    "Displays dependency information available for an inspected repository or environment.",
    "Status must be confirmed separately for each ecosystem.",
  ],
  [
    "World comparison",
    "Compares available environment information between reference and consumer sides.",
    "Missing or unresolved values remain explicit.",
  ],
  [
    "Dependency delta analysis",
    "Highlights differences that may be relevant to an investigation.",
    "A delta is a candidate, not proof of a regression.",
  ],
  [
    "Supported testing oracles",
    "Uses available behavioral-checking methods to observe relevant behavior.",
    "Test types and frameworks must be implementation-backed.",
  ],
  [
    "Behavioral witness validation",
    "Evaluates whether observed runs satisfy the applicable validation protocol.",
    "Infrastructure and harness failures are not witnesses.",
  ],
  [
    "Scoped verdicts",
    "Presents conclusions bounded by the evidence and conditions examined.",
    "An inconclusive result remains inconclusive.",
  ],
  [
    "Evidence export",
    "Makes supported investigation artifacts available for inspection or export.",
    "Artifact types and export guarantees require confirmation.",
  ],
  [
    "Replay support",
    "Replays an investigation when implementation and available artifacts support it.",
    "Universal replay is not implied.",
  ],
]

function CapabilitiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Capabilities & limitations"
        title={
          <>
            Built for careful <em>dependency investigations.</em>
          </>
        }
        copy="Explore the capabilities available in FAULTLINE, the evidence each capability provides, and the boundaries that determine what an investigation can conclude."
        secondary={
          <Button onClick={() => navigate("how")}>Explore the workflow</Button>
        }
      />
      <section className="capability-section page-shell">
        <div className="table-header">
          <span>Capability</span>
          <span>What it does</span>
          <span>Current status</span>
          <span>Limitations</span>
        </div>
        {capabilities.map(([name, description, limitation]) => (
          <article className="capability-row" key={name}>
            <strong>{name}</strong>
            <p>{description}</p>
            <span>
              <b className="status status-neutral">Status to confirm</b>
            </span>
            <small>{limitation}</small>
          </article>
        ))}
      </section>
      <section className="dark-section">
        <div className="section page-shell boundaries">
          <div>
            <Eyebrow>Truthful by default</Eyebrow>
            <h2>
              Capability boundaries are <em>part of the result.</em>
            </h2>
          </div>
          <div className="state-grid">
            {[
              ["Completed", "Comparison finished within stated scope."],
              [
                "Partial coverage",
                "Only part of the intended scope was inspected.",
              ],
              ["Unsupported", "The requested scenario is not available."],
              [
                "Inconclusive",
                "Evidence does not justify a stronger conclusion.",
              ],
            ].map(([s, c]) => (
              <article key={s}>
                <span className="state-dot" />
                <strong>{s}</strong>
                <p>{c}</p>
                <small>Illustrative state</small>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="simple-cta page-shell">
        <h2>Know what you can investigate—and what the evidence can prove.</h2>
        <p>
          Explore the workflow to understand how repository context, environment
          differences, and behavioral evidence fit together.
        </p>
        <Button onClick={() => navigate("how")}>See how it works</Button>
      </section>
    </main>
  )
}

const docGroups = [
  [
    "01",
    "Getting started",
    "Start with the investigation scope.",
    "Begin by understanding which repositories and revisions are being examined, what relationship connects them, and which analysis capabilities are available.",
    [
      "Repository setup",
      "Source revisions",
      "Relationship evidence",
      "Preflight and capability status",
    ],
  ],
  [
    "02",
    "The workflow",
    "Follow the stages of an investigation.",
    "An investigation may move through repository validation, relationship inspection, environment comparison, behavioral checks, witness evaluation, and a scoped conclusion.",
    [
      "Investigation workflow",
      "Reference and consumer worlds",
      "Dependency deltas",
      "Analysis status",
    ],
  ],
  [
    "03",
    "Understanding findings",
    "Interpret the result correctly.",
    "A candidate difference, a verified finding, an inconclusive result, and an execution failure represent different kinds of evidence.",
    [
      "Candidate versus verified",
      "Finding status",
      "Why-Path",
      "Coverage limitations",
    ],
  ],
  [
    "04",
    "Witness & verdict semantics",
    "Know what counts as evidence.",
    "A failed run is not automatically a valid witness. Review validation requirements, run outcomes, failure signatures, and reasons a result may remain incomplete.",
    [
      "Witness validation",
      "Normalized failure signatures",
      "Scoped verdicts",
      "Infrastructure and harness failures",
    ],
  ],
  [
    "05",
    "Evidence & export",
    "Inspect the record behind the conclusion.",
    "Review source revisions, relationship evidence, environment comparison, behavioral results, provenance, and available artifacts.",
    [
      "Evidence manifest",
      "Export behavior",
      "Replay support",
      "Provenance and integrity",
    ],
  ],
  [
    "06",
    "Troubleshooting",
    "When an investigation cannot reach a conclusion.",
    "Unsupported ecosystems, unavailable revisions, failed resolution, incomplete inventories, and insufficient evidence can all limit an investigation.",
    [
      "Unsupported scenarios",
      "Inconclusive investigations",
      "Partial coverage",
      "Execution failures",
    ],
  ],
]

function DocsPage() {
  const [query, setQuery] = useState("")
  const visible = docGroups.filter((g) =>
    g.join(" ").toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <main>
      <section className="docs-hero">
        <div className="page-shell">
          <Eyebrow>FAULTLINE documentation</Eyebrow>
          <h1>
            Understand the investigation.
            <br />
            <em>Inspect the evidence.</em>
          </h1>
          <p>
            Learn how FAULTLINE structures cross-repository investigations,
            represents environment differences, evaluates behavioral evidence,
            and communicates the limits of a result.
          </p>
          <label className="search-box">
            <Icon name="search" size={21} />
            <span className="sr-only">Search documentation</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation"
            />
            <kbd>⌘ K</kbd>
          </label>
        </div>
      </section>
      <section className="docs-grid page-shell">
        {visible.map(([n, group, title, copy, links]) => (
          <article className="doc-card" key={n}>
            <div className="doc-number">{n}</div>
            <span className="micro-label">{group}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <div className="doc-links">
              {(links as string[]).map((link) => (
                <button key={link}>
                  {link}
                  <Icon name="arrow" size={16} />
                </button>
              ))}
            </div>
          </article>
        ))}
        {visible.length === 0 && (
          <div className="no-results">
            <h2>No matching documentation</h2>
            <p>
              Try a broader term. Documentation links are
              information-architecture placeholders until implementation details
              are confirmed.
            </p>
          </div>
        )}
      </section>
      <div className="documentation-note page-shell">
        <strong>Documentation reflects implementation.</strong>
        <p>
          Planned features and future capabilities must be identified as
          planned, not presented as available. CLI commands, API endpoints, and
          framework support remain unspecified until confirmed.
        </p>
      </div>
    </main>
  )
}

const appNavigation: { id: AppView label: string group?: boolean }[] = [
  { id: "overview", label: "Overview" },
  { id: "new", label: "New analysis" },
  { id: "findings", label: "Findings" },
  { id: "relationships", label: "Relationships" },
  { id: "inventory", label: "Inventory graph" },
  { id: "evidence", label: "Evidence" },
  { id: "jobs", label: "Jobs" },
  { id: "repository", label: "Repositories" },
  { id: "coverage", label: "Capabilities" },
  { id: "settings", label: "Settings" },
]

function Status({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "neutral" | "copper" | "warn" | "good"
}) {
  return <span className={`app-status ${tone}`}>{children}</span>
}

function AppAction({
  children,
  onClick,
  quiet = false,
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  quiet?: boolean
  disabled?: boolean
}) {
  return (
    <button
      className={quiet ? "app-action quiet" : "app-action"}
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Unavailable in this prototype" : undefined}
    >
      {children}
    </button>
  )
}

function Panel({
  title,
  meta,
  children,
  className = "",
}: {
  title: string
  meta?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`work-panel ${className}`}>
      <div className="panel-heading">
        <div>
          {meta && <span>{meta}</span>}
          <h3>{title}</h3>
        </div>
        <button aria-label={`More options for ${title}`}>•••</button>
      </div>
      {children}
    </section>
  )
}

function DataTable({
  columns,
  rows,
  onRow,
}: {
  columns: string[]
  rows: ReactNode[][]
  onRow?: (index: number) => void
}) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRow?.(index)}
              className={onRow ? "clickable" : ""}
              tabIndex={onRow ? 0 : undefined}
              onKeyDown={(event) => event.key === "Enter" && onRow?.(index)}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PrototypeBanner() {
  return (
    <div className="prototype-banner">
      <span className="pulse-dot" />
      Illustrative prototype data — not a live result
    </div>
  )
}

function AccessPage({ onOpen }: { onOpen: () => void }) {
  return (
    <main className="access-page">
      <div className="access-graphic">
        <Logo />
        <div className="access-contract">
          <span />
          <img src="/faultline-logo.png" alt="" />
          <span />
        </div>
        <p>WITNESSES, NOT WARNINGS.</p>
      </div>
      <section className="access-card">
        <Status tone="copper">Prototype · no live account session</Status>
        <h1>FAULTLINE application preview</h1>
        <p>
          Authentication is not connected in this prototype. Continue to the
          designed interface using clearly labelled illustrative data.
        </p>
        <div className="access-facts">
          <div>
            <span>Mode</span>
            <strong>FIXTURE</strong>
          </div>
          <div>
            <span>Account</span>
            <strong>Not connected</strong>
          </div>
          <div>
            <span>Data</span>
            <strong>Illustrative only</strong>
          </div>
        </div>
        <Button onClick={onOpen}>Open prototype</Button>
        <button className="back-link" onClick={() => navigate("home")}>
          Return to marketing site
        </button>
      </section>
    </main>
  )
}

function OverviewView({ go }: { go: (view: AppView) => void }) {
  const funnel = [
    "Submitted",
    "Pinned",
    "Inventoried",
    "Relationships",
    "Worlds built",
    "Oracles",
    "Witness",
    "Verdict",
  ]
  return (
    <>
      <div className="metric-strip">
        {[
          "Active investigations",
          "Findings requiring review",
          "Inconclusive",
          "Jobs needing attention",
        ].map((label) => (
          <div key={label}>
            <span>{label}</span>
            <strong>—</strong>
            <small>No persisted metric available</small>
          </div>
        ))}
      </div>
      <div className="work-grid two-one">
        <Panel title="Analysis funnel" meta="Persisted stages">
          <div className="funnel">
            {funnel.map((stage, index) => (
              <button
                key={stage}
                onClick={() => go(index > 5 ? "findings" : "run")}
              >
                <span>0{index + 1}</span>
                <strong>{stage}</strong>
                <small>Count unavailable</small>
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="Needs attention" meta="2 illustrative states">
          <div className="attention-list">
            <button onClick={() => go("worlds")}>
              <Status tone="warn">Inconclusive</Status>
              <strong>Reference world unavailable</strong>
              <small>Open world matrix</small>
            </button>
            <button onClick={() => go("witness")}>
              <Status tone="neutral">Needs evidence</Status>
              <strong>Witness signatures disagree</strong>
              <small>Inspect six runs</small>
            </button>
          </div>
        </Panel>
      </div>
      <Panel title="Recent investigations" meta="Illustrative records">
        <DataTable
          columns={[
            "Investigation",
            "Producer → Consumer",
            "Pinned revisions",
            "Mode",
            "Stage",
            "Status",
          ]}
          rows={[
            [
              <strong>INV-PS07-041</strong>,
              "producer-service → consumer-app",
              <code>a13f9c2 → d82b641</code>,
              <Status>FIXTURE</Status>,
              "Witness evaluation",
              <Status tone="warn">INCONCLUSIVE</Status>,
            ],
            [
              <strong>INV-PS07-040</strong>,
              "library-core → api-gateway",
              <code>31bc7f0 → e29ab11</code>,
              <Status>REPLAY</Status>,
              "World construction",
              <Status tone="neutral">PARTIAL</Status>,
            ],
          ]}
          onRow={() => go("run")}
        />
      </Panel>
    </>
  )
}

function NewAnalysisView({ go }: { go: (view: AppView) => void }) {
  const [step, setStep] = useState(1)
  return (
    <>
      <div className="stepper">
        {["Repositories", "Review inputs", "Submit"].map((label, index) => (
          <button
            className={step >= index + 1 ? "active" : ""}
            onClick={() => setStep(index + 1)}
            key={label}
          >
            <span>{index + 1}</span>
            {label}
          </button>
        ))}
      </div>
      {step === 1 && (
        <>
          <div className="work-grid equal">
            {["Producer repository", "Consumer repository"].map(
              (title, index) => (
                <Panel
                  title={title}
                  meta={index ? "Downstream input" : "Reference input"}
                  key={title}
                >
                  <div className="app-form">
                    <label>
                      <span>Repository URL</span>
                      <input
                        defaultValue={
                          index
                            ? "https://github.com/example/consumer-app"
                            : "https://github.com/example/producer-service"
                        }
                      />
                    </label>
                    <label>
                      <span>Git reference</span>
                      <input defaultValue="main" />
                    </label>
                    <p>
                      Illustrative URL. The current ingestion adapter and
                      provider support must be confirmed.
                    </p>
                  </div>
                </Panel>
              ),
            )}
          </div>
          <Panel
            title="Capability preview"
            meta="Status from prototype specification"
          >
            <DataTable
              columns={[
                "Ecosystem",
                "Inventory",
                "Resolution",
                "World construction",
                "Oracle support",
              ]}
              rows={[
                [
                  "Python",
                  <Status>Status to confirm</Status>,
                  <Status>Status to confirm</Status>,
                  <Status>Status to confirm</Status>,
                  <Status>Status to confirm</Status>,
                ],
                [
                  "npm",
                  <Status tone="neutral">Inventory planned</Status>,
                  <Status>Status to confirm</Status>,
                  <Status tone="neutral">Unavailable</Status>,
                  <Status tone="neutral">Unavailable</Status>,
                ],
                [
                  "Maven",
                  <Status tone="neutral">POM inventory planned</Status>,
                  <Status>Status to confirm</Status>,
                  <Status tone="neutral">Unavailable</Status>,
                  <Status tone="neutral">Unavailable</Status>,
                ],
              ]}
            />
            <p className="panel-note">
              Inventory support does not imply runtime execution support.
            </p>
          </Panel>
          <AppAction onClick={() => setStep(2)}>Review inputs</AppAction>
        </>
      )}
      {step === 2 && (
        <Panel title="Review pinned inputs" meta="No submission will occur">
          <div className="review-inputs">
            <div>
              <span>Producer</span>
              <strong>producer-service</strong>
              <code>Requested: main · Pinned SHA unavailable</code>
            </div>
            <div>
              <span>Consumer</span>
              <strong>consumer-app</strong>
              <code>Requested: main · Pinned SHA unavailable</code>
            </div>
          </div>
          <label className="confirm-check">
            <input type="checkbox" />I understand that a dependency difference
            is not itself proof of a compatibility failure.
          </label>
          <div className="app-actions">
            <AppAction quiet onClick={() => setStep(1)}>
              Back to repositories
            </AppAction>
            <AppAction onClick={() => setStep(3)}>Submit prototype</AppAction>
          </div>
        </Panel>
      )}
      {step === 3 && (
        <div className="state-panel">
          <Status tone="copper">Prototype submission</Status>
          <h2>Analysis flow prepared</h2>
          <p>
            No API is connected, so no job ID or queued state has been
            fabricated. Continue to the illustrative analysis run to inspect the
            designed workflow.
          </p>
          <AppAction onClick={() => go("run")}>
            Open illustrative analysis
          </AppAction>
        </div>
      )}
    </>
  )
}

function RunView({ go }: { go: (view: AppView) => void }) {
  const stages = [
    ["Request accepted", "Complete"],
    ["Repository fetch and pinning", "Complete"],
    ["Inventory", "Complete"],
    ["Parse / resolve", "Partial"],
    ["Relationship evaluation", "Complete"],
    ["World construction", "Attention"],
    ["Oracle planning and execution", "Not started"],
    ["Witness evaluation", "Not started"],
    ["Attribution", "Not applicable"],
    ["Verdict and evidence persistence", "Not started"],
  ]
  return (
    <div className="work-grid two-one">
      <Panel
        title="Pipeline timeline"
        meta="Latest persisted state unavailable"
      >
        <div className="pipeline">
          {stages.map(([title, state], index) => (
            <details key={title} open={index === 5}>
              <summary>
                <span>{index + 1}</span>
                <strong>{title}</strong>
                <Status tone={state === "Attention" ? "warn" : "neutral"}>
                  {state}
                </Status>
              </summary>
              <p>
                {index === 5
                  ? "Reference world construction could not be verified. The investigation remains partial and no witness conclusion is available."
                  : "No persisted timestamps or structured stage detail are available in this prototype."}
              </p>
            </details>
          ))}
        </div>
      </Panel>
      <div>
        <Panel title="Run context" meta="INV-PS07-041">
          <dl className="key-values">
            <div>
              <dt>Mode</dt>
              <dd>
                <Status>FIXTURE</Status>
              </dd>
            </div>
            <div>
              <dt>Producer</dt>
              <dd>
                <code>a13f9c2</code>
              </dd>
            </div>
            <div>
              <dt>Consumer</dt>
              <dd>
                <code>d82b641</code>
              </dd>
            </div>
            <div>
              <dt>Retryable</dt>
              <dd>Unknown</dd>
            </div>
          </dl>
        </Panel>
        <Panel title="Partial result available" meta="Coverage limitation">
          <p className="panel-copy">
            Some stages completed, but the evidence is not sufficient for a
            complete conclusion.
          </p>
          <AppAction onClick={() => go("worlds")}>
            Inspect world matrix
          </AppAction>
        </Panel>
      </div>
    </div>
  )
}

function FindingsView({ go }: { go: (view: AppView) => void }) {
  const [query, setQuery] = useState("")
  const records = [
    ["FND-041", "@example/contracts", "CANDIDATE", "Needs evidence", "Partial"],
    [
      "FND-039",
      "io.example:shared-api",
      "INCONCLUSIVE",
      "Not verified",
      "Incomplete",
    ],
    [
      "FND-035",
      "relationship: core → gateway",
      "REJECTED",
      "Not applicable",
      "Analyzed",
    ],
  ].filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()))
  return (
    <>
      <div className="filter-bar">
        <label>
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search package, repository, finding ID…"
          />
        </label>
        {["Verdict", "Evidence status", "Ecosystem", "Coverage"].map(
          (filter) => (
            <button key={filter}>
              {filter}
              <Icon name="chevron" size={14} />
            </button>
          ),
        )}
      </div>
      <Panel title="Findings" meta={`${records.length} illustrative records`}>
        {records.length ? (
          <DataTable
            columns={[
              "Finding",
              "Package / relationship",
              "Verdict",
              "Witness",
              "Coverage",
            ]}
            rows={records.map((row) => [
              <code>{row[0]}</code>,
              row[1],
              <Status tone={row[2] === "INCONCLUSIVE" ? "warn" : "neutral"}>
                {row[2]}
              </Status>,
              row[3],
              row[4],
            ])}
            onRow={() => go("finding")}
          />
        ) : (
          <div className="empty-inline">
            <h3>No findings match these filters</h3>
            <p>Clear one or more filters or search a broader term.</p>
            <AppAction onClick={() => setQuery("")}>Clear filters</AppAction>
          </div>
        )}
      </Panel>
    </>
  )
}

function FindingView({ go }: { go: (view: AppView) => void }) {
  const whyPath = [
    "Finding",
    "Verdict predicate",
    "Witness",
    "Oracle runs",
    "World delta",
    "Relationship",
    "Pinned source",
  ]
  return (
    <>
      <div className="verdict-summary">
        <div>
          <Status tone="warn">INCONCLUSIVE</Status>
          <h2>Scoped verdict · @example/contracts</h2>
          <p>
            Conclusion scoped to pinned revisions, worlds, applicable oracles,
            and recorded coverage.
          </p>
        </div>
        <div className="app-actions">
          <AppAction quiet onClick={() => go("worlds")}>
            World matrix
          </AppAction>
          <AppAction onClick={() => go("witness")}>Open witness</AppAction>
        </div>
      </div>
      <Panel title="What the evidence establishes" meta="Finding FND-041">
        <div className="finding-summary-grid">
          <div>
            <span>What was observed</span>
            <p>
              A dependency delta is visible between the illustrative reference
              and consumer worlds.
            </p>
          </div>
          <div>
            <span>What remains uncertain</span>
            <p>
              Fresh oracle runs and normalized signature agreement are
              unavailable.
            </p>
          </div>
          <div>
            <span>Scope</span>
            <p>
              <code>a13f9c2 → d82b641</code>
              <br />
              Policy version unavailable
            </p>
          </div>
        </div>
      </Panel>
      <Panel title="Why-path" meta="Select any record">
        <div className="why-path">
          {whyPath.map((node, i) => (
            <button
              onClick={() =>
                i === 2 ? go("witness") : i === 4 ? go("worlds") : undefined
              }
              key={node}
            >
              <span>{i + 1}</span>
              <strong>{node}</strong>
              <small>{i < 2 ? "Observed" : "Evidence unavailable"}</small>
            </button>
          ))}
        </div>
      </Panel>
      <div className="work-grid equal">
        <Panel title="Dependency delta" meta="Illustrative">
          <DataTable
            columns={["Package", "Reference", "Consumer", "Visibility"]}
            rows={[
              ["contracts", <code>2.1.0</code>, <code>2.2.0</code>, "Direct"],
              ["parser-core", <code>4.8.1</code>, <code>4.8.1</code>, "Shared"],
            ]}
          />
        </Panel>
        <Panel title="Verdict predicates" meta="Unknown policy version">
          <DataTable
            columns={["Predicate", "Result"]}
            rows={[
              ["Pinned sources available", <Status tone="good">PASS</Status>],
              [
                "Witness protocol satisfied",
                <Status tone="warn">UNKNOWN</Status>,
              ],
              ["Coverage complete", <Status tone="warn">FAIL</Status>],
            ]}
          />
        </Panel>
      </div>
    </>
  )
}

function WorldsView({ go }: { go: (view: AppView) => void }) {
  return (
    <>
      <div className="filter-bar">
        {["Ecosystem", "Cell status", "Oracle", "Show unsupported"].map(
          (filter) => (
            <button key={filter}>
              {filter}
              <Icon name="chevron" size={14} />
            </button>
          ),
        )}
      </div>
      <Panel title="World matrix" meta="3 of 6 applicable cells evaluated">
        <DataTable
          columns={[
            "Package / importer",
            "Reference world",
            "Consumer world",
            "O-import",
            "O-tests",
            "Minimal O-bind",
          ]}
          rows={[
            [
              <strong>@example/contracts</strong>,
              <Status tone="good">ANALYZED</Status>,
              <Status tone="warn">PARTIAL</Status>,
              <Status>Status to confirm</Status>,
              <Status tone="neutral">UNSUPPORTED</Status>,
              <Status tone="neutral">NOT APPLICABLE</Status>,
            ],
            [
              <strong>parser-core</strong>,
              <Status tone="neutral">REUSED</Status>,
              <Status tone="neutral">REUSED</Status>,
              <Status tone="warn">INCONCLUSIVE</Status>,
              <Status>Status to confirm</Status>,
              <Status tone="neutral">NOT APPLICABLE</Status>,
            ],
            [
              <strong>optional-adapter</strong>,
              <Status tone="neutral">NOT APPLICABLE</Status>,
              <Status tone="neutral">NOT APPLICABLE</Status>,
              <Status tone="neutral">NOT APPLICABLE</Status>,
              <Status tone="neutral">NOT APPLICABLE</Status>,
              <Status tone="neutral">NOT APPLICABLE</Status>,
            ],
          ]}
          onRow={() => go("witness")}
        />
        <div className="coverage-bar">
          <span />
          <strong>Coverage 3 / 6 applicable cells</strong>
          <small>2 unsupported · 1 inconclusive</small>
        </div>
      </Panel>
      <div className="work-grid equal">
        <Panel title="Reference world" meta="WORLD-REF-041">
          <dl className="key-values">
            <div>
              <dt>Build state</dt>
              <dd>
                <Status tone="neutral">REUSED</Status>
              </dd>
            </div>
            <div>
              <dt>World hash</dt>
              <dd>
                <code>Unavailable</code>
              </dd>
            </div>
            <div>
              <dt>Fresh executions</dt>
              <dd>0</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>Status to confirm</dd>
            </div>
          </dl>
        </Panel>
        <Panel title="Consumer world" meta="WORLD-CON-041">
          <dl className="key-values">
            <div>
              <dt>Build state</dt>
              <dd>
                <Status tone="warn">PARTIAL</Status>
              </dd>
            </div>
            <div>
              <dt>World hash</dt>
              <dd>
                <code>Unavailable</code>
              </dd>
            </div>
            <div>
              <dt>Fresh executions</dt>
              <dd>0</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>Status to confirm</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </>
  )
}

function WitnessView() {
  const runs = [
    "Reference 1",
    "Reference 2",
    "Reference 3",
    "Consumer 1",
    "Consumer 2",
    "Consumer 3",
  ]
  return (
    <>
      <div className="witness-rule">
        {[
          ["Reference", "0 / 3 fresh passes"],
          ["Consumer", "0 / 3 fresh failures"],
          ["Signature", "Unavailable"],
          ["Protocol", "Not satisfied"],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <Panel title="Six-run witness board" meta="No live oracle records">
        <div className="run-board">
          {runs.map((run, i) => (
            <article key={run}>
              <div>
                <span>{run}</span>
                <Status tone="neutral">UNAVAILABLE</Status>
              </div>
              <strong>
                {i < 3
                  ? "Expected passing behavior"
                  : "Suspected failing behavior"}
              </strong>
              <dl>
                <div>
                  <dt>Fresh execution</dt>
                  <dd>No</dd>
                </div>
                <div>
                  <dt>Run ID</dt>
                  <dd>Not recorded</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>Unavailable</dd>
                </div>
                <div>
                  <dt>Signature</dt>
                  <dd>Unavailable</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Panel>
      <div className="state-panel compact">
        <Status tone="warn">INCONCLUSIVE</Status>
        <h2>The witness protocol is not satisfied.</h2>
        <p>
          A reused world is not a fresh run. Infrastructure, setup, timeout,
          resource, and harness failures cannot be counted as behavioral
          witnesses.
        </p>
      </div>
    </>
  )
}

function RelationshipsView({ go }: { go: (view: AppView) => void }) {
  return (
    <div className="work-grid two-one">
      <Panel title="Suspected relationships" meta="2 illustrative candidates">
        <DataTable
          columns={["Candidate", "Signals", "Evidence level", "Missing proof"]}
          rows={[
            [
              "producer-service → consumer-app",
              "Manifest · package name",
              <Status tone="warn">SUSPECTED</Status>,
              "Import / provenance",
            ],
            [
              "library-core → api-gateway",
              "Import path",
              <Status tone="neutral">CANDIDATE</Status>,
              "Artifact identity",
            ],
          ]}
        />
      </Panel>
      <Panel title="Relationship detail" meta="Selected candidate">
        <p className="panel-copy">
          Names and version similarities can suggest a connection, but they do
          not establish consumption on their own.
        </p>
        {[
          "Dependency declaration",
          "Package identity",
          "Import evidence",
          "Source provenance",
        ].map((item, i) => (
          <div className="evidence-row" key={item}>
            <Icon name={i < 2 ? "check" : "arrow"} />
            <span>{item}</span>
            <Status tone={i < 2 ? "good" : "neutral"}>
              {i < 2 ? "Observed" : "Missing"}
            </Status>
          </div>
        ))}
        <AppAction onClick={() => go("inventory")}>Inspect inventory</AppAction>
      </Panel>
    </div>
  )
}

function InventoryView({ go }: { go: (view: AppView) => void }) {
  return (
    <>
      <div className="filter-bar">
        <label>
          <Icon name="search" />
          <input placeholder="Search nodes…" />
        </label>
        <button>
          Filter ecosystem
          <Icon name="chevron" size={14} />
        </button>
        <button>
          Evidence level
          <Icon name="chevron" size={14} />
        </button>
      </div>
      <Panel title="Inventory graph" meta="Illustrative bounded subset">
        <div className="inventory-graph">
          <button className="graph-node repo" onClick={() => go("repository")}>
            <span>Repository</span>
            <strong>producer-service</strong>
            <code>a13f9c2</code>
          </button>
          <span className="graph-edge confirmed">declares</span>
          <button className="graph-node manifest">
            <span>Manifest</span>
            <strong>package.json</strong>
            <code>parse: status to confirm</code>
          </button>
          <span className="graph-edge candidate">candidate edge</span>
          <button className="graph-node package">
            <span>Package</span>
            <strong>@example/contracts</strong>
            <code>2.2.0</code>
          </button>
          <span className="graph-edge candidate">suspected</span>
          <button
            className="graph-node repo"
            onClick={() => go("relationships")}
          >
            <span>Repository</span>
            <strong>consumer-app</strong>
            <code>d82b641</code>
          </button>
        </div>
        <div className="graph-legend">
          <span>
            <i className="solid-line" />
            Observed edge
          </span>
          <span>
            <i className="dash-line" />
            Candidate edge
          </span>
          <span>Graph proximity does not imply causality.</span>
        </div>
      </Panel>
      <Panel title="Accessible graph alternative" meta="Keyboard navigable">
        <DataTable
          columns={["Node", "Type", "State", "Related evidence"]}
          rows={[
            ["producer-service", "Repository", "Pinned", "Source revision"],
            ["package.json", "Manifest", "Status to confirm", "Inventory"],
            [
              "@example/contracts",
              "Package instance",
              "Candidate",
              "Relationship signals",
            ],
            ["consumer-app", "Repository", "Pinned", "Source revision"],
          ]}
        />
      </Panel>
    </>
  )
}

function EvidenceView() {
  const [tab, setTab] = useState("Artifacts")
  const tabs = ["Artifacts", "Bundle manifest", "Integrity", "Replay history"]
  return (
    <>
      <div className="app-tabs">
        {tabs.map((name) => (
          <button
            className={tab === name ? "active" : ""}
            onClick={() => setTab(name)}
            key={name}
          >
            {name}
          </button>
        ))}
      </div>
      <Panel title={tab} meta="Evidence record EVD-041">
        {tab === "Artifacts" && (
          <DataTable
            columns={[
              "Artifact",
              "Type",
              "Source stage",
              "Hash",
              "Availability",
            ]}
            rows={[
              [
                "Source manifest",
                "JSON",
                "Pinning",
                "Unavailable",
                <Status tone="neutral">NOT PERSISTED</Status>,
              ],
              [
                "World descriptor",
                "JSON",
                "World construction",
                "Unavailable",
                <Status tone="warn">INCOMPLETE</Status>,
              ],
              [
                "Oracle logs",
                "Bounded log",
                "Execution",
                "Unavailable",
                <Status tone="neutral">UNAVAILABLE</Status>,
              ],
            ]}
          />
        )}
        {tab === "Bundle manifest" && (
          <dl className="manifest-grid">
            {[
              "Bundle schema version",
              "Finding / job IDs",
              "Source SHAs",
              "World descriptors",
              "Oracle versions",
              "Six-run witness",
              "Policy version",
              "File SHA-256 digests",
            ].map((field) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd>Unavailable</dd>
              </div>
            ))}
          </dl>
        )}
        {tab === "Integrity" && (
          <div className="state-panel compact">
            <Status tone="warn">NOT CHECKED</Status>
            <h2>Bundle integrity is unavailable.</h2>
            <p>
              No versioned evidence bundle is connected. Validation and replay
              remain disabled.
            </p>
            <AppAction disabled>Validate bundle</AppAction>
          </div>
        )}
        {tab === "Replay history" && (
          <div className="state-panel compact">
            <Status tone="neutral">UNSUPPORTED</Status>
            <h2>No supported replay profile</h2>
            <p>
              Replay is not enabled for this environment. Existing illustrative
              evidence remains inspectable.
            </p>
            <AppAction disabled>Run supported replay</AppAction>
          </div>
        )}
      </Panel>
    </>
  )
}

function JobsView({ go }: { go: (view: AppView) => void }) {
  return (
    <Panel title="Job history" meta="Illustrative attempts">
      <DataTable
        columns={[
          "Job ID",
          "Investigation",
          "Mode",
          "Status",
          "Last stage",
          "Retryable",
        ]}
        rows={[
          [
            <code>JOB-041</code>,
            "Contracts compatibility",
            <Status>FIXTURE</Status>,
            <Status tone="warn">PARTIAL</Status>,
            "World construction",
            "Unknown",
          ],
          [
            <code>JOB-040</code>,
            "Gateway relationship",
            <Status>REPLAY</Status>,
            <Status tone="neutral">CANCELLED</Status>,
            "Inventory",
            "No",
          ],
          [
            <code>JOB-039</code>,
            "Parser update",
            <Status>FIXTURE</Status>,
            <Status tone="neutral">FAILED</Status>,
            "Resolution",
            "Status to confirm",
          ],
        ]}
        onRow={() => go("run")}
      />
    </Panel>
  )
}

function RepositoryView() {
  const [tab, setTab] = useState("Overview")
  return (
    <>
      <div className="repository-title">
        <div>
          <Status tone="copper">Pinned snapshot</Status>
          <h2>producer-service</h2>
          <code>a13f9c2 · requested ref: main</code>
        </div>
      </div>
      <div className="app-tabs">
        {[
          "Overview",
          "Snapshots",
          "Inventory",
          "Relationships",
          "Analysis history",
        ].map((name) => (
          <button
            className={tab === name ? "active" : ""}
            onClick={() => setTab(name)}
            key={name}
          >
            {name}
          </button>
        ))}
      </div>
      <Panel title={tab} meta="Illustrative repository record">
        {tab === "Overview" ? (
          <dl className="manifest-grid">
            {[
              ["Repository URL", "github.com/example/producer-service"],
              ["Pinned SHA", "a13f9c2"],
              ["Ingestion state", "Illustrative"],
              ["Detected ecosystem", "npm · status to confirm"],
              ["Inventory status", "Partial"],
              ["Warnings", "Runtime execution unavailable"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="empty-inline">
            <h3>No persisted {tab.toLowerCase()} available</h3>
            <p>
              This prototype does not fabricate repository history or inventory
              records.
            </p>
          </div>
        )}
      </Panel>
    </>
  )
}

function CoverageView() {
  const cells = [
    "Inventory",
    "Resolution",
    "World build",
    "O-import",
    "O-tests",
    "Runtime",
    "Replay",
    "Attribution",
  ]
  return (
    <>
      <Panel title="Capability matrix" meta="Deployment status unavailable">
        <DataTable
          columns={["Ecosystem", ...cells]}
          rows={["Python", "npm", "Maven"].map((ecosystem) => [
            <strong>{ecosystem}</strong>,
            ...cells.map((cell, i) => (
              <Status
                key={`${ecosystem}-${cell}`}
                tone={i > 3 ? "neutral" : undefined}
              >
                {cell === "Inventory" && ecosystem !== "Python"
                  ? "Planned MVP"
                  : "To confirm"}
              </Status>
            )),
          ])}
        />
      </Panel>
      <div className="release-gates">
        {[
          ["Gate C", "First live vertical slice"],
          ["Gate D", "PS07-conformant MVP"],
          ["Gate E", "Release hardening"],
        ].map(([gate, title]) => (
          <article key={gate}>
            <Status tone="neutral">NOT VERIFIED</Status>
            <span>{gate}</span>
            <h3>{title}</h3>
            <p>
              Conformance evidence is not connected. This state does not imply
              production readiness.
            </p>
          </article>
        ))}
      </div>
    </>
  )
}

function SettingsView({
  theme,
  onTheme,
}: {
  theme: "light" | "dark"
  onTheme: () => void
}) {
  return (
    <div className="work-grid two-one">
      <Panel title="Appearance" meta="Saved locally">
        <div className="setting-row">
          <div>
            <strong>Color theme</strong>
            <p>Choose a comfortable appearance for this browser.</p>
          </div>
          <button className="theme-choice" onClick={onTheme}>
            <Icon name={theme === "light" ? "moon" : "sun"} />
            {theme === "light" ? "Use dark" : "Use light"}
          </button>
        </div>
      </Panel>
      <Panel title="Application information" meta="Prototype">
        <dl className="key-values">
          <div>
            <dt>Mode</dt>
            <dd>FIXTURE</dd>
          </div>
          <div>
            <dt>Authentication</dt>
            <dd>Not connected</dd>
          </div>
          <div>
            <dt>API status</dt>
            <dd>Unavailable</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>Not supplied</dd>
          </div>
        </dl>
      </Panel>
    </div>
  )
}

const viewMeta: Record<AppView, [string, string]> = {
  overview: [
    "Overview",
    "Follow investigations from pinned repository inputs to evidence-backed findings.",
  ],
  new: [
    "New analysis",
    "Choose producer and consumer repositories and review the investigation boundary.",
  ],
  run: [
    "Analysis run",
    "Inspect persisted stages without fabricated percentages or progress.",
  ],
  findings: [
    "Findings",
    "Review compatibility outcomes and follow conclusions to supporting evidence.",
  ],
  finding: [
    "Finding detail",
    "Trace a scoped conclusion through its Why-Path.",
  ],
  worlds: [
    "World matrix",
    "Compare reference and consumer worlds across applicable cells and oracles.",
  ],
  witness: [
    "Witness detail",
    "Inspect the six-run evidence and signature agreement behind a witness.",
  ],
  relationships: [
    "Suspected relationships",
    "Review possible producer–consumer connections and missing evidence.",
  ],
  inventory: [
    "Inventory graph",
    "Explore repositories, manifests, packages, and evidence-backed edges.",
  ],
  evidence: [
    "Evidence",
    "Inspect records behind a finding and the boundary of export and replay.",
  ],
  jobs: [
    "Jobs",
    "Review investigation attempts, modes, statuses, and execution history.",
  ],
  repository: [
    "Repository detail",
    "Inspect a pinned repository snapshot and its available inventory.",
  ],
  coverage: [
    "Capabilities & coverage",
    "Support reported per ecosystem, resolver, world builder, and oracle.",
  ],
  settings: [
    "Settings",
    "Manage implemented preferences and inspect application information.",
  ],
}

function AppWorkspace({
  theme,
  onTheme,
}: {
  theme: "light" | "dark"
  onTheme: () => void
}) {
  const [view, setView] = useState<AppView>("overview")
  const [sidebar, setSidebar] = useState(false)
  const go = (next: AppView) => {
    setView(next)
    setSidebar(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const [title, subtitle] = viewMeta[view]
  return (
    <main className="workspace">
      <aside className={sidebar ? "app-sidebar open" : "app-sidebar"}>
        <button className="app-brand" onClick={() => navigate("home")}>
          <Logo />
        </button>
        <nav aria-label="Application navigation">
          <span>Workbench</span>
          {appNavigation.map((item) => (
            <button
              className={view === item.id ? "active" : ""}
              onClick={() => go(item.id)}
              key={item.id}
            >
              <Icon name="grid" size={15} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <Status>FIXTURE</Status>
          <small>No live account session</small>
        </div>
      </aside>
      <div className="workspace-main">
        <header className="app-topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebar(!sidebar)}
            aria-label="Toggle application navigation"
          >
            <Icon name="menu" />
          </button>
          <div>
            <span>FAULTLINE / {title}</span>
          </div>
          <div className="topbar-actions">
            <Status>FIXTURE</Status>
            <ThemeToggle theme={theme} onToggle={onTheme} />
            <button className="exit-app" onClick={() => navigate("home")}>
              Exit preview
            </button>
          </div>
        </header>
        <PrototypeBanner />
        <div className="workspace-content">
          <div className="app-page-heading">
            <div>
              <span className="micro-label">Application workbench</span>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <div className="app-actions">
              {view !== "overview" && (
                <AppAction quiet onClick={() => go("overview")}>
                  Overview
                </AppAction>
              )}
              {view === "overview" && (
                <AppAction quiet onClick={() => go("jobs")}>
                  View all jobs
                </AppAction>
              )}
              {view === "overview" && (
                <AppAction onClick={() => go("new")}>New analysis</AppAction>
              )}
            </div>
          </div>
          {view === "overview" && <OverviewView go={go} />}
          {view === "new" && <NewAnalysisView go={go} />}
          {view === "run" && <RunView go={go} />}
          {view === "findings" && <FindingsView go={go} />}
          {view === "finding" && <FindingView go={go} />}
          {view === "worlds" && <WorldsView go={go} />}
          {view === "witness" && <WitnessView />}
          {view === "relationships" && <RelationshipsView go={go} />}
          {view === "inventory" && <InventoryView go={go} />}
          {view === "evidence" && <EvidenceView />}
          {view === "jobs" && <JobsView go={go} />}
          {view === "repository" && <RepositoryView />}
          {view === "coverage" && <CoverageView />}
          {view === "settings" && (
            <SettingsView theme={theme} onTheme={onTheme} />
          )}
        </div>
      </div>
    </main>
  )
}

function CtaSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="final-cta">
      <div className="page-shell">
        <img src="/faultline-logo.png" alt="" />
        <div>
          <Eyebrow>Begin with the evidence</Eyebrow>
          <h2>
            Stop guessing at dependency failures.
            <br />
            <em>Start investigating the evidence.</em>
          </h2>
        </div>
        <div>
          <p>
            Bring the producer and consumer repositories into view. Compare
            relevant environments, investigate observed behavior, and see what
            the evidence supports.
          </p>
          <div className="button-row">
            <Button onClick={onStart}>Start an investigation</Button>
            <Button secondary onClick={() => navigate("how")}>
              Explore the workflow
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer page-shell">
      <div className="footer-brand">
        <Logo />
        <p>
          Cross-repository dependency investigation, grounded in reproducible
          evidence.
        </p>
      </div>
      <div className="footer-columns">
        <div>
          <strong>Product</strong>
          <button onClick={() => navigate("home")}>Overview</button>
          <button onClick={() => navigate("how")}>How it works</button>
          <button onClick={() => navigate("capabilities")}>Capabilities</button>
        </div>
        <div>
          <strong>Resources</strong>
          <button onClick={() => navigate("docs")}>Documentation</button>
          <button onClick={() => navigate("docs")}>Evidence model</button>
          <button onClick={() => navigate("capabilities")}>
            Coverage & limitations
          </button>
        </div>
        <div>
          <strong>Project</strong>
          <span>Hacktopia 2026</span>
          <span>PS07</span>
        </div>
      </div>
      <p className="footer-statement">WITNESSES, NOT WARNINGS.</p>
      <p className="footer-note">
        FAULTLINE · Product prototype · No live claims
      </p>
    </footer>
  )
}

function StartModal({
  onClose,
  onOpen,
}: {
  onClose: () => void
  onOpen: () => void
}) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        <span className="status status-copper">Prototype destination</span>
        <h2 id="modal-title">Start with two known repositories.</h2>
        <p>
          The analysis workflow is represented as a prototype. Repository
          connections and source revisions are not submitted from this marketing
          build.
        </p>
        <div className="prototype-fields">
          <label>
            <span>Producer / reference repository</span>
            <input placeholder="Repository URL or identifier" disabled />
          </label>
          <label>
            <span>Consumer repository</span>
            <input placeholder="Repository URL or identifier" disabled />
          </label>
        </div>
        <div className="modal-note">
          <Icon name="check" />
          <span>
            <strong>No capability claims implied.</strong> Connect this flow to
            persisted backend state before enabling analysis.
          </span>
        </div>
        <Button onClick={onOpen}>Continue to application preview</Button>
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="faultline-loader" role="status" aria-live="polite" aria-label="Loading FAULTLINE">
      <div className="loader-grain" />
      <div className="loader-content">
        <div className="loader-brand">
          <img src="/faultline-logo.png" alt="" />
          <span>FAULTLINE</span>
        </div>
        <div className="loader-centerpiece" aria-hidden="true">
          <div className="loader-orbit orbit-one" />
          <div className="loader-orbit orbit-two" />
          <div className="loader-core"><img src="/faultline-logo.png" alt="" /></div>
          <span className="loader-node node-one" />
          <span className="loader-node node-two" />
          <span className="loader-node node-three" />
        </div>
        <p className="loader-eyebrow">CROSS-REPOSITORY INTELLIGENCE</p>
        <h1>Follow the evidence.<br /><em>Find the fault line.</em></h1>
        <div className="loader-bottom">
          <span>INITIALIZING INTERFACE</span>
          <span className="loader-sequence"><i /><i /><i /></span>
          <span>PS / 07</span>
        </div>
        <div className="loader-progress-track"><span /></div>
      </div>
      <span className="loader-corner loader-corner-left">FAULTLINE SYSTEMS<br />EVIDENCE-FIRST ANALYSIS</span>
      <span className="loader-corner loader-corner-right">BUILD 01<br />PREVIEW ENVIRONMENT</span>
    </div>
  )
}

export default function App() {
  const [booting, setBooting] = useState(true)
  const getPage = (): Page => {
    const hash = window.location.hash.replace("#", "")
    const pages: Page[] = [
      "home",
      "how",
      "capabilities",
      "docs",
      "access",
      "app",
    ]
    return pages.includes(hash as Page) ? hash as Page : "home"
  }
  const [page, setPage] = useState<Page>(getPage)
  const [modal, setModal] = useState(false)
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const delay = reducedMotion ? 180 : 1350
    const timer = window.setTimeout(() => setBooting(false), delay)
    return () => window.clearTimeout(timer)
  }, [])
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("faultline-theme")
    if (stored === "light" || stored === "dark") return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })

  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"))

  useEffect(() => {
    const onHash = () => setPage(getPage())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setModal(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("faultline-theme", theme)
  }, [theme])

  const openApp = () => {
    setModal(false)
    navigate("app")
  }

  if (booting) {
    return <LoadingScreen />
  }

  if (page === "app") {
    return <AppWorkspace theme={theme} onTheme={toggleTheme} />
  }

  return (
    <div className="app">
      <Header
        page={page}
        onStart={() => setModal(true)}
        theme={theme}
        onTheme={toggleTheme}
      />
      {page === "home" && <HomePage onStart={() => setModal(true)} />}
      {page === "how" && <HowPage onStart={() => setModal(true)} />}
      {page === "capabilities" && <CapabilitiesPage />}
      {page === "docs" && <DocsPage />}
      {page === "access" && <AccessPage onOpen={openApp} />}
      <Footer />
      {modal && <StartModal onClose={() => setModal(false)} onOpen={openApp} />}
    </div>
  )
}
