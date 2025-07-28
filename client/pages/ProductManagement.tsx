import { useState } from "react";
import * as React from "react";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Package,
  Plus,
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  ShoppingCart,
  Pill,
  Heart,
  Activity,
  X,
  Upload,
  Archive
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Mock product data
const mockProducts = [
  {
    id: "PROD-001",
    name: "Paracetamol 500mg",
    category: "medicine",
    subcategory: "Pain Relief",
    brand: "MediCare",
    sku: "MED-PAR-500",
    description: "Effective pain relief and fever reducer tablets",
    price: 12.50,
    costPrice: 8.00,
    stock: 250,
    lowStockThreshold: 50,
    status: "active",
    prescriptionRequired: false,
    expiryDate: "2025-12-31",
    supplier: "PharmaCorp Inc.",
    batchNumber: "PAR2024001",
    dosage: "500mg",
    manufacturer: "MediCare Pharmaceuticals",
    sales30Days: 234,
    revenue30Days: 2925.00,
    rating: 4.6,
    reviews: 89,
    sideEffects: ["Nausea", "Dizziness"],
    contraindications: ["Liver disease", "Alcohol dependency"],
    storageConditions: "Store in cool, dry place",
    lastUpdated: "2024-01-15T10:30:00Z"
  },
  {
    id: "PROD-002",
    name: "Vitamin D3 1000IU",
    category: "supplements",
    subcategory: "Vitamins",
    brand: "HealthPlus",
    sku: "SUP-VIT-D3",
    description: "Essential vitamin D supplement for bone health",
    price: 24.99,
    costPrice: 15.00,
    stock: 180,
    lowStockThreshold: 30,
    status: "active",
    prescriptionRequired: false,
    expiryDate: "2026-06-30",
    supplier: "NutriSupply Ltd.",
    batchNumber: "VD32024002",
    dosage: "1000IU",
    manufacturer: "HealthPlus Nutrition",
    sales30Days: 189,
    revenue30Days: 4722.11,
    rating: 4.8,
    reviews: 156,
    sideEffects: ["Hypercalcemia (rare)"],
    contraindications: ["Hypervitaminosis D"],
    storageConditions: "Store below 25°C",
    lastUpdated: "2024-01-14T16:45:00Z"
  },
  {
    id: "PROD-003",
    name: "Digital Thermometer",
    category: "equipment", 
    subcategory: "Monitoring Devices",
    brand: "TempPro",
    sku: "EQP-THERM-DIG",
    description: "Fast and accurate digital thermometer with LCD display",
    price: 49.99,
    costPrice: 30.00,
    stock: 45,
    lowStockThreshold: 20,
    status: "active",
    prescriptionRequired: false,
    expiryDate: null,
    supplier: "MedDevice Co.",
    batchNumber: "TMP2024001",
    dosage: null,
    manufacturer: "TempPro Medical",
    sales30Days: 134,
    revenue30Days: 6698.66,
    rating: 4.4,
    reviews: 78,
    sideEffects: [],
    contraindications: [],
    storageConditions: "Keep dry, avoid extreme temperatures",
    lastUpdated: "2024-01-13T09:20:00Z"
  },
  {
    id: "PROD-004",
    name: "Insulin Pen 100IU/ml",
    category: "medicine",
    subcategory: "Diabetes Care",
    brand: "DiabCare",
    sku: "MED-INS-PEN",
    description: "Pre-filled insulin pen for diabetes management",
    price: 120.00,
    costPrice: 85.00,
    stock: 15,
    lowStockThreshold: 25,
    status: "low_stock",
    prescriptionRequired: true,
    expiryDate: "2024-08-15",
    supplier: "DiabCare Pharma",
    batchNumber: "INS2024003",
    dosage: "100IU/ml",
    manufacturer: "DiabCare Pharmaceuticals",
    sales30Days: 67,
    revenue30Days: 8040.00,
    rating: 4.9,
    reviews: 23,
    sideEffects: ["Hypoglycemia", "Injection site reactions"],
    contraindications: ["Hypoglycemia", "Hypersensitivity"],
    storageConditions: "Refrigerate at 2-8°C",
    lastUpdated: "2024-01-12T14:15:00Z"
  },
  {
    id: "PROD-005",
    name: "First Aid Kit Deluxe",
    category: "supplies",
    subcategory: "Emergency Care",
    brand: "SafeGuard",
    sku: "SUP-AID-DEL",
    description: "Comprehensive first aid kit with 50+ items",
    price: 89.99,
    costPrice: 55.00,
    stock: 0,
    lowStockThreshold: 10,
    status: "out_of_stock",
    prescriptionRequired: false,
    expiryDate: null,
    supplier: "Emergency Supply Co.",
    batchNumber: "AID2024001",
    dosage: null,
    manufacturer: "SafeGuard Medical",
    sales30Days: 45,
    revenue30Days: 4049.55,
    rating: 4.7,
    reviews: 34,
    sideEffects: [],
    contraindications: [],
    storageConditions: "Store in dry place",
    lastUpdated: "2024-01-11T11:30:00Z"
  }
];

