import { Coffee, Camera, Plane, Code } from "lucide-react"

const interests = [
  { icon: Coffee, label: "Coffee", color: "bg-amber-500/10 text-amber-600" },
  { icon: Camera, label: "Photography", color: "bg-pink-500/10 text-pink-600" },
  { icon: Plane, label: "Travel", color: "bg-sky-500/10 text-sky-600" },
  { icon: Code, label: "Coding", color: "bg-emerald-500/10 text-emerald-600" },
]

export function About() {
  return (
    <section id="about" className="bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Me
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Text */}
          <div className="space-y-5 lg:col-span-3">
            <p className="leading-relaxed text-muted-foreground">
              I&apos;m a passionate web developer and designer based in San
              Francisco. With over 5 years of experience, I specialize in
              building modern, responsive websites and web applications that
              deliver exceptional user experiences.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              My journey into web development started when I built my first HTML
              page in college and instantly fell in love with the creative
              problem-solving that comes with turning designs into functional
              interfaces. Since then, I&apos;ve worked with startups and small
              businesses to bring their visions to life.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I&apos;m not coding, you&apos;ll find me exploring new coffee
              shops, traveling to new places, or experimenting with photography.
              I believe that diverse interests fuel creativity and make me a
              better designer.
            </p>
          </div>

          {/* Interests */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What I Enjoy
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${item.color} transition-transform group-hover:scale-110`}
                  >
                    <item.icon className="size-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
