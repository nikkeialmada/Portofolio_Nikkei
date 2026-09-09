import { SectionHeader } from "@/components/shared/SectionHeader";
import { siteConfig } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="About me"
          title="A mining engineer who also ships software"
        />

        <div className="mt-8 max-w-3xl space-y-4 text-ink-dim">
          {siteConfig.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h3 className="mt-14 text-xl font-semibold text-ink">
          Specialisation &amp; core tech stack
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(siteConfig.skills).map(([group, items]) => (
            <div
              key={group}
              className="rounded-xl border border-line bg-bg p-5 shadow-card"
            >
              <p className="text-sm font-semibold text-ink">{group}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {items.map((it) => (
                  <li
                    key={it}
                    className="rounded-md bg-surface px-2 py-1 text-xs font-medium text-ink-dim"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
