"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Star, Send, Loader2 } from "lucide-react"

type Feedback = {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

function StarRating({
  value,
  onChange,
  readonly = false,
}: {
  value: number
  onChange?: (val: number) => void
  readonly?: boolean
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center gap-1" role="group" aria-label={`Rating: ${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`transition-transform ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={`size-5 transition-colors ${
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const date = new Date(feedback.created_at)
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {feedback.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground">{feedback.name}</p>
            <p className="text-xs text-muted-foreground">
              {formattedDate} at {formattedTime}
            </p>
          </div>
        </div>
        <StarRating value={feedback.rating} readonly />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {feedback.message}
      </p>
    </div>
  )
}

export function Feedback() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  const supabase = createClient()

  const fetchFeedback = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })

    if (!fetchError && data) {
      setFeedbackList(data)
    }
  }, [supabase])

  useEffect(() => {
    fetchFeedback()
  }, [fetchFeedback])

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("feedback-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedback" },
        (payload) => {
          setFeedbackList((prev) => {
            const exists = prev.some((f) => f.id === payload.new.id)
            if (exists) return prev
            return [payload.new as Feedback, ...prev]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Please enter your name.")
      return
    }
    if (!message.trim()) {
      setError("Please enter a feedback message.")
      return
    }
    if (rating === 0) {
      setError("Please select a rating.")
      return
    }

    setIsSubmitting(true)

    const { error: insertError } = await supabase.from("feedback").insert({
      name: name.trim(),
      message: message.trim(),
      rating,
    })

    setIsSubmitting(false)

    if (insertError) {
      setError("Failed to submit feedback. Please try again.")
      return
    }

    setSubmitSuccess(true)
    setName("")
    setMessage("")
    setRating(0)

    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <section id="feedback" className="bg-secondary/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Feedback
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            What People Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {"I'd love to hear your thoughts. Leave your feedback below and it will appear in real-time!"}
          </p>
        </div>

        {/* Feedback Cards */}
        {feedbackList.length > 0 && (
          <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feedbackList.map((fb) => (
              <FeedbackCard key={fb.id} feedback={fb} />
            ))}
          </div>
        )}

        {feedbackList.length === 0 && (
          <div className="mb-14 rounded-xl border border-dashed border-border bg-card/50 py-12 text-center">
            <p className="text-muted-foreground">
              No feedback yet. Be the first to share your thoughts!
            </p>
          </div>
        )}

        {/* Feedback Form */}
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Leave Your Feedback
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="feedback-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="feedback-message"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Rating
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              {submitSuccess && (
                <p className="text-sm font-medium text-accent" role="status">
                  Thank you for your feedback!
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
