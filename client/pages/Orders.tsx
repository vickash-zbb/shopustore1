import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  X
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: 12.50 },
      { name: "Vitamin D3", quantity: 1, price: 24.99 }
    ],
    total: 49.99,
    status: "pending",
    category: "medicine",
    orderDate: "2024-01-15T10:30:00Z",
    deliveryAddress: "123 Main St, City, State 12345",
    assignedDriver: null,
    paymentMethod: "Credit Card",
    prescriptionRequired: true
  },
  {
    id: "ORD-002",
    customer: "Sarah Smith",
    email: "sarah.smith@email.com",
    phone: "+1 (555) 987-6543",
    items: [
      { name: "First Aid Kit", quantity: 1, price: 89.99 }
    ],
    total: 89.99,
    status: "completed",
    category: "supplies",
    orderDate: "2024-01-15T09:15:00Z",
    deliveryAddress: "456 Oak Ave, City, State 12345",
    assignedDriver: "Mike Johnson",
    paymentMethod: "PayPal",
    prescriptionRequired: false
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 456-7890",
    items: [
      { name: "Digital Thermometer", quantity: 1, price: 49.99 },
      { name: "Face Masks (50pcs)", quantity: 2, price: 25.00 }
    ],
    total: 99.99,
    status: "in_progress",
    category: "equipment",
    orderDate: "2024-01-15T08:45:00Z",
    deliveryAddress: "789 Pine St, City, State 12345",
    assignedDriver: "Emily Davis",
    paymentMethod: "Cash on Delivery",
    prescriptionRequired: false
  },
  {
    id: "ORD-004",
    customer: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 (555) 321-0987",
    items: [
      { name: "Insulin Pen", quantity: 2, price: 120.00 },
      { name: "Blood Glucose Strips", quantity: 3, price: 45.50 }
    ],
    total: 311.50,
    status: "cancelled",
    category: "medicine",
    orderDate: "2024-01-14T16:20:00Z",
    deliveryAddress: "321 Elm St, City, State 12345",
    assignedDriver: null,
    paymentMethod: "Insurance",
    prescriptionRequired: true
  }
];

const getStatusBadge = (status: string) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const icons = {
    pending: Clock,
    completed: CheckCircle,
    in_progress: Truck,
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

const getCategoryBadge = (category: string) => {
  const styles = {
    medicine: "bg-brand-100 text-brand-800 border-brand-200",
    supplies: "bg-purple-100 text-purple-800 border-purple-200",
    equipment: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", styles[category as keyof typeof styles])}
    >
      {category.toUpperCase()}
    </Badge>
  );
};

export function Orders() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || order.category === categoryFilter;
    const matchesTab = selectedTab === "all" || order.status === selectedTab;

    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  const getStatusCounts = () => {
    return {
      all: mockOrders.length,
      pending: mockOrders.filter(o => o.status === 'pending').length,
      in_progress: mockOrders.filter(o => o.status === 'in_progress').length,
      completed: mockOrders.filter(o => o.status === 'completed').length,
      cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">
            Track and manage all customer orders across medicine and supply categories.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Package className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders, customers, or order IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="relative">
            All Orders
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.pending}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="relative">
            In Progress
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.in_progress}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="relative">
            Completed
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.completed}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="relative">
            Cancelled
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.cancelled}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {/* Orders List */}
          <Card>
            <CardHeader>
              <CardTitle>Orders ({filteredOrders.length})</CardTitle>
              <CardDescription>
                {selectedTab === "all" ? "All orders" : `${selectedTab.replace('_', ' ')} orders`} in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          {getStatusBadge(order.status)}
                          {getCategoryBadge(order.category)}
                          {order.prescriptionRequired && (
                            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                              Rx Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items.length} items • {new Date(order.orderDate).toLocaleDateString()} • {order.paymentMethod}
                        </p>
                        {order.assignedDriver && (
                          <p className="text-xs text-muted-foreground">
                            Driver: {order.assignedDriver}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Assign Driver
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                
                {filteredOrders.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">No orders found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Detail Modal would go here */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {selectedOrder.customer}</p>
                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                    <p><strong>Category:</strong> {getCategoryBadge(selectedOrder.category)}</p>
                    <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                    <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Items Ordered</h4>
                <div className="border rounded-lg">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="p-3 bg-muted">
                    <div className="flex justify-between items-center font-medium">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Delivery Information</h4>
                <p className="text-sm">{selectedOrder.deliveryAddress}</p>
                {selectedOrder.assignedDriver && (
                  <p className="text-sm mt-1">
                    <strong>Assigned Driver:</strong> {selectedOrder.assignedDriver}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Order
                </Button>
                <Button variant="outline" className="flex-1">
                  <Truck className="w-4 h-4 mr-2" />
                  Assign Driver
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
