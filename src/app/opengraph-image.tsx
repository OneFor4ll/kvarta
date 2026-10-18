import { ImageResponse } from "next/og";

export const alt = "Обжарка «Кварта» — свежий кофе в Минске";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Same palette as the site (kvarta.css)
const C = {
  paper: "#e9ebe0",
  bean: "#2a1f19",
  beanLight: "#4d382c",
  muted: "#625f52",
  leaf: "#2f4f38",
  yolk: "#f2b632",
};

const T = {
  labelLeft: "Минск · с 2019 года",
  labelRight: "Обжарка кофе",
  brand: "Кварта",
  tagline: "Кофе, который не нужно ждать долго.",
  lines: ["Свежая обжарка", "Доставка по Минску"],
  footLeft: "Маленькие партии · большой вкус",
  footRight: "Kvarta Coffee",
  stampTop: "партия",
  stampNum: "5 кг",
};

// Fetches only the glyphs we need from Google Fonts (Cyrillic included).
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!resource) throw new Error("font source not found");
  const res = await fetch(resource[1]);
  if (res.status !== 200) throw new Error("font download failed");
  return res.arrayBuffer();
}

function Bean({
  left,
  top,
  scale,
  rotate,
}: {
  left: number;
  top: number;
  scale: number;
  rotate: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left,
        top,
        width: 120 * scale,
        height: 170 * scale,
        borderRadius: "50%",
        background: C.bean,
        alignItems: "center",
        justifyContent: "center",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 10 * scale,
          height: 128 * scale,
          borderRadius: 10,
          background: C.beanLight,
          transform: "rotate(6deg)",
        }}
      />
    </div>
  );
}

export default async function OpenGraphImage() {
  const onestText = [
    T.labelLeft,
    T.labelRight,
    T.tagline,
    ...T.lines,
    T.footLeft,
    T.footRight,
    T.stampTop,
  ].join("");
  const bitterText = T.brand + T.stampNum;

  let fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 600 | 800;
    style: "normal";
  }[] = [];
  try {
    const [onest, bitter] = await Promise.all([
      loadGoogleFont("Onest:wght@600", onestText),
      loadGoogleFont("Bitter:wght@800", bitterText),
    ]);
    fonts = [
      { name: "Onest", data: onest, weight: 600, style: "normal" },
      { name: "Bitter", data: bitter, weight: 800, style: "normal" },
    ];
  } catch {
    // Falls back to the default font if Google Fonts is unreachable
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: C.paper,
          color: C.bean,
          fontFamily: "Onest, sans-serif",
          fontWeight: 600,
        }}
      >
        {/* Left: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 740,
            height: "100%",
            padding: "48px 56px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: C.muted,
            }}
          >
            <span>{T.labelLeft}</span>
            <span style={{ marginLeft: 22 }}>{T.labelRight}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Brand with marker swipe, echoing the site headline */}
            <div style={{ display: "flex", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: -6,
                  right: -6,
                  bottom: 10,
                  height: 38,
                  background: C.yolk,
                }}
              />
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  fontFamily: "Bitter, Georgia, serif",
                  fontSize: 148,
                  fontWeight: 800,
                  letterSpacing: -4,
                  lineHeight: 1,
                }}
              >
                {T.brand}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 540,
                marginTop: 32,
                fontSize: 36,
                lineHeight: 1.3,
              }}
            >
              {T.tagline}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 24,
                gap: 10,
                fontSize: 24,
                color: C.muted,
              }}
            >
              {T.lines.map((line) => (
                <div key={line} style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      width: 12,
                      height: 12,
                      marginRight: 14,
                      borderRadius: "50%",
                      background: C.yolk,
                      border: `2px solid ${C.bean}`,
                    }}
                  />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: `2px solid ${C.bean}`,
              paddingTop: 18,
              fontSize: 20,
              color: C.muted,
            }}
          >
            <span>{T.footLeft}</span>
            <span>{T.footRight}</span>
          </div>
        </div>

        {/* Right: green panel with scattered beans */}
        <div
          style={{
            display: "flex",
            position: "relative",
            flex: 1,
            height: "100%",
            overflow: "hidden",
            background: C.leaf,
          }}
        >
          <Bean left={150} top={40} scale={0.9} rotate={20} />
          <Bean left={340} top={14} scale={0.6} rotate={60} />
          <Bean left={300} top={200} scale={1.1} rotate={-30} />
          <Bean left={110} top={300} scale={0.8} rotate={50} />
          <Bean left={280} top={460} scale={1} rotate={15} />
          <Bean left={60} top={500} scale={0.7} rotate={-20} />
        </div>

        {/* Stamp straddling the edge, like on the site hero */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 655,
            top: 70,
            width: 176,
            height: 176,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "50%",
            background: C.yolk,
            border: `3px solid ${C.bean}`,
            transform: "rotate(-9deg)",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 8,
              left: 8,
              right: 8,
              bottom: 8,
              borderRadius: "50%",
              border: `1.5px solid ${C.bean}`,
            }}
          />
          <div style={{ display: "flex", fontSize: 20 }}>{T.stampTop}</div>
          <div
            style={{
              display: "flex",
              marginTop: 2,
              fontFamily: "Bitter, Georgia, serif",
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {T.stampNum}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
