import { cn } from "@/cosmic/utils";
import { buttonVariants } from "@/cosmic/elements/Button";
import { cosmic } from "@/cosmic/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function Hero({
  query,
  className,
  status,
}: {
  query: any;
  className?: string;
  status?: "draft" | "published" | "any";
}) {
  try {
    const { object: page } = await cosmic.objects
      .findOne(query)
      .props("id,slug,title,metadata")
      .depth(1)
      .status(status ? status : "published");

    return (
      <div className={cn("relative flex justify-center items-center min-h-screen bg-white dark:bg-zinc-900", className)}>
        <div className="mx-auto w-full max-w-6xl flex flex-col-reverse md:flex-row items-center p-6">
          {/* Left Side - Text Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-zinc-900 dark:text-white">
            <h1
              data-cosmic-object={page.id}
              className="text-4xl md:text-7xl font-bold tracking-tight"
            >
              {page.metadata.h1}
            </h1>
            <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-300">
              {page.metadata.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Link
                className={cn(
                  "px-6 py-3 text-lg font-semibold rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 transition-all transform hover:scale-105 shadow-md",
                  buttonVariants({ variant: "default" })
                )}
                href={page.metadata?.cta_button_primary?.link}
              >
                {page.metadata?.cta_button_primary?.text}
              </Link>
              <Link
                className={cn(
                  "px-6 py-3 text-lg font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 dark:text-white transition-all transform hover:scale-105 shadow-md",
                  buttonVariants({ variant: "secondary" })
                )}
                href={page.metadata?.cta_button_secondary?.link}
              >
                {page.metadata?.cta_button_secondary?.text}
              </Link>
            </div>
          </div>

          {/* Right Side - Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={`${page.metadata.image.imgix_url}?w=1600&auto=format,compression`}
              alt={page.title}
              className="w-full max-w-md md:max-w-lg transition-all transform hover:scale-105 shadow-xl dark:hidden"
            />
            <img
              src={`${page.metadata.dark_image.imgix_url}?w=1600&auto=format,compression`}
              alt={page.title}
              className="hidden w-full max-w-md md:max-w-lg transition-all transform hover:scale-105 shadow-xl dark:block"
            />
          </div>
        </div>
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) return notFound();
  }
}
