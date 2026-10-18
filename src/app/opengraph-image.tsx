
import { ImageResponse } from "next/og";

export const alt = "Обжарка «Кварта» — свежий кофе в Минске";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f7f4ec",
          color: "#29271f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
          }}
        >
          <span>МИНСК · С 2019 ГОДА</span>
          <span>ОБЖАРКА КОФЕ</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -5,
              color: "#a64f35",
              lineHeight: 1,
            }}
          >
            Кварта
          </div>

          <div style={{ fontSize: 36, marginTop: 28 }}>
            Кофе, который не нужно ждать долго.
          </div>

          <div
            style={{
              fontSize: 24,
              marginTop: 16,
              color: "#716d61",
            }}
          >
            Свежая обжарка · Доставка по Минску
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #ddd6c8",
            paddingTop: 22,
            fontSize: 20,
          }}
        >
          <span>МАЛЕНЬКИЕ ПАРТИИ · БОЛЬШОЙ ВКУС</span>
          <span>КВАРТА / COFFEE</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
