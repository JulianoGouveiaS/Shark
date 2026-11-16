import { ImageResponse } from "next/og";

export const alt = "Shark — o lead da garagem, do oi até a chave";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F3F0E8",
          color: "#102033",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <svg width="220" height="110" viewBox="0 0 128 64" fill="none">
          <g stroke="#E85D04" strokeWidth="2.5" strokeLinecap="round">
            <path d="M2 28h16" />
            <path d="M6 34h10" />
            <path d="M4 40h8" />
          </g>
          <path
            fill="#102033"
            d="M122 33c-12-9-30-13-44-11L64 6l-6 17c-8 2-14 5-16 7L26 14l12 18L24 50l20-14c10 6 22 7 28 6l-8 12 22-11c16 1 28-3 36-10z"
          />
        </svg>
        <div style={{ fontSize: 64, lineHeight: 1.05, marginTop: 28, maxWidth: 900 }}>
          O lead da sua garagem, do oi até a chave.
        </div>
      </div>
    ),
    { ...size },
  );
}
