import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Route,
  Package,
  DollarSign,
  Calendar,
  Navigation,
  Shield,
  FileText,
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

// Mock delivery staff data
const mockDeliveryStaff = [
  {
    id: "DRV-001",
    name: "Mike Johnson",
    email: "mike.johnson@medicare.com",
    phone: "+1 (555) 456-7890",
    avatar: null,
    status: "active",
    onDuty: true,
    currentLocation: "Downtown District",
    vehicleType: "Motorcycle",
    vehicleNumber: "MC-001",
    licenseNumber: "DL123456789",
    joinDate: "2023-08-15T09:00:00Z",
    lastActive: "2024-01-15T14:30:00Z",
    completedDeliveries: 234,
    averageRating: 4.8,
    totalEarnings: 5420.50,
    currentOrders: 2,
    todayDeliveries: 8,
    onTimeDelivery: 94.5,
    customerRatings: 4.8,
    address: "456 Driver St, City, State 12345",
    emergencyContact: {
      name: "Sarah Johnson",
      phone: "+1 (555) 456-7891",
      relationship: "Wife"
    },
    documents: {
      license: { verified: true, expiry: "2026-12-31" },
      insurance: { verified: true, expiry: "2025-06-30" },
      backgroundCheck: { verified: true, date: "2023-08-10" }
    },
    performanceMetrics: {
      deliverySpeed: 92,
      customerService: 96,
      reliability: 88
    }
  },
  {
    id: "DRV-002",
    name: "Emily Davis",
    email: "emily.davis@medicare.com", 
    phone: "+1 (555) 789-0123",
    avatar: null,
    status: "active",
    onDuty: false,
    currentLocation: "East District",
    vehicleType: "Van",
    vehicleNumber: "VN-002",
    licenseNumber: "DL987654321",
    joinDate: "2023-09-20T10:30:00Z",
    lastActive: "2024-01-15T18:00:00Z",
    completedDeliveries: 189,
    averageRating: 4.9,
    totalEarnings: 4380.75,
    currentOrders: 0,
    todayDeliveries: 12,
    onTimeDelivery: 97.2,
    customerRatings: 4.9,
    address: "789 Delivery Ave, City, State 12345",
    emergencyContact: {
      name: "Robert Davis",
      phone: "+1 (555) 789-0124",
      relationship: "Father"
    },
    documents: {
      license: { verified: true, expiry: "2027-03-15" },
      insurance: { verified: true, expiry: "2025-09-20" },
      backgroundCheck: { verified: true, date: "2023-09-15" }
    },
    performanceMetrics: {
      deliverySpeed: 95,
      customerService: 98,
      reliability: 94
    }
  },
  {
    id: "DRV-003",
    name: "James Wilson",
    email: "james.wilson@medicare.com",
    phone: "+1 (555) 234-5678",
    avatar: null,
    status: "suspended",
    onDuty: false,
    currentLocation: "West District",
    vehicleType: "Bicycle",
    vehicleNumber: "BC-003",
    licenseNumber: "DL456789123",
    joinDate: "2023-07-10T08:45:00Z",
    lastActive: "2024-01-10T12:15:00Z",
    completedDeliveries: 98,
    averageRating: 3.2,
    totalEarnings: 1850.25,
    currentOrders: 0,
    todayDeliveries: 0,
    onTimeDelivery: 76.3,
    customerRatings: 3.2,
    address: "321 Bike Lane, City, State 12345",
    emergencyContact: {
      name: "Mary Wilson",
      phone: "+1 (555) 234-5679",
      relationship: "Mother"
    },
    documents: {
      license: { verified: false, expiry: "2024-02-28" },
      insurance: { verified: true, expiry: "2025-01-15" },
      backgroundCheck: { verified: false, date: "2023-07-05" }
    },
    performanceMetrics: {
      deliverySpeed: 68,
      customerService: 72,
      reliability: 45
    }
  }
];

const getStatusBadge = (status: string, onDuty?: boolean) => {
  if (status === "active" && onDuty) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
        ON DUTY
      </Badge>
    );
  }
  
  const styles = {
    active: "bg-blue-100 text-blue-800 border-blue-200",
    inactive: "bg-gray-100 text-gray-800 border-gray-200",
    suspended: "bg-red-100 text-red-800 border-red-200",
  };

  const icons = {
    active: CheckCircle,
    inactive: Clock,
    suspended: AlertTriangle,
  };

  const Icon = icons[status as keyof typeof icons];
  
  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium", styles[status as keyof typeof styles])}
    >
      <Icon className="w-3 h-3 mr-1" />
      {status === "active" && !onDuty ? "OFF DUTY" : status.toUpperCase()}
    </Badge>
  );
};

const getVehicleBadge = (vehicleType: string) => {
  const styles = {
    motorcycle: "bg-orange-100 text-orange-800 border-orange-200",
    van: "bg-purple-100 text-purple-800 border-purple-200",
    bicycle: "bg-green-100 text-green-800 border-green-200",
    car: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", styles[vehicleType.toLowerCase() as keyof typeof styles])}
    >
      {vehicleType.toUpperCase()}
    </Badge>
  );
};