const getCategoryIcon = (category: string) => {
  const icons = {
    medicine: Pill,
    supplements: Heart,
    equipment: Activity,
    supplies: Package,
  };
  return icons[category as keyof typeof icons] || Package;
};

const getStatusBadge = (status: string, stock: number) => {
  if (stock === 0) {
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200">
        <X className="w-3 h-3 mr-1" />
        OUT OF STOCK
      </Badge>
    );
  }
  
  if (status === "low_stock") {
    return (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
        <AlertTriangle className="w-3 h-3 mr-1" />
        LOW STOCK
      </Badge>
    );
  }

  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-gray-100 text-gray-800 border-gray-200",
    discontinued: "bg-red-100 text-red-800 border-red-200",
  };

  const icons = {
    active: CheckCircle,
    inactive: Clock,
    discontinued: X,
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

const getCategoryBadge = (category: string) => {
  const styles = {
    medicine: "bg-blue-100 text-blue-800 border-blue-200",
    supplements: "bg-green-100 text-green-800 border-green-200",
    equipment: "bg-purple-100 text-purple-800 border-purple-200",
    supplies: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const Icon = getCategoryIcon(category);

  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", styles[category as keyof typeof styles])}
    >
      <Icon className="w-3 h-3 mr-1" />
      {category.toUpperCase()}
    </Badge>
  );
};

export function ProductManagement() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "low_stock" && (product.stock <= product.lowStockThreshold || product.status === "low_stock")) ||
                      (selectedTab === "out_of_stock" && product.stock === 0) ||
                      product.status === selectedTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  const getProductCounts = () => {
    return {
      all: mockProducts.length,
      active: mockProducts.filter(p => p.status === 'active' && p.stock > 0).length,
      low_stock: mockProducts.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0).length,
      out_of_stock: mockProducts.filter(p => p.stock === 0).length,
    };
  };

  const productCounts = getProductCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">
            Manage inventory, add new products, and update pricing information.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3</span> added this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Current inventory value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{productCounts.low_stock}</div>
            <p className="text-xs text-muted-foreground">
              Products need restocking
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockProducts.reduce((sum, p) => sum + p.revenue30Days, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last month
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
                placeholder="Search products by name, SKU, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="supplements">Supplements</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="relative">
            All Products
            <Badge variant="secondary" className="ml-2 text-xs">
              {productCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="relative">
            In Stock
            <Badge variant="secondary" className="ml-2 text-xs">
              {productCounts.active}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="low_stock" className="relative">
            Low Stock
            <Badge variant="secondary" className="ml-2 text-xs bg-yellow-100 text-yellow-800">
              {productCounts.low_stock}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="out_of_stock" className="relative">
            Out of Stock
            <Badge variant="secondary" className="ml-2 text-xs bg-red-100 text-red-800">
              {productCounts.out_of_stock}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Products ({filteredProducts.length})</CardTitle>
              <CardDescription>
                {selectedTab === "all" ? "All products" : `${selectedTab.replace('_', ' ')} products`} in inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {React.createElement(getCategoryIcon(product.category), { 
                          className: "w-6 h-6 text-primary" 
                        })}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{product.name}</span>
                          {getStatusBadge(product.status, product.stock)}
                          {getCategoryBadge(product.category)}
                          {product.prescriptionRequired && (
                            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                              Rx Required
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>SKU: {product.sku}</span>
                          <span>Brand: {product.brand}</span>
                          <span>Stock: {product.stock} units</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{product.sales30Days} sold this month</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{product.rating} ({product.reviews} reviews)</span>
                          </div>
                          {product.expiryDate && (
                            <span>Exp: {new Date(product.expiryDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          Revenue: ${product.revenue30Days.toLocaleString()}
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
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Restock
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">No products found</h3>
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    {React.createElement(getCategoryIcon(selectedProduct.category), { 
                      className: "w-8 h-8 text-primary" 
                    })}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedProduct.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selectedProduct.status, selectedProduct.stock)}
                      {getCategoryBadge(selectedProduct.category)}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Information */}
                <div>
                  <h4 className="font-medium mb-3">Product Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>SKU:</strong> {selectedProduct.sku}</p>
                    <p><strong>Brand:</strong> {selectedProduct.brand}</p>
                    <p><strong>Manufacturer:</strong> {selectedProduct.manufacturer}</p>
                    <p><strong>Category:</strong> {selectedProduct.subcategory}</p>
                    {selectedProduct.dosage && (
                      <p><strong>Dosage:</strong> {selectedProduct.dosage}</p>
                    )}
                    <p><strong>Description:</strong> {selectedProduct.description}</p>
                  </div>
                </div>

                {/* Inventory & Pricing */}
                <div>
                  <h4 className="font-medium mb-3">Inventory & Pricing</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Stock</p>
                      <p className="font-medium text-lg">{selectedProduct.stock} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Low Stock Alert</p>
                      <p className="font-medium text-lg">{selectedProduct.lowStockThreshold} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Selling Price</p>
                      <p className="font-medium text-lg">${selectedProduct.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Cost Price</p>
                      <p className="font-medium text-lg">${selectedProduct.costPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales Performance */}
              <div>
                <h4 className="font-medium mb-3">Sales Performance (30 Days)</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Units Sold</p>
                    <p className="font-medium text-lg">{selectedProduct.sales30Days}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-medium text-lg">${selectedProduct.revenue30Days.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Customer Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-lg">{selectedProduct.rating}</span>
                      <span className="text-muted-foreground">({selectedProduct.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              {(selectedProduct.sideEffects.length > 0 || selectedProduct.contraindications.length > 0) && (
                <div>
                  <h4 className="font-medium mb-3">Medical Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProduct.sideEffects.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Side Effects</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.sideEffects.map((effect: string) => (
                            <Badge key={effect} variant="outline" className="text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedProduct.contraindications.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Contraindications</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.contraindications.map((contraindication: string) => (
                            <Badge key={contraindication} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                              {contraindication}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div>
                <h4 className="font-medium mb-3">Additional Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Supplier:</strong> {selectedProduct.supplier}</p>
                    <p><strong>Batch Number:</strong> {selectedProduct.batchNumber}</p>
                    {selectedProduct.expiryDate && (
                      <p><strong>Expiry Date:</strong> {new Date(selectedProduct.expiryDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div>
                    <p><strong>Storage:</strong> {selectedProduct.storageConditions}</p>
                    <p><strong>Prescription Required:</strong> {selectedProduct.prescriptionRequired ? "Yes" : "No"}</p>
                    <p><strong>Last Updated:</strong> {new Date(selectedProduct.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
                <Button variant="outline" className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Restock
                </Button>
                <Button variant="outline" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add New Product</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Add a new medicine, supplement, equipment, or supply to your inventory.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Product Information */}
              <div>
                <h4 className="font-medium mb-3">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Product Name</label>
                    <Input placeholder="e.g., Paracetamol 500mg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">SKU</label>
                    <Input placeholder="e.g., MED-PAR-500" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="supplements">Supplements</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="supplies">Supplies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Brand</label>
                    <Input placeholder="e.g., MediCare" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Manufacturer</label>
                    <Input placeholder="e.g., MediCare Pharmaceuticals" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Supplier</label>
                    <Input placeholder="e.g., PharmaCorp Inc." />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-lg text-sm"
                    rows={3}
                    placeholder="Enter detailed product description..."
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div>
                <h4 className="font-medium mb-3">Pricing & Inventory</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Selling Price ($)</label>
                    <Input type="number" placeholder="0.00" step="0.01" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Cost Price ($)</label>
                    <Input type="number" placeholder="0.00" step="0.01" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Initial Stock</label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Low Stock Alert</label>
                    <Input type="number" placeholder="10" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Batch Number</label>
                    <Input placeholder="e.g., PAR2024001" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                    <Input type="date" />
                  </div>
                </div>
              </div>

              {/* Medical Information (for medicines) */}
              <div>
                <h4 className="font-medium mb-3">Medical Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Dosage/Strength</label>
                    <Input placeholder="e.g., 500mg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Storage Conditions</label>
                    <Input placeholder="e.g., Store in cool, dry place" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Side Effects</label>
                    <textarea
                      className="w-full p-2 border rounded-lg text-sm"
                      rows={3}
                      placeholder="Enter side effects, separated by commas"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contraindications</label>
                    <textarea
                      className="w-full p-2 border rounded-lg text-sm"
                      rows={3}
                      placeholder="Enter contraindications, separated by commas"
                    />
                  </div>
                </div>
              </div>

              {/* Product Settings */}
              <div>
                <h4 className="font-medium mb-3">Product Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Prescription Required</label>
                      <p className="text-xs text-muted-foreground">Require valid prescription for purchase</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Featured Product</label>
                      <p className="text-xs text-muted-foreground">Display prominently on homepage</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Track Inventory</label>
                      <p className="text-xs text-muted-foreground">Enable stock tracking and alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Product Status</label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div>
                <h4 className="font-medium mb-3">Product Images</h4>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload product images or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <Button variant="outline" className="mt-3">
                    Choose Files
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Here you would handle the form submission
                    alert("Product added successfully!");
                    setShowAddModal(false);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
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
