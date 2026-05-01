import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Search, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    title: "Share Your Repo",
    description: "Provide the link to your public or private GitHub repository. We handle both.",
    step: "01",
  },
  {
    icon: Search,
    title: "Describe the Issue",
    description: "Tell us what's broken, buggy, or needs improvement. The more detail, the faster the fix.",
    step: "02",
  },
  {
    icon: Wrench,
    title: "We Fix It",
    description: "Our team diagnoses the root cause, writes the patch, and tests it thoroughly.",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Ship It",
    description: "You receive the fix via PR or patch. Review, merge, and you're back on track.",
    step: "04",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Process</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">How It Works</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 h-full">
                <span className="text-6xl font-black text-primary/10 absolute top-4 right-6 select-none group-hover:text-primary/20 transition-colors">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}