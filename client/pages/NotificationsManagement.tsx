import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Bell,
  Send,
  Mail,
  MessageCircle,
  Smartphone,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  Plus,
  Target,
  Settings,
  Copy
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Mock notification data
const mockNotifications = [
  {
    id: "NOT-001",
    title: "Order Delivery Update",
    message: "Your order #ORD-001 is out for delivery and will arrive within 30 minutes.",
    type: "sms",
    status: "sent",
    recipients: 1,
    audience: "customer",
    targetGroup: "Recent Orders",
    scheduledTime: "2024-01-15T14:30:00Z",
    sentTime: "2024-01-15T14:30:00Z",
    deliveryRate: 100,
    openRate: 85,
    clickRate: 12,
    createdBy: "Sarah Johnson",
    campaign: "Delivery Updates"
  },
  {
    id: "NOT-002",
    title: "Weekly Promotions",
    message: "Don't miss our weekly sale! Get 20% off on all vitamins and supplements. Use code HEALTH20.",
    type: "email",
    status: "sent", 
    recipients: 1247,
    audience: "customers",
    targetGroup: "All Active Customers",
    scheduledTime: "2024-01-15T09:00:00Z",
    sentTime: "2024-01-15T09:00:00Z",
    deliveryRate: 98.5,
    openRate: 24.3,
    clickRate: 8.7,
    createdBy: "Mike Davis",
    campaign: "Weekly Promotions"
  },
  {
    id: "NOT-003",
    title: "New Order Assignment",
    message: "You have been assigned a new delivery order #ORD-003. Please check the app for details.",
    type: "push",
    status: "delivered",
    recipients: 1,
    audience: "driver",
    targetGroup: "Available Drivers",
    scheduledTime: "2024-01-15T13:45:00Z",
    sentTime: "2024-01-15T13:45:00Z",
    deliveryRate: 100,
    openRate: 100,
    clickRate: 95,
    createdBy: "System",
    campaign: "Order Assignments"
  },
  {
    id: "NOT-004",
    title: "Prescription Refill Reminder",
    message: "Your prescription for Insulin Pen is due for refill in 3 days. Order now to avoid running out.",
    type: "sms",
    status: "scheduled",
    recipients: 23,
    audience: "customers",
    targetGroup: "Prescription Customers",
    scheduledTime: "2024-01-16T10:00:00Z",
    sentTime: null,
    deliveryRate: null,
    openRate: null,
    clickRate: null,
    createdBy: "Emily Wilson",
    campaign: "Prescription Reminders"
  },
  {
    id: "NOT-005",
    title: "System Maintenance Notice",
    message: "Scheduled maintenance will occur tonight from 11 PM to 2 AM. The system will be temporarily unavailable.",
    type: "email",
    status: "failed",
    recipients: 45,
    audience: "staff",
    targetGroup: "All Staff",
    scheduledTime: "2024-01-15T16:00:00Z",
    sentTime: "2024-01-15T16:00:00Z",
    deliveryRate: 67,
    openRate: 45,
    clickRate: 5,
    createdBy: "Admin User",
    campaign: "System Notices"
  }
];

const getTypeIcon = (type: string) => {
  const icons = {
    email: Mail,
    sms: MessageCircle,
    push: Smartphone,
  };
  return icons[type as keyof typeof icons] || Bell;
};

const getStatusBadge = (status: string) => {
  const styles = {
    sent: "bg-green-100 text-green-800 border-green-200",
    delivered: "bg-blue-100 text-blue-800 border-blue-200",
    scheduled: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    draft: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const icons = {
    sent: CheckCircle,
    delivered: CheckCircle,
    scheduled: Clock,
    failed: AlertTriangle,
    draft: Edit,
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

const getAudienceBadge = (audience: string) => {
  const styles = {
    customers: "bg-blue-100 text-blue-800 border-blue-200",
    customer: "bg-blue-100 text-blue-800 border-blue-200",
    staff: "bg-purple-100 text-purple-800 border-purple-200",
    drivers: "bg-orange-100 text-orange-800 border-orange-200",
    driver: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", styles[audience as keyof typeof styles])}
    >
      {audience.toUpperCase()}
    </Badge>
  );
};

export function NotificationsManagement() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [showComposer, setShowComposer] = useState(false);

  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || notification.type === typeFilter;
    const matchesTab = selectedTab === "all" || notification.status === selectedTab;

    return matchesSearch && matchesType && matchesTab;
  });

  const getStatusCounts = () => {
    return {
      all: mockNotifications.length,
      sent: mockNotifications.filter(n => n.status === 'sent').length,
      scheduled: mockNotifications.filter(n => n.status === 'scheduled').length,
      failed: mockNotifications.filter(n => n.status === 'failed').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications Management</h1>
          <p className="text-muted-foreground">
            Configure and send SMS, email, and push notifications to users and staff.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" onClick={() => setShowComposer(true)}>
            <Send className="w-4 h-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNotifications.reduce((sum, n) => sum + (n.recipients || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Notifications this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockNotifications.filter(n => n.deliveryRate).reduce((sum, n) => sum + (n.deliveryRate || 0), 0) / 
                mockNotifications.filter(n => n.deliveryRate).length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockNotifications.filter(n => n.openRate).reduce((sum, n) => sum + (n.openRate || 0), 0) / 
                mockNotifications.filter(n => n.openRate).length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.scheduled}</div>
            <p className="text-xs text-muted-foreground">
              Pending notifications
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
                placeholder="Search notifications by title, message, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push Notification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="relative">
            All Notifications
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="sent" className="relative">
            Sent
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.sent}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="relative">
            Scheduled
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.scheduled}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="failed" className="relative">
            Failed
            <Badge variant="secondary" className="ml-2 text-xs">
              {statusCounts.failed}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
              <CardDescription>
                {selectedTab === "all" ? "All notifications" : `${selectedTab} notifications`} in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type);
                  return (
                    <div 
                      key={notification.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedNotification(notification)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{notification.title}</span>
                            {getStatusBadge(notification.status)}
                            {getAudienceBadge(notification.audience)}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{notification.recipients} recipients</span>
                            <span>Campaign: {notification.campaign}</span>
                            <span>By: {notification.createdBy}</span>
                            {notification.sentTime && (
                              <span>Sent: {new Date(notification.sentTime).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          {notification.openRate !== null ? (
                            <>
                              <p className="font-medium">{notification.openRate}% opened</p>
                              <p className="text-xs text-muted-foreground">
                                {notification.clickRate}% clicked
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              {notification.status === 'scheduled' ? 'Pending' : 'No data'}
                            </p>
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
                
                {filteredNotifications.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">No notifications found</h3>
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

      {/* Notification Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Send Notification</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowComposer(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Compose and send notifications to your users and staff.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Notification Type</label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Audience</label>
                  <Select defaultValue="customers">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customers">All Customers</SelectItem>
                      <SelectItem value="staff">All Staff</SelectItem>
                      <SelectItem value="drivers">All Drivers</SelectItem>
                      <SelectItem value="custom">Custom Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input placeholder="Enter notification title..." />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Enter your message..." 
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Schedule</label>
                  <Select defaultValue="now">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Campaign</label>
                  <Input placeholder="Campaign name..." />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
