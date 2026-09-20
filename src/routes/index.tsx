import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, RESTAURANT, type MenuCategory, type MenuItem } from "@/data/menu";
import logo from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Espaço Imperial — Cardápio Digital da Mesa" },
      {
        name: "description",
        content:
          "Hambúrgueres artesanais, pizzas, porções, chapas e picanha na pedra. Folheie o cardápio digital do Espaço Imperial direto da mesa.",
      },
      { property: "og:title", content: "Espaço Imperial — Cardápio Digital da Mesa" },
      {
        property: "og:description",
        content: "Folheie hambúrgueres, pizzas, porções, chapas e picanha na pedra do Espaço Imperial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Page =
  | { kind: "cover" }
  | { kind: "back" }
  | { kind: "category"; category: MenuCategory };

const pages: Page[] = [
  { kind: "cover" },
  ...categories.map((category) => ({ kind: "category" as const, category })),
  { kind: "back" },
];

const THRESHOLD = 0.18;
const FLICK = 0.35; // px por ms
const DURATION = 440;
const EASE = "cubic-bezier(0.25, 0.9, 0.3, 1)";

type SearchHit = { item: MenuItem; category: MenuCategory; pageIndex: number };

const searchIndex: SearchHit[] = categories.flatMap((category, ci) =>
  category.groups.flatMap((group) =>
    group.items.map((item) => ({ item, category, pageIndex: ci + 1 })),
  ),
);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function Index() {
  const [page, setPage] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<{ item: MenuItem; category: MenuCategory } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const curlRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const dxRef = useRef(0);
  const busyRef = useRef(false);
  const rafRef = useRef(0);
  const drag = useRef<{
    x: number;
    y: number;
    lock: null | "x" | "y";
    lastX: number;
    lastT: number;
    v: number;
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const current = pages[page]!;
  const categoryId = current.kind === "category" ? current.category.id : null;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!categoryId) return;
    const btn = navRef.current?.querySelector<HTMLElement>(`[data-cat="${categoryId}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [categoryId]);

  useEffect(() => {
    const locked = Boolean(selected) || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, searchOpen]);

  // Aplica o quadro da animação direto no DOM (sem re-render) para o gesto ficar fluido no celular.
  const paint = (dx: number, animate: boolean) => {
    const sheet = sheetRef.current;
    const stage = stageRef.current;
    if (!sheet || !stage) return;
    const width = stage.clientWidth || 390;
    const progress = Math.max(-1, Math.min(1, dx / width));
    const abs = Math.abs(progress);
    const forward = dx < 0;
    const eased = Math.sign(progress) * (1 - Math.pow(1 - abs, 1.55));

    sheet.style.transition = animate ? `transform ${DURATION}ms ${EASE}` : "none";
    sheet.style.transformOrigin = forward ? "left center" : "right center";
    sheet.style.transform = `translateX(${eased * width * 0.05}px) rotateY(${-eased * 104}deg)`;
    sheet.style.filter = abs
      ? `drop-shadow(${forward ? "-" : ""}${abs * 26}px 10px ${18 + abs * 26}px rgb(0 0 0 / ${0.35 + abs * 0.3}))`
      : "none";
    sheet.style.borderRadius = forward ? "0 14px 14px 0" : "14px 0 0 14px";

    const curl = curlRef.current;
    if (curl) {
      curl.style.transition = animate ? `opacity ${DURATION}ms ${EASE}` : "none";
      curl.style.opacity = String(Math.min(1, abs * 1.25));
      curl.style.background = forward
        ? "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 14%, rgba(255,255,255,0.06) 34%, rgba(0,0,0,0) 62%)"
        : "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 14%, rgba(255,255,255,0.06) 34%, rgba(0,0,0,0) 62%)";
    }

    for (const [ref, show] of [
      [nextRef, forward && abs > 0],
      [prevRef, !forward && abs > 0],
    ] as const) {
      const el = ref.current;
      if (!el) continue;
      el.style.visibility = show ? "visible" : "hidden";
      el.style.transition = animate
        ? `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}`
        : "none";
      el.style.transform = `scale(${0.975 + abs * 0.025})`;
      el.style.opacity = String(0.55 + abs * 0.45);
    }
  };

  const reset = () => {
    const sheet = sheetRef.current;
    if (sheet) {
      sheet.style.transition = "";
      sheet.style.transform = "";
      sheet.style.filter = "";
      sheet.style.borderRadius = "";
    }
    if (curlRef.current) curlRef.current.style.opacity = "0";
    dxRef.current = 0;
  };

  const turnTo = (next: number) => {
    const clamped = Math.max(0, Math.min(pages.length - 1, next));
    if (clamped === page || busyRef.current) return;
    const width = stageRef.current?.clientWidth || 390;
    busyRef.current = true;
    setDragging(true);
    requestAnimationFrame(() => {
      paint(dxRef.current, false);
      requestAnimationFrame(() => paint(clamped > page ? -width : width, true));
    });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      reset();
      setPage(clamped);
      setDragging(false);
      busyRef.current = false;
      scrollRef.current?.scrollTo({ top: 0 });
    }, DURATION);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (busyRef.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, lock: null, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const start = drag.current;
    if (!start || busyRef.current) return;
    const mx = e.clientX - start.x;
    const my = e.clientY - start.y;
    if (!start.lock) {
      if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
      start.lock = Math.abs(mx) > Math.abs(my) * 1.2 ? "x" : "y";
      if (start.lock === "x") {
        setDragging(true);
        if (e.pointerType !== "mouse") (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      }
    }
    if (start.lock !== "x") return;
    const dt = e.timeStamp - start.lastT;
    if (dt > 0) start.v = (e.clientX - start.lastX) / dt;
    start.lastX = e.clientX;
    start.lastT = e.timeStamp;
    const edge = (mx > 0 && page === 0) || (mx < 0 && page === pages.length - 1);
    dxRef.current = edge ? mx * 0.12 : mx;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => paint(dxRef.current, false));
  };

  const onPointerUp = () => {
    const start = drag.current;
    drag.current = null;
    if (busyRef.current || start?.lock !== "x") return;
    cancelAnimationFrame(rafRef.current);
    const width = stageRef.current?.clientWidth || 390;
    const progress = dxRef.current / width;
    const flick = Math.abs(start.v) > FLICK && Math.sign(start.v) === Math.sign(dxRef.current);
    if (Math.abs(progress) > THRESHOLD || (flick && Math.abs(progress) > 0.04)) {
      turnTo(page + (progress < 0 ? 1 : -1));
      return;
    }
    busyRef.current = true;
    paint(0, true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      reset();
      setDragging(false);
      busyRef.current = false;
    }, DURATION);
  };

  const openHit = (hit: SearchHit) => {
    setSearchOpen(false);
    if (hit.pageIndex !== page) {
      setPage(hit.pageIndex);
      scrollRef.current?.scrollTo({ top: 0 });
    }
    setSelected({ item: hit.item, category: hit.category });
  };

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-cream text-ink select-none">
      <header className="relative shrink-0 overflow-hidden border-b border-brand/20 bg-surface px-5 pt-4 pb-3">
        <div className="absolute -top-12 -right-10 size-36 rounded-full bg-brand/10" />
        <div className="relative flex items-center gap-3">
          <img
            src={logo.url}
            alt="Logo do Espaço Imperial"
            width={559}
            height={447}
            className="h-12 w-auto"
            draggable={false}
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl leading-tight font-extrabold text-brand">
              {RESTAURANT.name}
            </h1>
            <p className="text-[10px] tracking-[0.3em] text-ink/50 uppercase">{RESTAURANT.tagline}</p>
          </div>
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar no cardápio"
            className="shrink-0 rounded-full border border-brand/40 bg-brand/10 p-2.5 text-brand"
          >
            <SearchIcon />
          </button>
        </div>
      </header>

      <nav
        ref={navRef}
        className="no-scrollbar z-20 flex shrink-0 gap-2 overflow-x-auto border-b border-ink/10 bg-cream px-4 py-2.5 whitespace-nowrap"
      >
        <button
          onClick={() => turnTo(0)}
          className={
            page === 0
              ? "shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-cream"
              : "shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/60"
          }
        >
          Capa
        </button>
        {categories.map((c, i) => (
          <button
            key={c.id}
            data-cat={c.id}
            onClick={() => turnTo(i + 1)}
            className={
              c.id === categoryId
                ? "shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-cream"
                : "shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/60"
            }
          >
            {c.label}
          </button>
        ))}
      </nav>

      <main
        ref={stageRef}
        className="page-stage relative flex-1 overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {dragging && (
          <>
            <div
              ref={prevRef}
              className="absolute inset-0 overflow-hidden bg-cream"
              style={{ visibility: "hidden" }}
            >
              {pages[page - 1] && <PageView page={pages[page - 1]!} index={page - 1} muted />}
            </div>
            <div
              ref={nextRef}
              className="absolute inset-0 overflow-hidden bg-cream"
              style={{ visibility: "hidden" }}
            >
              {pages[page + 1] && <PageView page={pages[page + 1]!} index={page + 1} muted />}
            </div>
          </>
        )}

        <div ref={sheetRef} className="page-sheet absolute inset-0 overflow-hidden bg-cream">
          <div ref={scrollRef} className="absolute inset-0 overflow-x-hidden overflow-y-auto">
            <PageView
              key={page}
              page={current}
              index={page}
              onSelect={(item, category) => setSelected({ item, category })}
              onJump={turnTo}
            />
          </div>
          <div
            ref={curlRef}
            className="pointer-events-none absolute inset-0"
            style={{ opacity: 0 }}
          />
        </div>
      </main>

      <footer className="shrink-0 border-t border-ink/10 bg-surface px-5 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => turnTo(page - 1)}
            disabled={page === 0}
            className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink/60 disabled:opacity-25"
          >
            ← Anterior
          </button>
          <div className="flex gap-1.5">
            {pages.map((p, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-5 bg-brand" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => turnTo(page + 1)}
            disabled={page === pages.length - 1}
            className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink/60 disabled:opacity-25"
          >
            Próxima →
          </button>
        </div>
      </footer>

      {selected && <Details data={selected} onClose={() => setSelected(null)} />}
      {searchOpen && <Search onClose={() => setSearchOpen(false)} onPick={openHit} />}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" strokeLinecap="round" />
    </svg>
  );
}

function PageView({
  page,
  index,
  onSelect,
  onJump,
  muted,
}: {
  page: Page;
  index: number;
  onSelect?: (item: MenuItem, category: MenuCategory) => void;
  onJump?: (index: number) => void;
  muted?: boolean;
}) {
  const wrap = muted ? "pointer-events-none opacity-70" : "anim-page-in";

  if (page.kind === "cover" || page.kind === "back") {
    const cover = page.kind === "cover";
    return (
      <div className={`relative flex h-full min-h-full flex-col items-center justify-center px-8 text-center ${wrap}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,var(--color-brand)/18%,transparent_62%)] opacity-40" />
        <div className="pointer-events-none absolute inset-5 rounded-[2rem] border border-brand/25" />
        <div className="pointer-events-none absolute inset-7 rounded-[1.7rem] border border-brand/10" />

        <div className="relative flex flex-col items-center gap-5">
          <Rule />
          <img
            src={logo.url}
            alt="Logo do Espaço Imperial"
            width={559}
            height={447}
            className="h-32 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
            draggable={false}
          />
          <div>
            <h2 className="font-display text-4xl leading-tight font-extrabold text-brand">
              {RESTAURANT.name}
            </h2>
            <p className="mt-2 text-[11px] tracking-[0.45em] text-ink/55 uppercase">
              {RESTAURANT.tagline}
            </p>
          </div>
          <Rule />
          {cover ? (
            <>
              <p className="max-w-[16rem] text-sm leading-relaxed text-ink/60">
                Hambúrgueres artesanais, pizzas na brasa, porções, chapas e picanha na pedra.
              </p>
              <button
                onClick={() => onJump?.(1)}
                className="mt-1 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-cream"
              >
                Abrir o cardápio
              </button>
              <p className="text-[11px] tracking-[0.2em] text-ink/40 uppercase">
                ou deslize o dedo para folhear
              </p>
            </>
          ) : (
            <>
              <p className="max-w-[17rem] text-sm leading-relaxed text-ink/60">
                Obrigado pela visita! Chame a nossa equipe para fazer o seu pedido e bom apetite.
              </p>
              <button
                onClick={() => onJump?.(0)}
                className="mt-1 rounded-full border border-brand/50 px-7 py-3 text-sm font-semibold text-brand"
              >
                Voltar ao início
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const category = page.category;

  return (
    <div className={`space-y-4 px-4 py-5 ${wrap}`}>
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold text-brand">{category.title}</h2>
        <span className="text-[11px] tracking-widest text-ink/35 uppercase">
          {String(index + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
        </span>
      </div>

      {category.intro && <p className="text-[13px] text-ink/55">{category.intro}</p>}

      {category.groups.map((group, gi) => (
        <div key={gi} className="space-y-2.5">
          {group.title && (
            <p className="pt-1 text-[11px] font-semibold tracking-[0.25em] text-brand uppercase">
              {group.title}
            </p>
          )}
          {group.items.map((item, ii) => (
            <button
              key={`${item.name}-${ii}`}
              onClick={() => onSelect?.(item, category)}
              className="flex w-full items-center gap-3 rounded-2xl border border-ink/10 bg-surface p-2.5 text-left transition-transform active:scale-[0.99]"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  loading={ii < 3 ? "eager" : "lazy"}
                  draggable={false}
                  className="size-16 shrink-0 rounded-xl object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[15px] leading-tight font-semibold">{item.name}</h3>
                  {item.price && (
                    <span className="shrink-0 font-display text-[15px] font-bold text-brand">
                      {item.price}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink/55">
                    {item.description}
                  </p>
                )}
                {item.sizes && (
                  <p className="mt-1 text-[12px] font-medium text-brand/90">
                    {item.sizes.map((s) => `${s.label} ${s.price}`).join(" · ")}
                  </p>
                )}
                {item.note && <p className="mt-1 text-[11px] text-ink/40">{item.note}</p>}
              </div>
            </button>
          ))}
        </div>
      ))}

      {category.note && (
        <p className="rounded-2xl bg-brand/10 px-4 py-3 text-[13px] leading-snug text-ink/70">
          {category.note}
        </p>
      )}

      <p className="pt-1 pb-4 text-center text-[11px] text-ink/35">
        Deslize o dedo para folhear o cardápio
      </p>
    </div>
  );
}

function Rule() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-brand/60" />
      <span className="size-1.5 rotate-45 bg-brand/70" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-brand/60" />
    </div>
  );
}

function Search({
  onClose,
  onPick,
}: {
  onClose: () => void;
  onPick: (hit: SearchHit) => void;
}) {
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = normalize(term.trim());
    if (q.length < 2) return [];
    const words = q.split(/\s+/);
    return searchIndex
      .filter((hit) => {
        const hay = normalize(
          `${hit.item.name} ${hit.item.description ?? ""} ${hit.category.title} ${hit.category.label}`,
        );
        return words.every((w) => hay.includes(w));
      })
      .slice(0, 40);
  }, [term]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/80">
      <div className="anim-rise flex h-dvh w-full max-w-md flex-col bg-cream">
        <div className="flex shrink-0 items-center gap-2 border-b border-ink/10 bg-surface px-4 py-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-brand/30 bg-cream px-4 py-2.5">
            <span className="text-brand">
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Buscar prato, categoria ou ingrediente"
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
            />
          </div>
          <button onClick={onClose} className="shrink-0 px-2 text-sm font-medium text-ink/60">
            Fechar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {term.trim().length < 2 ? (
            <p className="mt-10 text-center text-[13px] text-ink/45">
              Digite ao menos 2 letras — por exemplo “bacon”, “pizza” ou “cheddar”.
            </p>
          ) : results.length === 0 ? (
            <p className="mt-10 text-center text-[13px] text-ink/45">
              Nada encontrado para “{term}”.
            </p>
          ) : (
            <div className="space-y-2.5">
              <p className="text-[11px] tracking-[0.2em] text-ink/40 uppercase">
                {results.length} resultado{results.length > 1 ? "s" : ""}
              </p>
              {results.map((hit, i) => (
                <button
                  key={`${hit.item.name}-${i}`}
                  onClick={() => onPick(hit)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-ink/10 bg-surface p-2.5 text-left"
                >
                  {hit.item.image && (
                    <img
                      src={hit.item.image}
                      alt={hit.item.name}
                      loading="lazy"
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="truncate text-[14px] font-semibold">{hit.item.name}</h3>
                      {hit.item.price && (
                        <span className="shrink-0 font-display text-[14px] font-bold text-brand">
                          {hit.item.price}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] tracking-[0.15em] text-brand/80 uppercase">
                      {hit.category.label}
                    </p>
                    {hit.item.description && (
                      <p className="mt-0.5 line-clamp-1 text-[12px] text-ink/50">
                        {hit.item.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Details({
  data,
  onClose,
}: {
  data: { item: MenuItem; category: MenuCategory };
  onClose: () => void;
}) {
  const { item, category } = data;
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <button aria-label="Fechar detalhes" onClick={onClose} className="absolute inset-0 bg-black/70" />
      <div className="anim-rise relative max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-t-3xl border-t border-brand/25 bg-cream p-5 pb-8">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/25" />
        {(item.image ?? category.image) && (
          <img
            src={item.image ?? category.image}
            alt={item.name}
            className="mb-4 h-52 w-full rounded-2xl object-cover"
          />
        )}
        <p className="text-[11px] tracking-[0.25em] text-brand uppercase">{category.title}</p>
        <div className="mt-1 flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-bold">{item.name}</h3>
          {item.price && (
            <span className="shrink-0 font-display text-xl font-bold text-brand">{item.price}</span>
          )}
        </div>
        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
        )}

        {item.sizes && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {item.sizes.map((s) => (
              <div key={s.label} className="rounded-xl border border-ink/10 bg-surface py-2 text-center">
                <p className="text-[11px] tracking-[0.1em] text-ink/50 uppercase">{s.label}</p>
                <p className="font-display text-base font-bold text-brand">{s.price}</p>
              </div>
            ))}
          </div>
        )}

        {item.note && (
          <p className="mt-3 rounded-xl bg-brand/10 px-3 py-2 text-[12px] text-ink/60">{item.note}</p>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-cream"
        >
          Voltar ao cardápio
        </button>
      </div>
    </div>
  );
}
