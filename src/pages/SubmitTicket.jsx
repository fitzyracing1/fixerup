import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Wrench, ArrowLeft, Send, Loader2, CheckCircle, GitBranch, Lock, Globe } from "lucide-react";

const complexityLabels = {
  quick_fix: { name: "Quick Fix", price: "$49" },
  standard: { name: "Standard", price: "$149" },
  complex: { name: "Complex", price: "$399" },
  critical: { name: "Critical", price: "Custom" },
};

export default function SubmitTicket() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedComplexity = urlParams.get("complexity") || "standard";

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    repo_url: "",
    repo_type: "public",
    problem_description: "",
    complexity: preselectedComplexity,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.Ticket.create(form);
    setSubmitting(false);
    setSubmitted(true);
    toast({ title: "Ticket submitted!", description: "We'll review your issue shortly." });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black mb-3">Ticket Submitted</h2>
          <p className="text-muted-foreground mb-8">
            We've received your issue and will begin reviewing it shortly. You'll hear from us via email.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">Fix</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Submit a Problem</h1>
          <p className="text-muted-foreground mb-10">
            Tell us about the issue and we'll get to work.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">Contact</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={form.client_name}
                    onChange={(e) => handleChange("client_name", e.target.value)}
                    required
                    className="bg-secondary/50 border-border/50 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.client_email}
                    onChange={(e) => handleChange("client_email", e.target.value)}
                    required
                    className="bg-secondary/50 border-border/50 h-11"
                  />
                </div>
              </div>
            </div>

            {/* Repository */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">Repository</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="repo">GitHub Repository URL</Label>
                  <div className="relative">
                    <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="repo"
                      placeholder="https://github.com/user/repo"
                      value={form.repo_url}
                      onChange={(e) => handleChange("repo_url", e.target.value)}
                      required
                      className="bg-secondary/50 border-border/50 h-11 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Repository Visibility</Label>
                  <RadioGroup
                    value={form.repo_type}
                    onValueChange={(val) => handleChange("repo_type", val)}
                    className="flex gap-4"
                  >
                    <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      form.repo_type === "public" ? "border-primary/40 bg-primary/5" : "border-border/50 bg-secondary/30"
                    }`}>
                      <RadioGroupItem value="public" />
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Public</span>
                    </label>
                    <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      form.repo_type === "private" ? "border-primary/40 bg-primary/5" : "border-border/50 bg-secondary/30"
                    }`}>
                      <RadioGroupItem value="private" />
                      <Lock className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Private</span>
                    </label>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Problem */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">The Problem</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">What's going wrong?</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the bug, error, or issue in detail. Include any error messages, steps to reproduce, and expected behavior..."
                    value={form.problem_description}
                    onChange={(e) => handleChange("problem_description", e.target.value)}
                    required
                    className="bg-secondary/50 border-border/50 min-h-[140px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Complexity Tier</Label>
                  <Select value={form.complexity} onValueChange={(val) => handleChange("complexity", val)}>
                    <SelectTrigger className="bg-secondary/50 border-border/50 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(complexityLabels).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          <span className="flex items-center gap-2">
                            {val.name}
                            <span className="text-muted-foreground">— {val.price}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 text-base gap-2"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {submitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}