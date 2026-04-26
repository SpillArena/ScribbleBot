// functions/quickdraw/[word].ts
export const onRequest: PagesFunction = async (context) => {
    const { params, request } = context as {
        params: Record<string, string>;
        request: Request;
    };

    const word = decodeURIComponent(params.word as string).replace(".ndjson", "");
    const upstream = `https://storage.googleapis.com/quickdraw_dataset/full/simplified/${encodeURIComponent(word)}.ndjson`;

    const rangeHeader = request.headers.get("Range");

    try {
        const upstreamResponse = await fetch(upstream, {
            headers: {
                ...(rangeHeader ? { Range: rangeHeader } : {}),
                "User-Agent": "Mozilla/5.0",
            },
            // Cloudflare Workers follow redirects by default — ensure that:
            redirect: "follow",
        });

        // Accept both 200 and 206 as success
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