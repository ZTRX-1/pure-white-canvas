import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

const revealSelector = [
  "main section > div",
  "main section article",
  "main section li",
  "main section [data-motion-card]",
].join(",");

function animateNumber(element: HTMLElement) {
  const raw = element.dataset['count'];
  if (!raw) return;
  const target = Number(raw.replace(",", "."));
  if (!Number.isFinite(target)) return;

  const decimals = raw.includes(",") ? raw.split(",")[1]?.length ?? 0 : 0;
  const prefix = element.dataset['countPrefix'] ?? "";
  const suffix = element.dataset['countSuffix'] ?? "";
  const duration = 1500;
  const startedAt = performance.now();

  const frame = (now: number) => {
    const progress = Math.max(0, Math.min((now - startedAt) / duration, 1));
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    const formatted = current.toFixed(decimals).replace(".", ",");
    element.textContent = `${prefix}${formatted}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

export function SiteMotion() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (pathname.startsWith("/interno") || pathname === "/login") return;
    let revealObserver: IntersectionObserver | undefined;
    let countObserver: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
      const countTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));

      if (reduceMotion || !("IntersectionObserver" in window)) {
        revealTargets.forEach((element) => element.classList.add("motion-visible"));
        return;
      }

      revealTargets.forEach((element) => element.classList.add("motion-reveal"));
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7%" },
      );
      revealTargets.forEach((element) => revealObserver?.observe(element));

      countObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateNumber(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.65 },
      );
      countTargets.forEach((element) => countObserver?.observe(element));
    }, 180);

    return () => {
      window.clearTimeout(timer);
      revealObserver?.disconnect();
      countObserver?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/interno") || pathname === "/login") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const images = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (images.length === 0) return;
    let frame = 0;

    const update = () => {
      images.forEach((image) => {
        const parent = image.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const offset = Math.max(-24, Math.min(24, (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.08));
        image.style.setProperty("--parallax-offset", `${offset}px`);
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const startTimer = window.setTimeout(update, 180);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(startTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}