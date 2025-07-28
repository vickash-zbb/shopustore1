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
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Key,
  Calendar,
  Settings,
  Lock,
  Unlock,
  UserX,
  Crown,
  Users,
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Mock admin user data
const mockAdminUsers = [
  {
    id: "ADM-001",
    name: "John Smith",
    email: "john.smith@medicare.com",
    phone: "+1 (555) 111-2222",
    avatar: null,
    role: "super_admin",
    status: "active",
    department: "Management",
    joinDate: "2023-01-15T09:00:00Z",
    lastLogin: "2024-01-15T14:30:00Z",
    lastActive: "2024-01-15T15:45:00Z",
    permissions: [
      "dashboard.view",
      "orders.manage",
      "users.manage", 
      "staff.manage",
      "products.manage",
      "settings.manage",
      "reports.view",
      "system.admin"
    ],
    sessionsCount: 156,
    loginAttempts: 0,
    notes: "Primary system administrator",
    twoFactorEnabled: true,
    ipWhitelist: ["192.168.1.100", "203.0.113.50"]
  },
  {
    id: "ADM-002", 
    name: "Sarah Johnson",
    email: "sarah.johnson@medicare.com",
    phone: "+1 (555) 333-4444",
    avatar: null,
    role: "admin",
    status: "active",
    department: "Operations",
    joinDate: "2023-03-20T10:30:00Z",
    lastLogin: "2024-01-15T13:20:00Z",
    lastActive: "2024-01-15T13:25:00Z",
    permissions: [
      "dashboard.view",
      "orders.manage",
      "users.view",
      "staff.view",
      "products.manage",
      "reports.view"
    ],
    sessionsCount: 89,
    loginAttempts: 0,
    notes: "Operations manager with order management focus",
    twoFactorEnabled: true,
    ipWhitelist: ["192.168.1.101"]
  },
  {
    id: "ADM-003",
    name: "Mike Davis",
    email: "mike.davis@medicare.com", 
    phone: "+1 (555) 555-6666",
    avatar: null,
    role: "moderator",
    status: "active",
    department: "Customer Service",
    joinDate: "2023-06-10T11:15:00Z",
    lastLogin: "2024-01-15T09:45:00Z",
    lastActive: "2024-01-15T12:10:00Z",
    permissions: [
      "dashboard.view",
      "orders.view",
      "users.view",
      "reports.view"
    ],
    sessionsCount: 234,
    loginAttempts: 1,
    notes: "Customer service representative",
    twoFactorEnabled: false,
    ipWhitelist: []
  },
  {
    id: "ADM-004",
    name: "Emily Wilson",
    email: "emily.wilson@medicare.com",
    phone: "+1 (555) 777-8888",
    avatar: null,
    role: "admin",
    status: "suspended",
    department: "IT",
    joinDate: "2023-08-05T14:20:00Z",
    lastLogin: "2024-01-10T16:30:00Z",
    lastActive: "2024-01-10T17:15:00Z",
    permissions: [
      "dashboard.view",
      "orders.view",
      "users.manage",
      "staff.manage",
      "settings.view"
    ],
    sessionsCount: 67,
    loginAttempts: 3,
    notes: "Account suspended pending security review",
    twoFactorEnabled: true,
    ipWhitelist: ["192.168.1.102", "203.0.113.51"]
  }
];

const getRoleBadge = (role: string) => {
  const styles = {
    super_admin: "bg-purple-100 text-purple-800 border-purple-200",
    admin: "bg-blue-100 text-blue-800 border-blue-200",
    moderator: "bg-green-100 text-green-800 border-green-200",
    viewer: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const icons = {
    super_admin: Crown,
    admin: Shield,
    moderator: Users,
    viewer: Eye,
  };

  const Icon = icons[role as keyof typeof icons];
  
  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium", styles[role as keyof typeof styles])}
    >
      <Icon className="w-3 h-3 mr-1" />
      {role.replace('_', ' ').toUpperCase()}
    </Badge>
  );
};

const getStatusBadge = (status: string) => {
  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-yellow-100 text-yellow-800 border-yellow-200",
    suspended: "bg-red-100 text-red-800 border-red-200",
  };

  const icons = {
    active: CheckCircle,
    inactive: Clock,
    suspended: UserX,
  };

  const Icon = icons[status as keyof typeof icons];
  
  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium", styles[status as keyof typeof styles])}
    >
      <Icon className="w-3 h-3 mr-1" />
      {status.toUpperCase()}
    </Badge>
  );
};

