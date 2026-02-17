"use client"

import { useState } from "react"
import { Send, Mail, Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Feedback
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary" />
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Have a project in mind? I&apos;d love to hear from you. Send me a
            message and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Send className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Message Sent!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for reaching out. I&apos;ll respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-primary hover:text-primary/80"
                  type="button"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl border border-border bg-card p-8 shadow-sm"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-110"
                >
                  <Send className="size-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </h3>
              <a
                href="mailto:sarah@example.com"
                className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                sarah@example.com
              </a>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Social
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="flex size-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
                  >
                    <link.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">
                Quick Response
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                I typically respond within 24 hours. For urgent inquiries, feel
                free to reach out directly via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
