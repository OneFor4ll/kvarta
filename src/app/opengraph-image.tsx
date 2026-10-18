
import { ImageResponse } from "next/og";

export const alt = "Обжарка «Кварта» — свежий кофе в Минске";
export const size = {
  width: 1200,
  height: 630,
};
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
          padding: "48px 58px",
          background: "#f7f4ec",
          color: "#29271f",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 3,
            color: "#716d61",
          }}
        >
          <span>МИНСК · С 2019 ГОДА</span>
          <span>ОБЖАРКА КОФЕ</span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 30,
          }}
        >
          {/* Brand text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 650,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 94,
                fontWeight: 700,
                letterSpacing: -4,
                color: "#a64f35",
                lineHeight: 1.1,
              }}
            >
              Кварта
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 32,
                lineHeight: 1.35,
                marginTop: 24,
              }}
            >
              Кофе, который не нужно ждать долго.
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 22,
                lineHeight: 1.5,
                marginTop: 18,
                color: "#716d61",
              }}
            >
              <span>Свежая обжарка</span>
              <span>Доставка по Минску</span>
            </div>
          </div>

          {/* Coffee illustration */}
          <div
            style={{
              display: "flex",
              width: 340,
              height: 390,
              flexShrink: 0,
              borderRadius: 18,
              background: "#ede7da",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 120,
              }}
            >
              ☕
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                letterSpacing: 3,
                color: "#716d61",
                marginTop: 12,
              }}
            >
              KVARTA COFFEE
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #ddd6c8",
            paddingTop: 18,
            fontSize: 17,
            letterSpacing: 1,
            color: "#716d61",
          }}
        >
          <span>МАЛЕНЬКИЕ ПАРТИИ · БОЛЬШОЙ ВКУС</span>
          <span>KVARTA COFFEE</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
