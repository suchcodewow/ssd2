export default function Home() {
  const theme = useDarkModeContext();
  return (
    <div className={clsx("flex min-h-screen w-full items-center justify-center", theme)}>
      <Head>
        <title>Hello World!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-col gap-8 p-4 dark:bg-stone-900 dark:text-white">
        <div className="flex w-full items-center justify-between text-2xl">
          <div>Downpartly</div>
          <DarkModeToggle className="w-24 text-2xl" />
        </div>

        <div className="prose flex grow flex-col items-center justify-center dark:prose-invert">
          <h1>Mastering TypeScript’s New “satisfies” Operator</h1>
          <div className="flex items-center justify-center gap-4">
            <Image src={profile} alt="Me!" className="w-24 rounded border-4 border-stone-900 dark:border-stone-50" />
            <div className="h-fit grow">
              <p className="m-0 font-bold">By Omari Thompson-Edwards</p>
              <p className="m-0">Published: 17 November 2022</p>
            </div>
          </div>
          <p>
            TypeScript 4.9 beta is introducing a new operator, the “satisfies” operator. The short version is that this
            operator lets you ensure a variable matches a type, while keeping the most specific version of that type.
            You can check out the discussion on the feature here, but in this article, I’ll talk you through how to use
            it, and why it exists.
          </p>
          <div className="flex grow items-center justify-center text-6xl font-bold">
            {theme === "dark" ? <FaMoon /> : <FaSun />}
          </div>
        </div>
      </main>
    </div>
  );
}
