import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { categories, RESTAURANT, type MenuCategory, type MenuItem } from "@/data/menu";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Espaço Imperial — Cardápio Digital da Mesa" },
      {
        name: "description",
        content:
          "Hambúrgueres artesanais, pizzas, porções, chapas e picanha na pedra. Cardápio digital do Espaço Imperial para consultar na mesa.",
      },
      { property: "og:title", content: "Espaço Imperial — Cardápio Digital da Mesa" },
      {
        property: "og:description",
        content: "Explore hambúrgueres, pizzas, porções, chapas e picanha na pedra do Espaço Imperial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PIZZA_SIZES = [
  { label: "P", price: "R$ 42,00" },
  { label: "M", price: "R$ 48,00" },
  { label: "G", price: "R$ 53,00" },
];

function initials(name: string) {
  return name
    .replace(/[^A-Za-zÀ-ÿ ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Index() {
  const [active, setActive] = useState(categories[0].id);
  const [selected, setSelected] = useState<{ item: MenuItem; category: MenuCategory } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const btn = navRef.current?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-cream text-ink shadow-2xl shadow-black/10">
      <header className="relative overflow-hidden bg-ink px-6 pt-8 pb-7 text-cream">
        <div className="absolute -top-10 -right-8 size-40 rounded-full bg-brand/20" />
        <div className="absolute top-24 right-16 size-16 rounded-full bg-gold/20" />
        <div className="relative">
          <p className="text-[11px] tracking-[0.35em] text-gold uppercase">{RESTAURANT.tagline}</p>
          <h1 className="mt-1 font-display text-4xl leading-none font-extrabold">{RESTAURANT.name}</h1>
          <p className="mt-4 text-sm text-cream/70">{RESTAURANT.intro}</p>
        </div>
      </header>

      <nav
        ref={navRef}
        className="no-scrollbar sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-ink/10 bg-cream/95 px-4 py-3 whitespace-nowrap backdrop-blur"
      >
        {categories.map((c) => (
          <a
            key={c.id}
            data-cat={c.id}
            href={`#${c.id}`}
            className={
              active === c.id
                ? "shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-colors"
                : "shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors"
            }
          >
            {c.label}
          </a>
        ))}
      </nav>

      <main className="flex-1 space-y-10 px-5 py-6">
        {categories.map((category, ci) => (
          <section key={category.id} id={category.id} className="scroll-mt-24 space-y-4">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold">{category.title}</h2>
              <span className="text-xs tracking-widest text-ink/40 uppercase">
                {String(ci + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={category.image}
                alt={`Imagem ilustrativa de ${category.title}`}
                loading={ci === 0 ? "eager" : "lazy"}
                width={816}
                height={816}
                className="h-36 w-full object-cover"
              />
              <span className="absolute right-2 bottom-2 rounded-full bg-ink/70 px-2 py-1 text-[10px] text-cream/80">
                Imagem ilustrativa
              </span>
            </div>

            {category.intro && <p className="text-[13px] text-ink/60">{category.intro}</p>}

            {category.groups.map((group, gi) => (
              <div key={gi} className="space-y-3">
                {group.title && (
                  <p className="pt-1 text-[11px] font-semibold tracking-[0.25em] text-brand uppercase">
                    {group.title}
                  </p>
                )}
                {group.items.map((item, ii) => (
                  <button
                    key={`${item.name}-${ii}`}
                    onClick={() => setSelected({ item, category })}
                    className="anim-rise flex w-full items-start gap-3 rounded-2xl border border-ink/10 bg-white/70 p-3 text-left transition-transform active:scale-[0.99]"
                  >
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 font-display text-sm font-bold text-brand">
                      {initials(item.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-base font-semibold">{item.name}</h3>
                        {item.price && (
                          <span className="shrink-0 font-display text-base font-bold text-brand">
                            {item.price}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="mt-0.5 text-[13px] leading-snug text-ink/60">{item.description}</p>
                      )}
                      {item.sizes && (
                        <p className="mt-1 text-[13px] font-medium text-ink/70">
                          {item.sizes.map((s) => `${s.label} ${s.price}`).join(" · ")}
                        </p>
                      )}
                      {item.note && <p className="mt-1 text-[11px] text-ink/45">{item.note}</p>}
                      {category.id === "pizzas" && !item.price && (
                        <p className="mt-1 text-[13px] font-medium text-ink/70">
                          P R$ 42,00 · M R$ 48,00 · G R$ 53,00
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}

            {category.note && (
              <p className="rounded-2xl bg-ink px-4 py-3 text-[13px] leading-snug text-cream/80">
                {category.note}
              </p>
            )}
          </section>
        ))}
      </main>

      <footer className="border-t border-ink/10 bg-cream px-6 py-5 text-center">
        <p className="text-[11px] text-ink/45">
          {RESTAURANT.name} — cardápio da mesa. Faça seu pedido com a nossa equipe.
        </p>
        <a
          href="#"
          className="mt-3 inline-block rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink/70"
        >
          Voltar ao topo
        </a>
      </footer>

      {selected && (
        <div className="fixed inset-0 z-40 flex items-end justify-center">
          <button
            aria-label="Fechar detalhes"
            onClick={() => setSelected(null)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div className="anim-rise relative w-full max-w-md rounded-t-3xl bg-cream p-5 pb-8">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/20" />
            <div className="relative mb-4 overflow-hidden rounded-2xl">
              <img
                src={selected.category.image}
                alt={`Imagem ilustrativa de ${selected.category.title}`}
                loading="lazy"
                width={816}
                height={816}
                className="h-40 w-full object-cover"
              />
              <span className="absolute right-2 bottom-2 rounded-full bg-ink/70 px-2 py-1 text-[10px] text-cream/80">
                Imagem ilustrativa
              </span>
            </div>
            <p className="text-[11px] tracking-[0.25em] text-brand uppercase">{selected.category.title}</p>
            <div className="mt-1 flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-bold">{selected.item.name}</h3>
              {selected.item.price && (
                <span className="shrink-0 font-display text-xl font-bold text-brand">
                  {selected.item.price}
                </span>
              )}
            </div>
            {selected.item.description && (
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{selected.item.description}</p>
            )}

            {(selected.item.sizes ||
              (selected.category.id === "pizzas" && !selected.item.price)) && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {(selected.item.sizes ?? PIZZA_SIZES).map((s) => (
                  <div key={s.label} className="rounded-xl border border-ink/10 bg-white/70 py-2 text-center">
                    <p className="text-[11px] tracking-[0.15em] text-ink/50 uppercase">{s.label}</p>
                    <p className="font-display text-base font-bold text-brand">{s.price}</p>
                  </div>
                ))}
              </div>
            )}

            {selected.item.note && (
              <p className="mt-3 rounded-xl bg-ink/5 px-3 py-2 text-[12px] text-ink/60">{selected.item.note}</p>
            )}
            {selected.category.note && (
              <p className="mt-2 text-[12px] text-ink/50">{selected.category.note}</p>
            )}

            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full rounded-xl bg-ink py-3.5 text-sm font-semibold text-cream"
            >
              Voltar ao cardápio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
