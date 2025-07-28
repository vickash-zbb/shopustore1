import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  FileText,
  Plus,
  Image,
  Video,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  Upload,
  Save,
  Trash2,
  Copy,
  ExternalLink,
  Tag,
  Users,
  Settings
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Mock content data
const mockContent = {
  pages: [
    {
      id: "PAGE-001",
      title: "Homepage",
      slug: "/",
      type: "page",
      status: "published",
      lastModified: "2024-01-15T14:30:00Z",
      author: "Admin User",
      views: 15420,
      template: "homepage",
      seoTitle: "MediCare - Your Trusted Online Pharmacy",
      seoDescription: "Quality medications and healthcare products delivered to your doorstep. Fast, reliable, and secure.",
      featured: true
    },
    {
      id: "PAGE-002", 
      title: "About Us",
      slug: "/about",
      type: "page",
      status: "published",
      lastModified: "2024-01-14T10:15:00Z",
      author: "Sarah Johnson",
      views: 3240,
      template: "standard",
      seoTitle: "About MediCare - Leading Online Pharmacy",
      seoDescription: "Learn about MediCare's mission to provide accessible healthcare through our online pharmacy platform.",
      featured: false
    },
    {
      id: "BLOG-001",
      title: "Understanding Diabetes Management",
      slug: "/blog/diabetes-management",
      type: "blog",
      status: "published",
      lastModified: "2024-01-13T16:45:00Z",
      author: "Dr. Emily Wilson",
      views: 8750,
      template: "blog-post",
      seoTitle: "Complete Guide to Diabetes Management | MediCare Blog",
      seoDescription: "Expert tips and advice for effective diabetes management, including medication, diet, and lifestyle changes.",
      featured: true,
      category: "Health Tips",
      tags: ["diabetes", "health", "medication", "lifestyle"]
    },
    {
      id: "FAQ-001",
      title: "Frequently Asked Questions",
      slug: "/faq",
      type: "faq",
      status: "published",
      lastModified: "2024-01-12T09:20:00Z",
      author: "Mike Davis",
      views: 5680,
      template: "faq",
      seoTitle: "FAQ - Common Questions About MediCare Services",
      seoDescription: "Find answers to frequently asked questions about our online pharmacy services, delivery, and prescriptions.",
      featured: false
    },
    {
      id: "PROMO-001",
      title: "Winter Health Campaign",
      slug: "/promotions/winter-health",
      type: "promotion",
      status: "draft",
      lastModified: "2024-01-15T11:30:00Z",
      author: "Marketing Team",
      views: 0,
      template: "promotion",
      seoTitle: "Winter Health Products - Special Offers | MediCare",
      seoDescription: "Stay healthy this winter with our special offers on vitamins, supplements, and cold remedies.",
      featured: false,
      startDate: "2024-01-20T00:00:00Z",
      endDate: "2024-03-20T23:59:59Z"
    }
  ],
  media: [
    {
      id: "MED-001",
      name: "homepage-banner.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15T10:00:00Z",
      usedIn: ["Homepage", "About Us"],
      url: "/uploads/homepage-banner.jpg"
    },
    {
      id: "MED-002",
      name: "product-demo.mp4",
      type: "video",
      size: "15.7 MB",
      dimensions: "1280x720",
      uploadDate: "2024-01-14T14:30:00Z",
      usedIn: ["Product Pages"],
      url: "/uploads/product-demo.mp4"
    },
    {
      id: "MED-003",
      name: "diabetes-infographic.png",
      type: "image",
      size: "890 KB",
      dimensions: "800x1200",
      uploadDate: "2024-01-13T16:00:00Z",
      usedIn: ["Blog Post"],
      url: "/uploads/diabetes-infographic.png"
    }
  ]
};

