import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Route,
  Package,
  User,
  Calendar,
  RefreshCw,
  Play,
  Pause,
  Phone,
  DollarSign,
  TrendingUp,
  X
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock dispatch data
const mockDispatchData = {
  activeDeliveries: [
    {
      id: "DEL-001",
      orderId: "ORD-001",
      driver: {
        name: "Mike Johnson",
        phone: "+1 (555) 456-7890",
        vehicle: "MC-001",
        avatar: null
      },
      customer: {
        name: "John Doe",
        address: "123 Main St, City, State 12345",
        phone: "+1 (555) 123-4567"
      },
      status: "in_transit",
      priority: "high",
      estimatedTime: 25,
      distance: "3.2 km",
      items: 3,
      value: 156.50,
      startTime: "2024-01-15T14:30:00Z",
      lastUpdate: "2024-01-15T15:15:00Z",
      route: {
        pickup: "MediCare Pharmacy Central",
        dropoff: "123 Main St, City, State 12345",
        progress: 65
      }
    },
    {
      id: "DEL-002",
      orderId: "ORD-002",
      driver: {
        name: "Emily Davis",
        phone: "+1 (555) 789-0123",
        vehicle: "VN-002",
        avatar: null
      },
      customer: {
        name: "Sarah Smith",
        address: "456 Oak Ave, City, State 12345",
        phone: "+1 (555) 987-6543"
      },
      status: "pickup",
      priority: "medium",
      estimatedTime: 45,
      distance: "5.8 km",
      items: 1,
      value: 89.99,
      startTime: "2024-01-15T15:00:00Z",
      lastUpdate: "2024-01-15T15:05:00Z",
      route: {
        pickup: "MediCare Pharmacy West",
        dropoff: "456 Oak Ave, City, State 12345",
        progress: 15
      }
    },
    {
      id: "DEL-003",
      orderId: "ORD-003",
      driver: {
        name: "Alex Brown",
        phone: "+1 (555) 234-5678",
        vehicle: "BC-003",
        avatar: null
      },
      customer: {
        name: "Mike Johnson",
        address: "789 Pine St, City, State 12345",
        phone: "+1 (555) 456-7890"
      },
      status: "delivered",
      priority: "low",
      estimatedTime: 0,
      distance: "2.1 km",
      items: 2,
      value: 99.99,
      startTime: "2024-01-15T13:20:00Z",
      lastUpdate: "2024-01-15T14:45:00Z",
      route: {
        pickup: "MediCare Pharmacy East",
        dropoff: "789 Pine St, City, State 12345",
        progress: 100
      }
    }
  ],
  pendingAssignments: [
    {
      id: "ORD-004",
      customer: {
        name: "Emma Wilson",
        address: "321 Elm St, City, State 12345",
        phone: "+1 (555) 321-0987"
      },
      priority: "urgent",
      items: 4,
      value: 320.25,
      orderTime: "2024-01-15T15:30:00Z",
      deliveryWindow: "2024-01-15T16:00:00Z - 18:00:00Z",
      specialInstructions: "Prescription medication - ID verification required",
      pharmacy: "MediCare Pharmacy Central"
    },
    {
      id: "ORD-005",
      customer: {
        name: "David Brown",
        address: "654 Cedar Ave, City, State 12345",
        phone: "+1 (555) 654-3210"
      },
      priority: "medium",
      items: 1,
      value: 45.50,
      orderTime: "2024-01-15T15:45:00Z",
      deliveryWindow: "2024-01-15T17:00:00Z - 19:00:00Z",
      specialInstructions: "",
      pharmacy: "MediCare Pharmacy West"
    }
  ],
  availableDrivers: [
    {
      id: "DRV-001",
      name: "Mike Johnson",
      phone: "+1 (555) 456-7890",
      vehicle: "MC-001",
      location: "Downtown District",
      status: "available",
      rating: 4.8,
      deliveriesToday: 8
    },
    {
      id: "DRV-004",
      name: "Lisa Wang",
      phone: "+1 (555) 888-9999",
      vehicle: "VN-004",
      location: "West District",
      status: "available",
      rating: 4.9,
      deliveriesToday: 6
    }
  ]
};

