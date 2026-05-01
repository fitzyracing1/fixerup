import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Quick Fix",
    value: "quick_fix",
    price: "Consultation",
    description: "Typos, config errors, small UI bugs",
    features: [
      "Single-file changes",
      "Config & environment fixes",
      "Minor CSS / styling issues",
      "Delivered within 24 hours",
      "Price quoted after review",
    ],
    popular: false,
  },
  {
    name: "Standard",
    value: "standard",
    price: "Consultation",
    description: "Logic bugs, API issues, integrations",
    features: [
      "Multi-file debugging",
      "API & integration fixes",
      "Database query optimization",
      "Delivered within 48 hours",
      "Root cause analysis report",
      "Price quoted after review",
    ],
    popular: true,
  },
  {
    name: "Complex",
    value: "complex",
    price: "Consultation",
    description: "Architecture issues, refactoring, performance",
    features: [
      "Cross-system debugging",
      "Performance optimization",
      "Architecture refactoring",
      "Delivered within 5 days",
      "Detailed documentation",
      "Follow-up support",
      "Price quoted after review",
    ],
    popular: false,
  },
  {
    name: "Critical",
    value: "critical",
    price: "Consultation",
    description: "Production emergencies & security vulnerabilities",
    features: [
      "Priority SLA response",
      "Security vulnerability patches",
      "Production incident recovery",
      "24/7 availability",
      "Post-mortem report",
      "Ongoing monitoring setup",
      "Price quoted after review",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Priced by Complexity
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select the tier that matches your problem's complexity. After we review your submission, we'll send you a precise quote before any work begins.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.value}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 border transition-all duration-300 flex flex-col ${
                tier.popular
                  ? "bg-primary/5 border-primary/30 shadow-lg shadow-primary/5"
                  : "bg-card border-border/50 hover:border-primary/20"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 text-xs font-semibold">
                  <Zap className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{tier.description}</p>
                <p className="text-2xl font-black">{tier.price}</p>
                <p className="text-xs text-muted-foreground mt-1">Quoted after problem review</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={`/submit?complexity=${tier.value}`}>
                <Button
                  className={`w-full font-semibold gap-2 ${
                    tier.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}