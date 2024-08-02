import TypeSelector from "@/components/type-selector";
import { NERISProvider } from "@/providers/neris-type-provider";
import { promises as fs } from 'fs';
import { Suspense } from "react";

export default async function Home() {

  const file = await fs.readFile(process.cwd() + '/public/neris_types.json', 'utf8');
  const nerisTypes = JSON.parse(file);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <NERISProvider nerisTypes={nerisTypes} >

          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
            <TypeSelector />
          </div>

          <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <h1>
              Where is this3
              </h1>
          </div>
        </NERISProvider>
      </Suspense>

    </main>
  );
}
