import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {

  try {

    const { language, code } = await req.json();

    const id = uuidv4();

    let fileName = "";
    let command = "";

    // Detect Render deployment
    const isRender = process.env.RENDER === "true";

    switch (language) {

      case "javascript":
        fileName = `${id}.js`;
        break;

      case "python":
        fileName = `${id}.py`;
        break;

      case "cpp":
        fileName = `${id}.cpp`;
        break;

      case "java":
        fileName = `Main.java`;
        break;

      default:

        return NextResponse.json({
          run: {
            output: "Unsupported language"
          }
        });

    }

    // ===============================
    // TEMP DIRECTORY
    // ===============================

    const tempDir = isRender
      ? "/tmp"
      : path.join(process.cwd(), "temp");

    if (!fs.existsSync(tempDir)) {

      fs.mkdirSync(
        tempDir,
        { recursive: true }
      );

    }

    const filePath = path.join(
      tempDir,
      fileName
    );

    fs.writeFileSync(
      filePath,
      code
    );

    // ===============================
    // EXECUTION
    // ===============================

    switch (language) {

      case "javascript":

        command = isRender
          ? `node "${filePath}"`
          : `docker run --rm -v ${process.cwd()}/temp:/app node:18 node /app/${fileName}`;

        break;

      case "python":

        command = isRender
          ? `python "${filePath}"`
          : `docker run --rm -v ${process.cwd()}/temp:/app python:3.10 python /app/${fileName}`;

        break;

      case "cpp":

        command = isRender
          ? `g++ "${filePath}" -o "${tempDir}/a.out" && "${tempDir}/a.out"`
          : `docker run --rm -v ${process.cwd()}/temp:/app gcc:latest sh -c "g++ /app/${fileName} -o /app/a.out && /app/a.out"`;

        break;

      case "java":

        command = isRender
          ? `javac "${filePath}" && java -cp "${tempDir}" Main`
          : `docker run --rm -v ${process.cwd()}/temp:/app openjdk:17 sh -c "javac /app/${fileName} && java -cp /app Main"`;

        break;

    }

    return new Promise<Response>((resolve) => {

      exec(

        command,
        { timeout: 3000 },

        (error, stdout, stderr) => {

          try {

            fs.unlinkSync(filePath);

          } catch {}

          resolve(

            NextResponse.json({

              run: {

                output: error
                  ? (stderr || error.message || "")
                      .toString()
                      .split("\n")
                      .filter(line =>
                        !line.includes("internal") &&
                        !line.includes("Module._compile") &&
                        !line.includes("at ")
                      )
                      .join("\n")
                  : stdout.toString()

              }

            })

          );

        }

      );

    });

  }

  catch (error: unknown) {

    const err = error as Error;

    return NextResponse.json({

      run: {
        output: err.message
      }

    });

  }

}