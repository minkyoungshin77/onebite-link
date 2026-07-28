import { NextRequest } from "next/server";

type OgData = {
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
};

function extractMetaContent(html: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return "";
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function resolveUrl(possiblyRelativeUrl: string, baseUrl: string): string {
  try {
    return new URL(possiblyRelativeUrl, baseUrl).toString();
  } catch {
    return possiblyRelativeUrl;
  }
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return Response.json(
      { error: "url 쿼리 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("invalid protocol");
    }
  } catch {
    return Response.json(
      { error: "올바르지 않은 URL입니다." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OpenGraphBot/1.0)",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return Response.json(
        { error: "링크를 불러올 수 없습니다." },
        { status: 502 },
      );
    }

    const html = await res.text();

    const ogTitle = extractMetaContent(html, [
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i,
    ]);
    const ogDescription = extractMetaContent(html, [
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:description["']/i,
    ]);
    const ogImage = extractMetaContent(html, [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["']/i,
    ]);
    const titleTag = extractMetaContent(html, [/<title[^>]*>([^<]*)<\/title>/i]);
    const descriptionTag = extractMetaContent(html, [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
    ]);

    const data: OgData = {
      title: ogTitle || titleTag || parsedUrl.hostname,
      description: ogDescription || descriptionTag || "",
      thumbnailUrl: ogImage
        ? resolveUrl(ogImage, parsedUrl.toString())
        : "",
      url: parsedUrl.toString(),
    };

    return Response.json(data);
  } catch {
    return Response.json(
      { error: "오픈 그래프 정보를 가져오는 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }
}
