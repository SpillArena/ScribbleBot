// functions/quickdraw/[word].ts
export const onRequest: PagesFunction = async (context) => {
    const { params, request } = context as {
        params: Record<string, string>;
        request: Request;
    };

    const word = decodeURIComponent(params.word).replace(".ndjson", "");
    const upstream = `https://storage.googleapis.com/quickdraw_dataset/full/simplified/${encodeURIComponent(word)}.ndjson`;

    const rangeHeader = request.headers.get("Range");

    const upstreamResponse = await fetch(upstream, {
        headers: rangeHeader ? { Range: rangeHeader } : {},
    });

    if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
        return new Response(`Not found: ${word}`, { status: 404 });
    }

    return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        headers: {
            "Content-Type": "application/x-ndjson",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=86400",
        },
    });
};