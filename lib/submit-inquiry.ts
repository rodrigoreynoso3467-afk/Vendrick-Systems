// Submit to the static file so Netlify Forms handles the POST before Next.js routing.
// Only a successful Netlify response is treated as acceptance. Delivery to an inbox
// is a separate notification step and is never asserted by the UI.
export async function submitInquiry(fields: Record<string, FormDataEntryValue>, transport: typeof fetch = fetch) {
  const body = new URLSearchParams();
  for (const [name, value] of Object.entries(fields)) {
    if (typeof value !== "string") throw new Error("Attachments are not supported");
    body.set(name, value);
  }
  body.set("form-name", "vendrick-inquiry");
  const response = await transport("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    redirect: "error",
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok || !response.headers.get("x-nf-request-id")) {
    throw new Error("Netlify acceptance could not be confirmed");
  }
}
