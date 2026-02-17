import Image from "next/image"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "E-commerce Store",
    description:
      "A fully responsive online store with cart functionality, product filtering, and secure checkout integration.",
    image: "/images/project-ecommerce.jpg",
    tags: ["React", "Next.js", "Stripe"],
  },
  {
    title: "Restaurant Website",
    description:
      "An elegant website for a local restaurant featuring online reservations, menu browsing, and location details.",
    image: "/images/project-restaurant.jpg",
    tags: ["HTML/CSS", "JavaScript", "Figma"],
  },
  {
    title: "Portfolio Blog",
    description:
      "A minimal, content-focused blog with markdown support, dark mode, and a clean reading experience.",
    image: "/images/project-blog.jpg",
    tags: ["Next.js", "Tailwind", "MDX"],
  },
]

export function Projects() {
  return (
    <section id="projects" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Projects
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            A selection of recent work I&apos;m proud of. Each project reflects
            my commitment to clean code and thoughtful design.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
              </div>

              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View Project
                  <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
