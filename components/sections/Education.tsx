import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/shared/Logo";

export function Education() {
  return (
    <section id="education" className="section bg-band text-white">
      <div className="container-x">
        <p className="mb-3 text-base font-medium text-white/60 lg:text-lg">
          Education
        </p>
        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Where I studied
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {siteConfig.education.map((ed) => (
            <div
              key={ed.school}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white p-2">
                  <Logo
                    src={ed.logo}
                    name={ed.school}
                    className="max-h-10 w-auto object-contain"
                    fallbackClassName="text-sm text-ink"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{ed.school}</h3>
                  <p className="text-sm text-white/70">{ed.detail}</p>
                  <p className="mt-0.5 text-xs text-white/50">{ed.period}</p>
                </div>
              </div>
              {ed.notes && ed.notes.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-sm text-white/70">
                  {ed.notes.map((n, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-white/30">—</span>
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
