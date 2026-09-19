import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

const THRESHOLD = 0.2;
const FLICK = 0.4; // px por ms

function Index() {
  const [page, setPage] = useState(0);
  const [dx, setDx] = useState(0);
  const [settling, setSettling] = useState(false);
  const [selected, setSelected] = useState<{ item: MenuItem; category: MenuCategory } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    lock: null | "x" | "y";
    lastX: number;
    lastT: number;
    v: number;
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const category = categories[page]!;
  const width = stageRef.current?.clientWidth ?? 390;
  const progress = Math.max(-1, Math.min(1, dx / width));
  const dir: 1 | -1 = progress < 0 ? 1 : -1;
  const target = categories[page + dir];
  const under = target ?? category;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const btn = navRef.current?.querySelector<HTMLElement>(`[data-cat="${category.id}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [category.id]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const turnTo = (next: number) => {
    const clamped = Math.max(0, Math.min(categories.length - 1, next));
    if (clamped === page) return;
    const away = clamped > page ? -width : width;
    setSettling(true);
    setDx(away * 0.999);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPage(clamped);
      setSettling(false);
      setDx(0);
      sheetRef.current?.scrollTo({ top: 0 });
    }, 460);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (settling || e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      lock: null,
      lastX: e.clientX,
      lastT: e.timeStamp,
      v: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const start = drag.current;
    if (!start || settling) return;
    const mx = e.clientX - start.x;
    const my = e.clientY - start.y;
    if (!start.lock) {
      if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
      start.lock = Math.abs(mx) > Math.abs(my) * 1.2 ? "x" : "y";
      if (start.lock === "x" && e.pointerType !== "mouse") {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      }
    }
    if (start.lock !== "x") return;
    const dt = e.timeStamp - start.lastT;
    if (dt > 0) start.v = (e.clientX - start.lastX) / dt;
    start.lastX = e.clientX;
    start.lastT = e.timeStamp;
    const edge = (mx > 0 && page === 0) || (mx < 0 && page === categories.length - 1);
    setDx(edge ? mx * 0.12 : mx);
  };

  const onPointerUp = () => {
    const start = drag.current;
    drag.current = null;
    if (settling) return;
    if (start?.lock === "x") {
      const flick = Math.abs(start.v) > FLICK && Math.sign(start.v) === Math.sign(dx);
      if (Math.abs(progress) > THRESHOLD || (flick && Math.abs(progress) > 0.05)) {
        turnTo(page + (progress < 0 ? 1 : -1));
        return;
      }
    }
    setSettling(true);
    setDx(0);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSettling(false), 420);
  };

  const active = Math.abs(dx) > 0.5;
  const live = active || settling;
  const abs = Math.abs(progress);
  // curva suave: a folha começa leve e acelera no fim do gesto
  const eased = Math.sign(progress) * (1 - Math.pow(1 - abs, 1.55));
  const angle = eased * 104;
  const forward = progress < 0;
  const ease = "cubic-bezier(0.25, 0.9, 0.3, 1)";

  const sheetStyle: React.CSSProperties = live
    ? {
        transform: `translateX(${eased * width * 0.05}px) rotateY(${-angle}deg)`,
        transformOrigin: forward ? "left center" : "right center",
        transition: settling ? `transform 0.46s ${ease}` : "none",
        filter: `drop-shadow(${forward ? "-" : ""}${abs * 26}px 10px ${18 + abs * 26}px rgb(0 0 0 / ${0.35 + abs * 0.3}))`,
        borderRadius: forward ? "0 14px 14px 0" : "14px 0 0 14px",
      }
    : {};

  const curlStyle: React.CSSProperties = {
    opacity: Math.min(1, abs * 1.25),
    transition: settling ? `opacity 0.46s ${ease}` : "none",
    background: forward
      ? "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 14%, rgba(255,255,255,0.06) 34%, rgba(0,0,0,0) 62%)"
      : "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 14%, rgba(255,255,255,0.06) 34%, rgba(0,0,0,0) 62%)",
  };

  return (
    <div className="mx-auto flex h-dvh w-full max-w-md flex-col overflow-hidden bg-cream text-ink select-none">
      <header className="relative shrink-0 overflow-hidden border-b border-brand/20 bg-surface px-5 pt-5 pb-4">
        <div className="absolute -top-12 -right-10 size-36 rounded-full bg-brand/10" />
        <div className="relative flex items-center gap-3">
          <img
            src={logo.url}
            alt="Logo do Espaço Imperial"
            width={559}
            height={447}
            className="h-14 w-auto"
            draggable={false}
          />
          <div className="min-w-0">
            <h1 className="font-display text-2xl leading-tight font-extrabold text-brand">
              {RESTAURANT.name}
            </h1>
            <p className="text-[10px] tracking-[0.3em] text-ink/50 uppercase">{RESTAURANT.tagline}</p>
          </div>
        </div>
      </header>

      <nav
        ref={navRef}
        className="no-scrollbar z-20 flex shrink-0 gap-2 overflow-x-auto border-b border-ink/10 bg-cream px-4 py-2.5 whitespace-nowrap"
      >
        {categories.map((c, i) => (
          <button
            key={c.id}
            data-cat={c.id}
            onClick={() => turnTo(i)}
            className={
              c.id === category.id
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
        {live && (
          <div
            className="absolute inset-0 overflow-hidden bg-cream"
            style={{
              transform: `scale(${0.975 + abs * 0.025})`,
              opacity: 0.55 + abs * 0.45,
              transition: settling ? `transform 0.46s ${ease}, opacity 0.46s ${ease}` : "none",
            }}
          >
            <Page category={under} index={categories.indexOf(under)} onSelect={() => {}} muted />
          </div>
        )}

        <div
          ref={sheetRef}
          className="page-sheet absolute inset-0 overflow-x-hidden overflow-y-auto bg-cream"
          style={sheetStyle}
        >
          <Page
            key={category.id}
            category={category}
            index={page}
            onSelect={(item) => setSelected({ item, category })}
          />
          {live && (
            <div className="pointer-events-none sticky top-0 -mt-[100%] h-dvh w-full" style={curlStyle} />
          )}
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
            onClick={() => turnTo(page + 1)}
            disabled={page === categories.length - 1}
            className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink/60 disabled:opacity-25"
          >
            Próxima →
          </button>
        </div>
      </footer>

      {selected && <Details data={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}


function Page({
  category,
  index,
  onSelect,
  muted,
}: {
  category: MenuCategory;
  index: number;
  onSelect: (item: MenuItem) => void;
  muted?: boolean;
}) {
  return (
    <div className={`space-y-4 px-4 py-5 ${muted ? "pointer-events-none opacity-70" : "anim-page-in"}`}>
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold text-brand">{category.title}</h2>
        <span className="text-[11px] tracking-widest text-ink/35 uppercase">
          {String(index + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
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
              onClick={() => onSelect(item)}
              className="flex w-full items-center gap-3 rounded-2xl border border-ink/10 bg-surface p-2.5 text-left transition-transform active:scale-[0.99]"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  loading={index === 0 && ii < 3 ? "eager" : "lazy"}
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
