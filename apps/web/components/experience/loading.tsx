export function Spinner({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`spinner${small ? " spinner-small" : ""}`}
      aria-hidden="true"
    />
  );
}

export function LoadingState({ label = "불러오는 중…" }: { label?: string }) {
  return (
    <div className="loading-state" role="status">
      <Spinner />
      <p>{label}</p>
    </div>
  );
}
