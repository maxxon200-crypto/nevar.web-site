import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "nevar.web, studio di siti web e app a Milano";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Statically generated at build time (cwd is the project root), so the
  // font files are read straight from disk.
  const fontDir = join(process.cwd(), "app", "og");
  const [regular, bold] = await Promise.all([
    readFile(join(fontDir, "SpaceMono-Regular.ttf")),
    readFile(join(fontDir, "SpaceMono-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#f4f7f7",
          backgroundImage:
            "radial-gradient(60% 80% at 88% 8%, rgba(73,197,182,0.22), rgba(244,247,247,0) 60%), radial-gradient(50% 60% at 4% 100%, rgba(0,158,201,0.14), rgba(244,247,247,0) 60%)",
          fontFamily: "SpaceMono",
        }}
      >
        {/* Text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "660px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
              color: "#5a6b72",
              fontSize: "22px",
              letterSpacing: "6px",
            }}
          >
            <span>STUDIO</span>
            <span>/</span>
            <span>MILANO</span>
            <span>/</span>
            <span>WEB &amp; APP</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "26px",
              fontSize: "104px",
              fontWeight: 700,
              letterSpacing: "-4px",
            }}
          >
            <span style={{ color: "#0b1416" }}>nevar</span>
            <span style={{ color: "#009ec9" }}>.web</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "27px",
              lineHeight: 1.5,
              color: "#24343a",
            }}
          >
            Siti web e app su misura. Bianco, veloce, fatto a mano a Milano.
          </div>
        </div>

        {/* Glass orb */}
        <div
          style={{
            display: "flex",
            width: "300px",
            height: "300px",
            borderRadius: "300px",
            border: "1px solid rgba(255,255,255,0.7)",
            backgroundImage:
              "radial-gradient(circle at 36% 30%, #ffffff 0%, #eaf3f3 34%, #bfe6df 62%, #49c5b6 84%, #009ec9 100%)",
            boxShadow: "0 40px 90px -30px rgba(39,121,167,0.45)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SpaceMono", data: regular, weight: 400, style: "normal" },
        { name: "SpaceMono", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
