"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Executive",
    content:
      "The coaching sessions have transformed my leadership approach. I'm now more confident in my decision-making and communication with my team.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "The personalized training program helped me achieve my fitness goals in just 3 months. The coaches are knowledgeable and supportive.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Small Business Owner",
    content: "The business coaching provided practical strategies that helped me grow my revenue by 40% in six months.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const previous = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(next, 8000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="w-full flex-shrink-0 border-none shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Quote className="h-12 w-12 text-primary/20 mb-6" />
                <p className="text-lg mb-6 italic">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <Button variant="outline" size="icon" onClick={previous} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 p-0 rounded-full ${current === index ? "bg-primary" : "bg-primary/20"}`}
          />
        ))}
        <Button variant="outline" size="icon" onClick={next} className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
