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

    switch(language){

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
          run:{
            output:"Unsupported language"
          }
        });

    }

    const filePath = path.join(
      process.cwd(),
      "temp",
      fileName
    );

    fs.writeFileSync(
      filePath,
      code
    );

    switch(language){

      case "javascript":

        command = `node "${filePath}"`;
        break;

      case "python":

        command = `python "${filePath}"`;
        break;

      case "cpp":

        command =
          `g++ "${filePath}" -o "temp/${id}" && "temp/${id}"`;

        break;

      case "java":

        command =
          `javac "${filePath}" && java -cp temp Main`;

        break;
    }

    return new Promise<Response>((resolve) => {

      exec(
        command,
        { timeout:3000 },

        (error,stdout,stderr)=>{

          try {

            fs.unlinkSync(filePath);

          } catch {}

          resolve(
            NextResponse.json({
              run:{
                output:
                  error
                  ? stderr || error.message
                  : stdout
              }
            })
          );
        }
      );

    });

  }
  catch(error:unknown){

    return NextResponse.json({
  run:{
    output:
      error instanceof Error
      ? error.message
      : "Unknown error"
  }
});

  }
}