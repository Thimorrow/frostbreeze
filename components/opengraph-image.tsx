import { ImageResponse } from "next/og";
import LogoIcon from "./icons/logo";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME,
    },
    ...props,
  };

  const file = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  const font = Uint8Array.from(file).buffer;

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full flex-col items-center justify-center"
        style={{ backgroundColor: "#fbf6ec" }}
      >
        <div
          tw="flex flex-none items-center justify-center h-[160px] w-[160px] rounded-3xl bg-white"
          style={{ border: "1px solid rgba(25,20,16,0.12)" }}
        >
          <LogoIcon mono width="96" height="96" style={{ color: "#ff5a36" }} />
        </div>
        <p tw="mt-12 text-6xl font-bold" style={{ color: "#191410" }}>
          {title}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