const getStatusBadge = (status: string) => {
  const styles = {
    pickup: "bg-blue-100 text-blue-800 border-blue-200",
    in_transit: "bg-orange-100 text-orange-800 border-orange-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    delayed: "bg-red-100 text-red-800 border-red-200",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const icons = {
    pickup: Package,
    in_transit: Truck,
    delivered: CheckCircle,
    delayed: AlertTriangle,
    cancelled: X,
  };

  const Icon = icons[status as keyof typeof icons];
  
  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium", styles[status as keyof typeof styles])}
    >
      <Icon className="w-3 h-3 mr-1" />
      {status.replace('_', ' ').toUpperCase()}
    </Badge>
  );
};

const getPriorityBadge = (priority: string) => {
  const styles = {
    urgent: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", styles[priority as keyof typeof styles])}
    >
      {priority.toUpperCase()}
    </Badge>
  );
};

export function LogisticsManagement() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  const filteredDeliveries = mockDispatchData.activeDeliveries.filter((delivery) => {
    const matchesSearch = delivery.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getDeliveryCounts = () => {
    return {
      active: mockDispatchData.activeDeliveries.filter(d => d.status !== 'delivered').length,
      pickup: mockDispatchData.activeDeliveries.filter(d => d.status === 'pickup').length,
      in_transit: mockDispatchData.activeDeliveries.filter(d => d.status === 'in_transit').length,
      delivered: mockDispatchData.activeDeliveries.filter(d => d.status === 'delivered').length,
    };
  };

  const deliveryCounts = getDeliveryCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logistics & Dispatch</h1>
          <p className="text-muted-foreground">
            Manage order assignments, delivery tracking, and route optimization.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Navigation className="w-4 h-4 mr-2" />
            Auto Assign
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryCounts.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently en route
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDispatchData.pendingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting driver assignment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Drivers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDispatchData.availableDrivers.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready for assignment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryCounts.delivered}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+18%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="relative">
            Active Deliveries
            <Badge variant="secondary" className="ml-2 text-xs">
              {deliveryCounts.active}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Assignments
            <Badge variant="secondary" className="ml-2 text-xs">
              {mockDispatchData.pendingAssignments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="drivers" className="relative">
            Available Drivers
            <Badge variant="secondary" className="ml-2 text-xs">
              {mockDispatchData.availableDrivers.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Active Deliveries Tab */}
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries ({deliveryCounts.active})</CardTitle>
              <CardDescription>Real-time tracking of ongoing deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDeliveries.map((delivery) => (
                  <div 
                    key={delivery.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDelivery(delivery)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={delivery.driver.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                          {delivery.driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{delivery.orderId}</span>
                          {getStatusBadge(delivery.status)}
                          {getPriorityBadge(delivery.priority)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{delivery.driver.name}</span>
                          <span>→ {delivery.customer.name}</span>
                          <span>{delivery.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={delivery.route.progress} className="w-32 h-2" />
                          <span className="text-xs text-muted-foreground">{delivery.route.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${delivery.value.toFixed(2)}</p>
                        {delivery.estimatedTime > 0 ? (
                          <p className="text-xs text-muted-foreground">
                            ETA: {delivery.estimatedTime}m
                          </p>
                        ) : (
                          <p className="text-xs text-success">Delivered</p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Track Delivery
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Driver
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Route className="mr-2 h-4 w-4" />
                            View Route
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Assignments Tab */}
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments ({mockDispatchData.pendingAssignments.length})</CardTitle>
              <CardDescription>Orders awaiting driver assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDispatchData.pendingAssignments.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        {getPriorityBadge(order.priority)}
                        <Badge variant="outline" className="text-xs">
                          {order.items} items
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{order.customer.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{order.customer.address}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span>Ordered: {new Date(order.orderTime).toLocaleTimeString()}</span>
                        <span className="ml-4">From: {order.pharmacy}</span>
                      </div>
                      {order.specialInstructions && (
                        <div className="flex items-center gap-2 text-xs text-orange-600">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{order.specialInstructions}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${order.value.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          Delivery: {new Date(order.deliveryWindow.split(' - ')[0]).toLocaleTimeString()} - {new Date(order.deliveryWindow.split(' - ')[1]).toLocaleTimeString()}
                        </p>
                      </div>
                      <Button size="sm">
                        <User className="w-4 h-4 mr-2" />
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Available Drivers Tab */}
        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Drivers ({mockDispatchData.availableDrivers.length})</CardTitle>
              <CardDescription>Drivers ready for order assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDispatchData.availableDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{driver.name}</span>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            AVAILABLE
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{driver.vehicle}</span>
                          <span>📍 {driver.location}</span>
                          <span>⭐ {driver.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {driver.deliveriesToday} deliveries today
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm">
                        <Package className="w-4 h-4 mr-2" />
                        Assign Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