const getStatusBadge = (status: string) => {
  const styles = {
    published: "bg-green-100 text-green-800 border-green-200",
    draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
    archived: "bg-gray-100 text-gray-800 border-gray-200",
    scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const icons = {
    published: CheckCircle,
    draft: Edit,
    archived: Trash2,
    scheduled: Clock,
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

const getTypeBadge = (type: string) => {
  const styles = {
    page: "bg-blue-100 text-blue-800 border-blue-200",
    blog: "bg-purple-100 text-purple-800 border-purple-200",
    faq: "bg-green-100 text-green-800 border-green-200",
    promotion: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const icons = {
    page: FileText,
    blog: Edit,
    faq: Users,
    promotion: Tag,
  };

  const Icon = icons[type as keyof typeof icons];

  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", styles[type as keyof typeof styles])}
    >
      <Icon className="w-3 h-3 mr-1" />
      {type.toUpperCase()}
    </Badge>
  );
};

export function ContentManagement() {
  const [selectedTab, setSelectedTab] = useState("pages");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);

  const filteredContent = mockContent.pages.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || content.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const getContentCounts = () => {
    return {
      pages: mockContent.pages.filter(c => c.type === 'page').length,
      blog: mockContent.pages.filter(c => c.type === 'blog').length,
      faq: mockContent.pages.filter(c => c.type === 'faq').length,
      promotions: mockContent.pages.filter(c => c.type === 'promotion').length,
    };
  };

  const contentCounts = getContentCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">
            Manage website content, pages, and promotional materials.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            SEO Settings
          </Button>
          <Button size="sm" onClick={() => setShowEditor(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContent.pages.length}</div>
            <p className="text-xs text-muted-foreground">
              Published content pieces
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockContent.pages.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContent.media.length}</div>
            <p className="text-xs text-muted-foreground">
              Images and videos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockContent.pages.filter(p => p.status === 'draft').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Unpublished content
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages" className="relative">
            Pages & Content
            <Badge variant="secondary" className="ml-2 text-xs">
              {mockContent.pages.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="media" className="relative">
            Media Library
            <Badge variant="secondary" className="ml-2 text-xs">
              {mockContent.media.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="seo" className="relative">
            SEO & Analytics
          </TabsTrigger>
        </TabsList>

        {/* Pages & Content Tab */}
        <TabsContent value="pages" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search content by title or URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Content Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="page">Pages</SelectItem>
                    <SelectItem value="blog">Blog Posts</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="promotion">Promotions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content ({filteredContent.length})</CardTitle>
              <CardDescription>Manage your website pages and content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContent.map((content) => (
                  <div 
                    key={content.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedContent(content)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{content.title}</span>
                          {getStatusBadge(content.status)}
                          {getTypeBadge(content.type)}
                          {content.featured && (
                            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{content.slug}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>By {content.author}</span>
                          <span>Modified: {new Date(content.lastModified).toLocaleDateString()}</span>
                          <span>{content.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Content
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            SEO Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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

        {/* Media Library Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Media Library ({mockContent.media.length})</CardTitle>
                  <CardDescription>Manage images, videos, and other media files</CardDescription>
                </div>
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockContent.media.map((media) => (
                  <div key={media.id} className="border rounded-lg p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                      {media.type === 'image' ? (
                        <Image className="w-8 h-8 text-muted-foreground" />
                      ) : (
                        <Video className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-sm truncate">{media.name}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{media.size}</span>
                        <span>{media.dimensions}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Used in: {media.usedIn.join(', ')}</p>
                        <p>Uploaded: {new Date(media.uploadDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy URL
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO & Analytics Tab */}
        <TabsContent value="seo" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>SEO Overview</CardTitle>
                <CardDescription>Search engine optimization metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Indexed Pages</p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Page Speed</p>
                    <p className="text-2xl font-bold">92</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile Friendly</p>
                    <p className="text-2xl font-bold text-success">98%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SEO Score</p>
                    <p className="text-2xl font-bold text-success">85</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics Summary</CardTitle>
                <CardDescription>Website traffic and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Visitors</p>
                    <p className="text-2xl font-bold">12.4K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold">33.1K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Session</p>
                    <p className="text-2xl font-bold">2m 45s</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">34%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
              <CardDescription>Configure site-wide SEO preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Site Title</label>
                  <Input defaultValue="MediCare - Your Trusted Online Pharmacy" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Site Description</label>
                  <Input defaultValue="Quality medications and healthcare products delivered to your doorstep." />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Meta Keywords</label>
                <Input defaultValue="online pharmacy, medications, healthcare, prescriptions, delivery" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sitemap" defaultChecked />
                <label htmlFor="sitemap" className="text-sm font-medium">
                  Auto-generate XML sitemap
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="robots" defaultChecked />
                <label htmlFor="robots" className="text-sm font-medium">
                  Allow search engine indexing
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Content Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Content</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowEditor(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Content Type</label>
                  <Select defaultValue="page">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                      <SelectItem value="promotion">Promotion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select defaultValue="draft">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input placeholder="Enter content title..." />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">URL Slug</label>
                <Input placeholder="/page-url" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea 
                  placeholder="Enter your content..." 
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">SEO Title</label>
                  <Input placeholder="SEO optimized title..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">SEO Description</label>
                  <Input placeholder="Meta description..." />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Content
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
