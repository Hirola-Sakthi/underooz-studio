// Set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to send forms by POST. Without it, forms open the visitor's email app.
export async function send(type, data) {
  const url = import.meta.env.VITE_FORM_ENDPOINT;
  if (url) {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ type, ...data }),
    });
    if (!r.ok) throw new Error("failed");
    return "sent";
  }
  const b = encodeURIComponent(
    Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
  );
  location.href = `mailto:hello@underooz.studio?subject=${encodeURIComponent("UNDEROOZ " + type)}&body=${b}`;
  return "mailto";
}
