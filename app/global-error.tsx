"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Une erreur est survenue
            </h1>
            <p style={{ marginBottom: "1.5rem", color: "#555" }}>
              Veuillez réessayer ou revenir à l&apos;accueil.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #ccc",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Réessayer
            </button>
            {error?.digest && (
              <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#999" }}>
                ERROR {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
