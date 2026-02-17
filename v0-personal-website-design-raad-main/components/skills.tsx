const skillGroups = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js"],
  },
  {
    category: "Design Tools",
    skills: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    category: "Other",
    skills: ["WordPress", "Git", "Node.js", "Tailwind CSS"],
  },
]

const categoryColors: Record<string, string> = {
  Frontend: "bg-primary/8 text-primary border-primary/15",
  "Design Tools": "bg-accent/8 text-accent border-accent/15",
  Other: "bg-foreground/5 text-foreground border-border",
}

export function Skills() {
  return (
    <section id="skills" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"Skills & Technologies"}
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-10">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-sm ${categoryColors[group.category]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
