import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { language, code } = await req.json();

    const languageMap: Record<
      string,
      { language: string; version: string }
    > = {
      javascript: {
        language: "javascript",
        version: "18.15.0",
      },

      python: {
        language: "python",
        version: "3.10.0",
      },

      java: {
        language: "java",
        version: "15.0.2",
      },

      typescript: {
        language: "typescript",
        version: "5.0.3",
      },

      go: {
        language: "go",
        version: "1.16.2",
      },
    };

    const runtime = languageMap[language];

    if (!runtime) {
      return NextResponse.json({
        run: {
          output: "Unsupported language",
        },
      });
    }

    const response = await fetch(
      "https://emkc.org/api/v2/piston/execute",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          language: runtime.language,
          version: runtime.version,

          files: [
            {
              content: code,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      run: {
        output:
          data.run?.output ||
          data.compile?.output ||
          "No output",
      },
    });

  } catch (error: unknown) {
    return NextResponse.json({
      run: {
        output:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
    });
  }
}