export function DeliveryStaffManagement() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const filteredStaff = mockDeliveryStaff.filter((staff) => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "on_duty" && staff.onDuty) ||
                      (selectedTab === "off_duty" && !staff.onDuty) ||
                      staff.status === selectedTab;

    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusCounts = () => {
    return {
      all: mockDeliveryStaff.length,
      on_duty: mockDeliveryStaff.filter(s => s.onDuty).length,
      off_duty: mockDeliveryStaff.filter(s => !s.onDuty && s.status === 'active').length,
      suspended: mockDeliveryStaff.filter(s => s.status === 'suspended').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Delivery Staff Management</h1>
          <p className="text-muted-foreground">
            Manage delivery personnel profiles, assignments, and performance metrics.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDeliveryStaff.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+2</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.on_duty}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockDeliveryStaff.reduce((sum, s) => sum + s.averageRating, 0) / mockDeliveryStaff.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+0.2</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries Today</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDeliveryStaff.reduce((sum, s) => sum + s.todayDeliveries, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all drivers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search drivers by name, email, or ID..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="relative">
            All Drivers
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="on_duty" className="relative">
            On Duty
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.on_duty}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="off_duty" className="relative">
            Off Duty
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.off_duty}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="suspended" className="relative">
            Suspended
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.suspended}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {/* Staff List */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Staff ({filteredStaff.length})</CardTitle>
              <CardDescription>
                {selectedTab === "all" ? "All drivers" : `${selectedTab.replace('_', ' ')} drivers`} in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStaff.map((staff) => (
                  <div 
                    key={staff.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDriver(staff)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={staff.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{staff.name}</span>
                          {getStatusBadge(staff.status, staff.onDuty)}
                          {getVehicleBadge(staff.vehicleType)}
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs font-medium">{staff.averageRating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {staff.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {staff.currentLocation}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{staff.completedDeliveries} deliveries</span>
                          <span>{staff.todayDeliveries} today</span>
                          <span>{staff.onTimeDelivery}% on-time</span>
                          {staff.currentOrders > 0 && (
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                              {staff.currentOrders} active orders
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${staff.totalEarnings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {staff.vehicleNumber}
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Driver
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Route className="mr-2 h-4 w-4" />
                            View Routes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="mr-2 h-4 w-4" />
                            Assign Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                
                {filteredStaff.length === 0 && (
                  <div className="text-center py-8">
                    <Truck className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">No drivers found</h3>
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

      {/* Driver Detail Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedDriver.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-xl">
                      {selectedDriver.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{selectedDriver.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selectedDriver.status, selectedDriver.onDuty)}
                      {getVehicleBadge(selectedDriver.vehicleType)}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedDriver(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-medium mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedDriver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedDriver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedDriver.address}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Delivery Speed</span>
                        <span>{selectedDriver.performanceMetrics.deliverySpeed}%</span>
                      </div>
                      <Progress value={selectedDriver.performanceMetrics.deliverySpeed} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Customer Service</span>
                        <span>{selectedDriver.performanceMetrics.customerService}%</span>
                      </div>
                      <Progress value={selectedDriver.performanceMetrics.customerService} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Reliability</span>
                        <span>{selectedDriver.performanceMetrics.reliability}%</span>
                      </div>
                      <Progress value={selectedDriver.performanceMetrics.reliability} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h4 className="font-medium mb-3">Statistics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Deliveries</p>
                    <p className="font-medium text-lg">{selectedDriver.completedDeliveries}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Today's Deliveries</p>
                    <p className="font-medium text-lg">{selectedDriver.todayDeliveries}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">On-Time Rate</p>
                    <p className="font-medium text-lg">{selectedDriver.onTimeDelivery}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Earnings</p>
                    <p className="font-medium text-lg">${selectedDriver.totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h4 className="font-medium mb-3">Vehicle Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedDriver.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Vehicle Number</p>
                    <p className="font-medium">{selectedDriver.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">License Number</p>
                    <p className="font-medium">{selectedDriver.licenseNumber}</p>
                  </div>
                </div>
              </div>

              {/* Document Verification */}
              <div>
                <h4 className="font-medium mb-3">Document Verification</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">Driving License</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedDriver.documents.license.verified ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        Exp: {new Date(selectedDriver.documents.license.expiry).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Insurance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedDriver.documents.insurance.verified ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        Exp: {new Date(selectedDriver.documents.insurance.expiry).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Background Check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedDriver.documents.backgroundCheck.verified ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        Date: {new Date(selectedDriver.documents.backgroundCheck.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="font-medium mb-3">Emergency Contact</h4>
                <div className="text-sm">
                  <p><strong>Name:</strong> {selectedDriver.emergencyContact.name}</p>
                  <p><strong>Phone:</strong> {selectedDriver.emergencyContact.phone}</p>
                  <p><strong>Relationship:</strong> {selectedDriver.emergencyContact.relationship}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Driver
                </Button>
                <Button variant="outline" className="flex-1">
                  <Route className="w-4 h-4 mr-2" />
                  View Routes
                </Button>
                <Button variant="outline" className="flex-1">
                  <Package className="w-4 h-4 mr-2" />
                  Assign Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
