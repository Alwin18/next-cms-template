import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
    description: "from last month",
  },
  {
    title: "Total Users",
    value: "2,350",
    change: "+180",
    trend: "up" as const,
    icon: Users,
    description: "new users this month",
  },
  {
    title: "Total Orders",
    value: "12,234",
    change: "+19%",
    trend: "up" as const,
    icon: ShoppingCart,
    description: "from last month",
  },
  {
    title: "Growth Rate",
    value: "573",
    change: "-2.5%",
    trend: "down" as const,
    icon: TrendingUp,
    description: "from last month",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    initials: "JD",
    email: "john@example.com",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    initials: "JS",
    email: "jane@example.com",
    amount: "$150.00",
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Bob Wilson",
    initials: "BW",
    email: "bob@example.com",
    amount: "$350.00",
    status: "Completed",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    initials: "AB",
    email: "alice@example.com",
    amount: "$450.00",
    status: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Charlie Davis",
    initials: "CD",
    email: "charlie@example.com",
    amount: "$550.00",
    status: "Completed",
  },
];

const revenueData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 45 },
  { month: "May", value: 60 },
  { month: "Jun", value: 75 },
  { month: "Jul", value: 65 },
  { month: "Aug", value: 80 },
  { month: "Sep", value: 70 },
  { month: "Oct", value: 85 },
  { month: "Nov", value: 90 },
  { month: "Dec", value: 95 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Completed"
      ? "default"
      : status === "Processing"
        ? "secondary"
        : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="rounded-md bg-primary/10 p-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
            {/* Subtle gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary/40 via-primary to-primary/40" />
          </Card>
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the year 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-[260px]">
              {revenueData.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <div className="w-full flex items-end justify-center h-[220px]">
                    <div
                      className="w-full max-w-[32px] rounded-t-md bg-linear-to-t from-primary to-primary/60 transition-all duration-500 hover:from-primary hover:to-primary/80"
                      style={{
                        height: `${(item.value / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "New user registered",
                  description: "John Doe created an account",
                  time: "2 min ago",
                  color: "bg-emerald-500",
                },
                {
                  title: "Order #ORD-001 completed",
                  description: "Payment received successfully",
                  time: "15 min ago",
                  color: "bg-blue-500",
                },
                {
                  title: "New product added",
                  description: "Premium Widget v2.0",
                  time: "1 hour ago",
                  color: "bg-amber-500",
                },
                {
                  title: "Server update deployed",
                  description: "Version 3.2.1 is now live",
                  time: "3 hours ago",
                  color: "bg-purple-500",
                },
                {
                  title: "Report generated",
                  description: "Monthly analytics report",
                  time: "5 hours ago",
                  color: "bg-pink-500",
                },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${activity.color} ring-4 ring-background shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            A list of recent orders from your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Order</th>
                  <th className="pb-3 pr-4 font-medium">Customer</th>
                  <th className="pb-3 pr-4 font-medium hidden sm:table-cell">
                    Email
                  </th>
                  <th className="pb-3 pr-4 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <span className="text-sm font-medium">{order.id}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                            {order.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {order.email}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm font-medium">
                        {order.amount}
                      </span>
                    </td>
                    <td className="py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
