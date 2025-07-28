import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Truck,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data - in a real app, this would come from your API
const mockData = {
  metrics: {
    totalOrders: 1247,
    totalRevenue: 87420,
    activeUsers: 892,
    deliveriesInProgress: 23,
  },
  trends: {
    ordersChange: 12.5,
    revenueChange: 8.3,
    usersChange: 15.2,
    deliveriesChange: -2.1,
  },
  recentOrders: [
    { id: "ORD-001", customer: "John Doe", items: 3, total: 156.50, status: "pending", time: "2 min ago" },
    { id: "ORD-002", customer: "Sarah Smith", items: 1, total: 89.99, status: "completed", time: "5 min ago" },
    { id: "ORD-003", customer: "Mike Johnson", items: 2, total: 203.75, status: "in_progress", time: "8 min ago" },
    { id: "ORD-004", customer: "Emma Wilson", items: 4, total: 320.25, status: "pending", time: "12 min ago" },
    { id: "ORD-005", customer: "David Brown", items: 1, total: 45.50, status: "completed", time: "15 min ago" },
  ],
  deliveryMetrics: {
    onTimeDelivery: 94.5,
    averageDeliveryTime: 28,
    activeDrivers: 12,
    pendingAssignments: 8,
  },
  topProducts: [
    { name: "Paracetamol 500mg", sales: 234, revenue: 4680, category: "Medicine" },
    { name: "Vitamin D3", sales: 189, revenue: 3780, category: "Supplements" },
    { name: "First Aid Kit", sales: 156, revenue: 4680, category: "Supplies" },
    { name: "Digital Thermometer", sales: 134, revenue: 6700, category: "Equipment" },
  ]
};

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  className 
}: { 
  title: string; 
  value: string; 
  change: number; 
  icon: any; 
  className?: string; 
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground">
        {change > 0 ? (
          <>
            <TrendingUp className="mr-1 h-3 w-3 text-success" />
            <span className="text-success">+{change}%</span>
          </>
        ) : (
          <>
            <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
            <span className="text-destructive">{change}%</span>
          </>
        )}
        <span className="ml-1">from last month</span>
      </div>
    </CardContent>
  </Card>
);

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="default" className="bg-success text-success-foreground">Completed</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>;
    case 'in_progress':
      return <Badge variant="outline" className="border-warning text-warning">In Progress</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your e-pharmacy today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-success text-success">
            <div className="mr-1 h-2 w-2 rounded-full bg-success" />
            System Online
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Orders"
          value={mockData.metrics.totalOrders.toLocaleString()}
          change={mockData.trends.ordersChange}
          icon={ShoppingCart}
        />
        <MetricCard
          title="Revenue"
          value={`$${mockData.metrics.totalRevenue.toLocaleString()}`}
          change={mockData.trends.revenueChange}
          icon={DollarSign}
        />
        <MetricCard
          title="Active Users"
          value={mockData.metrics.activeUsers.toLocaleString()}
          change={mockData.trends.usersChange}
          icon={Users}
        />
        <MetricCard
          title="Deliveries in Progress"
          value={mockData.metrics.deliveriesInProgress.toString()}
          change={mockData.trends.deliveriesChange}
          icon={Truck}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.items} items • {order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delivery Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Delivery Performance
            </CardTitle>
            <CardDescription>Real-time delivery metrics and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>On-Time Delivery Rate</span>
                <span className="font-medium">{mockData.deliveryMetrics.onTimeDelivery}%</span>
              </div>
              <Progress value={mockData.deliveryMetrics.onTimeDelivery} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg. Delivery Time</p>
                <p className="text-2xl font-bold">{mockData.deliveryMetrics.averageDeliveryTime}m</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold">{mockData.deliveryMetrics.activeDrivers}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Pending Assignments</span>
              </div>
              <span className="font-bold text-warning">{mockData.deliveryMetrics.pendingAssignments}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Top Selling Products
            </CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">View All Orders</p>
                  <p className="text-xs text-muted-foreground">Manage customer orders</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Manage Users</p>
                  <p className="text-xs text-muted-foreground">Customer & staff accounts</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Track Deliveries</p>
                  <p className="text-xs text-muted-foreground">Real-time delivery status</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Add Product</p>
                  <p className="text-xs text-muted-foreground">Manage inventory</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
