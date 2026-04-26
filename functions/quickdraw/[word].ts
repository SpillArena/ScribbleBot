// functions/quickdraw/[word].ts

interface PagesContext {
    params: Record<string, string>;
    request: Request;
    env: Record<string, unknown>;
    next: () => Promise<Response>;
    data: Record<string, unknown>;
}

export const onRequest = async (context: PagesContext) => {
    const word = decodeURIComponent(context.params.word).replace(".ndjson", "");
    const upstream = `https://storage.googleapis.com/quickdraw_dataset/full/simplified/${encodeURIComponent(word)}.ndjson`;

    const rangeHeader = context.request.headers.get("Range");

    try {
        const upstreamResponse = await fetch(upstream, {
            headers: {
                ...(rangeHeader ? { Range: rangeHeader } : {}),
                "User-Agent": "Mozilla/5.0",
            },
            redirect: "follow",
        });

        if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
            return new Response(`Not found: ${word} (status ${upstreamResponse.status})`, {
                status: upstreamResponse.status,
            });
        }

        return new Response(upstreamResponse.body, {
            status: upstreamResponse.status,
            headers: {
                "Content-Type": "application/x-ndjson",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "public, max-age=86400",
            },
        });
    } catch (err) {
        return new Response(`Worker fetch failed: ${err}`, { status: 502 });
    }
};