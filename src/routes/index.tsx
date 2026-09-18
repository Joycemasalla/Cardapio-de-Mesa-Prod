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
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [drag, setDrag] = useState(0);
  const [selected, setSelected] = useState<{ item: MenuItem; category: MenuCategory } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number; lock: null | "x" | "y" } | null>(null);

  const category = categories[page]!;
  const active = category.id;

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(categories.length - 1, next));
    if (clamped === page) return;
    setDir(clamped > page ? 1 : -1);
    setPage(clamped);
    setDrag(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

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

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]!;
    touch.current = { x: t.clientX, y: t.clientY, lock: null };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const start = touch.current;
    if (!start) return;
    const t = e.touches[0]!;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (!start.lock) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      start.lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (start.lock !== "x") return;
    const atEdge = (dx > 0 && page === 0) || (dx < 0 && page === categories.length - 1);
    setDrag(atEdge ? dx * 0.2 : dx);
  };

  const onTouchEnd = () => {
    const start = touch.current;
    touch.current = null;
    if (start?.lock === "x" && Math.abs(drag) > 60) {
      goTo(page + (drag < 0 ? 1 : -1));
      return;
    }
    setDrag(0);
  };

  const dragging = drag !== 0;

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
        {categories.map((c, i) => (
          <button
            key={c.id}
            data-cat={c.id}
            onClick={() => goTo(i)}
            className={
              active === c.id
                ? "shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-colors"
                : "shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors"
            }
          >
            {c.label}
          </button>
        ))}
      </nav>

      <main
        className="page-stage flex-1 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <section
          key={category.id}
          id={category.id}
          className={`space-y-4 px-5 py-6 ${dragging ? "" : dir === 1 ? "anim-flip-next" : "anim-flip-prev"}`}
          style={
            dragging
              ? {
                  transform: `translateX(${drag}px) rotateY(${-drag * 0.04}deg)`,
                  transformOrigin: drag < 0 ? "left center" : "right center",
                }
              : undefined
          }
        >
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">{category.title}</h2>
            <span className="text-xs tracking-widest text-ink/40 uppercase">
              {String(page + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={category.image}
              alt={`Imagem ilustrativa de ${category.title}`}
              loading={page === 0 ? "eager" : "lazy"}
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
                  className="flex w-full items-start gap-3 rounded-2xl border border-ink/10 bg-white/70 p-3 text-left transition-transform active:scale-[0.99]"
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

          <p className="pt-2 text-center text-[11px] text-ink/40">
            Deslize para o lado para folhear o cardápio
          </p>
        </section>
      </main>

      <footer className="sticky bottom-0 border-t border-ink/10 bg-cream/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink/70 disabled:opacity-30"
          >
            ← Anterior
          </button>
          <div className="flex gap-1.5">
            {categories.map((c, i) => (
              <span
                key={c.id}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-5 bg-brand" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(page + 1)}
            disabled={page === categories.length - 1}
            className="rounded-full border border-ink/15 px-4 py-2 text-xs font-medium text-ink/70 disabled:opacity-30"
          >
            Próxima →
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-ink/40">
          {RESTAURANT.name} — faça seu pedido com a nossa equipe.
        </p>
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