export function AdminUserManagement() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAdmins = mockAdminUsers.filter((admin) => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || admin.role === roleFilter;
    const matchesTab = selectedTab === "all" || admin.status === selectedTab;

    return matchesSearch && matchesRole && matchesTab;
  });

  const getStatusCounts = () => {
    return {
      all: mockAdminUsers.length,
      active: mockAdminUsers.filter(a => a.status === 'active').length,
      inactive: mockAdminUsers.filter(a => a.status === 'inactive').length,
      suspended: mockAdminUsers.filter(a => a.status === 'suspended').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin User Management</h1>
          <p className="text-muted-foreground">
            Manage admin roles, permissions, and system access controls.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddModal(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Admin
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdminUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              System administrators
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAdminUsers.filter(a => a.twoFactorEnabled).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Security enabled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAdminUsers.reduce((sum, a) => sum + a.sessionsCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              All time logins
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
                placeholder="Search admin users by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="relative">
            All Users
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="relative">
            Active
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.active}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="relative">
            Inactive
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.inactive}
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
          {/* Admin Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Users ({filteredAdmins.length})</CardTitle>
              <CardDescription>
                {selectedTab === "all" ? "All admin users" : `${selectedTab} admin users`} in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAdmins.map((admin) => (
                  <div 
                    key={admin.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAdmin(admin)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={admin.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{admin.name}</span>
                          {getStatusBadge(admin.status)}
                          {getRoleBadge(admin.role)}
                          {admin.twoFactorEnabled && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <Key className="w-3 h-3 mr-1" />
                              2FA
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {admin.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Settings className="w-3 h-3" />
                            {admin.department}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Last login: {new Date(admin.lastLogin).toLocaleDateString()}</span>
                          <span>{admin.sessionsCount} sessions</span>
                          <span>{admin.permissions.length} permissions</span>
                          {admin.loginAttempts > 0 && (
                            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {admin.loginAttempts} failed attempts
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Date(admin.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active
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
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          {admin.status === "active" ? (
                            <DropdownMenuItem className="text-red-600">
                              <Lock className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              <Unlock className="mr-2 h-4 w-4" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                
                {filteredAdmins.length === 0 && (
                  <div className="text-center py-8">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">No admin users found</h3>
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

      {/* Admin Detail Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedAdmin.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-xl">
                      {selectedAdmin.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{selectedAdmin.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selectedAdmin.status)}
                      {getRoleBadge(selectedAdmin.role)}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedAdmin(null)}
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
                      <span>{selectedAdmin.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedAdmin.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedAdmin.department}</span>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div>
                  <h4 className="font-medium mb-3">Account Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Join Date</p>
                      <p className="font-medium">{new Date(selectedAdmin.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Login</p>
                      <p className="font-medium">{new Date(selectedAdmin.lastLogin).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sessions</p>
                      <p className="font-medium">{selectedAdmin.sessionsCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Failed Attempts</p>
                      <p className="font-medium">{selectedAdmin.loginAttempts}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h4 className="font-medium mb-3">Security Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      <span className="text-sm">Two-Factor Authentication</span>
                    </div>
                    {selectedAdmin.twoFactorEnabled ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <X className="w-3 h-3 mr-1" />
                        Disabled
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">IP Whitelist</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {selectedAdmin.ipWhitelist.length} IPs
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="font-medium mb-3">Permissions ({selectedAdmin.permissions.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedAdmin.permissions.map((permission: string) => (
                    <Badge key={permission} variant="outline" className="text-xs justify-center">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* IP Whitelist */}
              {selectedAdmin.ipWhitelist.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">IP Whitelist</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedAdmin.ipWhitelist.map((ip: string) => (
                      <Badge key={ip} variant="outline" className="text-xs justify-center font-mono">
                        {ip}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedAdmin.notes && (
                <div>
                  <h4 className="font-medium mb-3">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedAdmin.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit User
                </Button>
                <Button variant="outline" className="flex-1">
                  <Key className="w-4 h-4 mr-2" />
                  Manage Permissions
                </Button>
                {selectedAdmin.status === "active" ? (
                  <Button variant="destructive" className="flex-1">
                    <Lock className="w-4 h-4 mr-2" />
                    Suspend User
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1">
                    <Unlock className="w-4 h-4 mr-2" />
                    Activate User
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Admin User</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Create a new administrator account with specific roles and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="font-medium mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input type="email" placeholder="user@medicare.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input placeholder="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <Select defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="customer_service">Customer Service</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Role & Permissions */}
              <div>
                <h4 className="font-medium mb-3">Role & Permissions</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Admin Role</label>
                    <Select defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Permissions</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Dashboard Access",
                        "Order Management",
                        "User Management",
                        "Staff Management",
                        "Product Management",
                        "Reports & Analytics",
                        "Settings Management",
                        "System Administration"
                      ].map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <input type="checkbox" id={permission} className="rounded" />
                          <label htmlFor={permission} className="text-sm">{permission}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h4 className="font-medium mb-3">Security Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Temporary Password</label>
                    <Input type="password" placeholder="Enter temporary password" />
                    <p className="text-xs text-muted-foreground mt-1">User will be required to change password on first login</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Require Two-Factor Authentication</label>
                      <p className="text-xs text-muted-foreground">Force 2FA setup on first login</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Send Welcome Email</label>
                      <p className="text-xs text-muted-foreground">Email login credentials to the user</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              {/* IP Restrictions (Optional) */}
              <div>
                <h4 className="font-medium mb-3">IP Restrictions (Optional)</h4>
                <div>
                  <label className="text-sm font-medium mb-2 block">Allowed IP Addresses</label>
                  <textarea
                    className="w-full p-2 border rounded-lg text-sm"
                    rows={3}
                    placeholder="Enter IP addresses or ranges, one per line (leave empty for no restrictions)"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Here you would handle the form submission
                    alert("Admin user created successfully!");
                    setShowAddModal(false);
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Admin User
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
