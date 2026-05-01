import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, ArrowLeft, Clock, CircleDot, CheckCircle, XCircle, ExternalLink, Globe, Lock } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  in_progress: { label: "In Progress", icon: CircleDot, className: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "Completed", icon: CheckCircle, className: "bg-green-500/10 text-green-400 border-green-500/20" },
  cancelled: { label: "Cancelled", icon: XCircle, className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const complexityConfig = {
  quick_fix: { label: "Quick Fix", className: "bg-secondary text-secondary-foreground" },
  standard: { label: "Standard", className: "bg-primary/10 text-primary" },
  complex: { label: "Complex", className: "bg-accent/10 text-accent" },
  critical: { label: "Critical", className: "bg-destructive/10 text-destructive" },
};

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState("all");
  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => base44.entities.Ticket.list("-created_date"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Ticket.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });

  const filtered = filterStatus === "all" ? tickets : tickets.filter((t) => t.status === filterStatus);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">Fix</span>
            <Badge variant="outline" className="text-xs ml-2">Dashboard</Badge>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Tickets</h1>
            <p className="text-sm text-muted-foreground mt-1">{tickets.length} total tickets</p>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-44 bg-secondary/50 border-border/50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tickets */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No tickets found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((ticket) => {
              const status = statusConfig[ticket.status] || statusConfig.pending;
              const complexity = complexityConfig[ticket.complexity] || complexityConfig.standard;
              const StatusIcon = status.icon;

              return (
                <div
                  key={ticket.id}
                  className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/20 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold truncate">{ticket.client_name}</h3>
                        <span className="text-xs text-muted-foreground">{ticket.client_email}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {ticket.problem_description}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <a
                          href={ticket.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-primary hover:underline font-mono"
                        >
                          {ticket.repo_type === "private" ? (
                            <Lock className="w-3 h-3" />
                          ) : (
                            <Globe className="w-3 h-3" />
                          )}
                          {ticket.repo_url?.replace("https://github.com/", "")}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <Badge className={complexity.className + " text-xs border-0"}>
                          {complexity.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {ticket.created_date && format(new Date(ticket.created_date), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={status.className + " border gap-1.5 px-3"}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </Badge>
                      <Select
                        value={ticket.status}
                        onValueChange={(val) => updateMutation.mutate({ id: ticket.id, data: { status: val } })}
                      >
                        <SelectTrigger className="w-36 h-9 text-xs bg-secondary/50 border-border/50">
                          <SelectValue placeholder="Update" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}