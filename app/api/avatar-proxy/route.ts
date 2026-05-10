import { NextRequest, NextResponse } from "next/server";

// Liste blanche des hôtes autorisés pour eviter l'usage du proxy comme open relay.
const ALLOWED_HOSTS = new Set<string>([
  "saien.s3.eu-west-par.io.cloud.ovh.net",
  "s3.eu-west-par.io.cloud.ovh.net",
]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");
  if (!target) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new NextResponse("Invalid url parameter", { status: 400 });
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return new NextResponse("Unsupported protocol", { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  const upstream = await fetch(parsed.toString(), {
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return new NextResponse(`Upstream error (${upstream.status})`, {
      status: upstream.status || 502,
    });
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  headers.set("content-type", contentType);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("content-length", contentLength);
  headers.set("cache-control", "public, max-age=300");
  headers.set("access-control-allow-origin", "*");

  return new NextResponse(upstream.body, { status: 200, headers });
}
