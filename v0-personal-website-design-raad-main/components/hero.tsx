import Image from "next/image"
import { ArrowDown, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-20">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Text content */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
            Available for freelance work
          </span>

          <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {"Hi, I'm "}
            <span className="text-primary">Sarah Johnson</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-muted-foreground sm:text-xl">
            Web Developer & Designer
          </p>

          <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            I create beautiful, functional websites that help businesses grow.
            Turning ideas into polished digital experiences with clean code and
            thoughtful design.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
            >
              View My Work
              <ArrowDown className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-secondary"
            >
              <Mail className="size-4" />
              Get In Touch
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
              <Image
                src="/images/hero-portrait.jpg"
                alt="Sarah Johnson, web developer and designer"
                width={460}
                height={540}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
