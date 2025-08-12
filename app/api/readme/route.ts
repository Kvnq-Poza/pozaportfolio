export async function GET() {
  try {
    // Attempt to fetch the static README from public/README.md
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/README.md`, {
      cache: "no-store",
    }).catch(() => fetch("/README.md", { cache: "no-store" } as RequestInit))

    if (!res || !res.ok) {
      // Fallback to relative fetch (in some runtimes)
      const fallback = await fetch("/README.md", { cache: "no-store" } as RequestInit)
      if (!fallback.ok) {
        return new Response("README.md not found.", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } })
      }
      const text = await fallback.text()
      const looksLikeHtml = /^\s*<!DOCTYPE html>|^\s*<html/i.test(text)
      if (looksLikeHtml) {
        return new Response("README is not available as plain text in this preview.", {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        })
      }
      return new Response(text, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } })
    }

    const text = await res.text()
    const looksLikeHtml = /^\s*<!DOCTYPE html>|^\s*<html/i.test(text)
    if (looksLikeHtml) {
      return new Response("README is not available as plain text in this preview.", {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  } catch (err) {
    return new Response("Failed to load README.md", { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } })
  }
}
