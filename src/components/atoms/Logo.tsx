export function Logo() {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <div className="logo__mark w-9 h-9 rounded-xl flex items-center justify-center">
        <svg
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </div>
      <span className="logo__text">SkyCast</span>
    </div>
  );
}
