import { useState } from "react";
import { 
  Settings, 
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Copy,
  Key,
  Mail,
  Smartphone,
  CreditCard,
  Shield,
  Globe,
  Bell,
  Database,
  Server,
  Users,
  Lock,
  CheckCircle,
  AlertTriangle,
  Info,
  X
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock settings data
const mockSettings = {
  general: {
    siteName: "MediCare",
    siteDescription: "Your Trusted Online Pharmacy",
    adminEmail: "admin@medicare.com",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
    maintenanceMode: false,
    registrationEnabled: true,
    guestCheckout: false
  },
  payment: {
    stripeEnabled: true,
    stripePublishableKey: "pk_test_TYooMQauvdEDq54NiTphI7jx",
    stripeSecretKey: "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
    paypalEnabled: true,
    paypalClientId: "AYsJU9awIShvsf58G_qVaOEA1J-_AdXTF1BIjDj_",
    razorpayEnabled: false,
    razorpayKeyId: "",
    razorpayKeySecret: "",
    cashOnDelivery: true,
    insurancePayments: true
  },
  email: {
    provider: "smtp",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@medicare.com",
    smtpPassword: "•••••••••••••••",
    smtpEncryption: "tls",
    fromEmail: "noreply@medicare.com",
    fromName: "MediCare",
    mailgunDomain: "",
    mailgunApiKey: "",
    sendgridApiKey: ""
  },
  sms: {
    provider: "twilio",
    twilioAccountSid: "ACd1234567890abcdef1234567890abcdef",
    twilioAuthToken: "•••••••••••••••",
    twilioPhoneNumber: "+1234567890",
    nexmoApiKey: "",
    nexmoApiSecret: "",
    msg91AuthKey: "",
    enableOrderUpdates: true,
    enableDeliveryNotifications: true,
    enablePromotionalSms: false
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    maxLoginAttempts: "5",
    ipWhitelisting: false,
    allowedIPs: ["192.168.1.0/24"],
    sslRequired: true,
    encryptionEnabled: true,
    backupFrequency: "daily",
    auditLogging: true
  },
  api: {
    enabled: true,
    version: "v1",
    rateLimit: "1000",
    rateLimitWindow: "60",
    requireApiKey: true,
    webhooksEnabled: true,
    webhookSecret: "whsec_1234567890abcdef",
    corsEnabled: true,
    allowedOrigins: ["https://medicare.com", "https://app.medicare.com"]
  },
  integrations: {
    googleAnalytics: "G-XXXXXXXXXX",
    googleTagManager: "GTM-XXXXXXX",
    facebookPixel: "123456789012345",
    intercomAppId: "",
    zenDeskSubdomain: "",
    hubspotApiKey: "",
    slackWebhookUrl: "",
    discordWebhookUrl: ""
  }
};

const SettingCard = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const PasswordInput = ({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full w-10"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export function SettingsConfiguration() {
  const [selectedTab, setSelectedTab] = useState("general");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSaveSettings = () => {
    // Here you would save the settings to your backend
    setHasUnsavedChanges(false);
    // Show success toast
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings & Configuration</h1>
          <p className="text-muted-foreground">
            Configure platform settings, payment gateways, and API integrations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Warning Alert */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Changes to these settings can affect your entire platform. Please review carefully before saving.
        </AlertDescription>
      </Alert>

      {/* Settings Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <SettingCard 
            title="Site Information" 
            description="Basic information about your e-pharmacy platform"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Site Name</label>
                  <Input defaultValue={mockSettings.general.siteName} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Admin Email</label>
                  <Input defaultValue={mockSettings.general.adminEmail} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Site Description</label>
                <Textarea defaultValue={mockSettings.general.siteDescription} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Timezone</label>
                  <Select defaultValue={mockSettings.general.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Currency</label>
                  <Select defaultValue={mockSettings.general.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select defaultValue={mockSettings.general.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </SettingCard>

          <SettingCard 
            title="Platform Settings" 
            description="Control access and functionality of your platform"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Maintenance Mode</label>
                  <p className="text-xs text-muted-foreground">Temporarily disable public access</p>
                </div>
                <Switch defaultChecked={mockSettings.general.maintenanceMode} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">User Registration</label>
                  <p className="text-xs text-muted-foreground">Allow new customer registrations</p>
                </div>
                <Switch defaultChecked={mockSettings.general.registrationEnabled} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Guest Checkout</label>
                  <p className="text-xs text-muted-foreground">Allow purchases without registration</p>
                </div>
                <Switch defaultChecked={mockSettings.general.guestCheckout} />
              </div>
            </div>
          </SettingCard>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <SettingCard 
            title="Payment Gateways" 
            description="Configure payment processing services"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <label className="text-sm font-medium">Stripe</label>
                      <p className="text-xs text-muted-foreground">Credit/debit card payments</p>
                    </div>
                  </div>
                  <Switch defaultChecked={mockSettings.payment.stripeEnabled} />
                </div>
                <div className="ml-8 space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Publishable Key</label>
                    <Input defaultValue={mockSettings.payment.stripePublishableKey} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Secret Key</label>
                    <PasswordInput 
                      value={mockSettings.payment.stripeSecretKey}
                      onChange={() => {}}
                      placeholder="sk_test_..."
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-xs text-white font-bold">P</div>
                    <div>
                      <label className="text-sm font-medium">PayPal</label>
                      <p className="text-xs text-muted-foreground">PayPal payments</p>
                    </div>
                  </div>
                  <Switch defaultChecked={mockSettings.payment.paypalEnabled} />
                </div>
                <div className="ml-8">
                  <label className="text-sm font-medium mb-2 block">Client ID</label>
                  <Input defaultValue={mockSettings.payment.paypalClientId} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Cash on Delivery</label>
                    <p className="text-xs text-muted-foreground">Accept cash payments upon delivery</p>
                  </div>
                  <Switch defaultChecked={mockSettings.payment.cashOnDelivery} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Insurance Payments</label>
                    <p className="text-xs text-muted-foreground">Accept insurance claims and co-pays</p>
                  </div>
                  <Switch defaultChecked={mockSettings.payment.insurancePayments} />
                </div>
              </div>
            </div>
          </SettingCard>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <SettingCard 
            title="Email Configuration" 
            description="Configure email delivery settings for notifications and communications"
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email Provider</label>
                <Select defaultValue={mockSettings.email.provider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smtp">SMTP</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="sendgrid">SendGrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From Email</label>
                  <Input defaultValue={mockSettings.email.fromEmail} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">From Name</label>
                  <Input defaultValue={mockSettings.email.fromName} />
                </div>
              </div>

              {mockSettings.email.provider === 'smtp' && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-medium">SMTP Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">SMTP Host</label>
                      <Input defaultValue={mockSettings.email.smtpHost} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">SMTP Port</label>
                      <Input defaultValue={mockSettings.email.smtpPort} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Username</label>
                      <Input defaultValue={mockSettings.email.smtpUsername} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Password</label>
                      <PasswordInput 
                        value={mockSettings.email.smtpPassword}
                        onChange={() => {}}
                        placeholder="Enter SMTP password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Encryption</label>
                    <Select defaultValue={mockSettings.email.smtpEncryption}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Test Email Configuration
                </Button>
              </div>
            </div>
          </SettingCard>
        </TabsContent>

        {/* SMS Settings */}
        <TabsContent value="sms" className="space-y-6">
          <SettingCard 
            title="SMS Configuration" 
            description="Configure SMS delivery for order updates and notifications"
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">SMS Provider</label>
                <Select defaultValue={mockSettings.sms.provider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="nexmo">Nexmo</SelectItem>
                    <SelectItem value="msg91">MSG91</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {mockSettings.sms.provider === 'twilio' && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-medium">Twilio Configuration</h4>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Account SID</label>
                    <Input defaultValue={mockSettings.sms.twilioAccountSid} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Auth Token</label>
                    <PasswordInput 
                      value={mockSettings.sms.twilioAuthToken}
                      onChange={() => {}}
                      placeholder="Enter Twilio auth token"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input defaultValue={mockSettings.sms.twilioPhoneNumber} />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-medium">SMS Notifications</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Order Updates</label>
                    <p className="text-xs text-muted-foreground">Send SMS for order status changes</p>
                  </div>
                  <Switch defaultChecked={mockSettings.sms.enableOrderUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Delivery Notifications</label>
                    <p className="text-xs text-muted-foreground">Send SMS for delivery updates</p>
                  </div>
                  <Switch defaultChecked={mockSettings.sms.enableDeliveryNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Promotional SMS</label>
                    <p className="text-xs text-muted-foreground">Send promotional messages</p>
                  </div>
                  <Switch defaultChecked={mockSettings.sms.enablePromotionalSms} />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Test SMS Configuration
                </Button>
              </div>
            </div>
          </SettingCard>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <SettingCard 
            title="Security Configuration" 
            description="Configure security settings and access controls"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Authentication Settings</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-xs text-muted-foreground">Require 2FA for admin users</p>
                  </div>
                  <Switch defaultChecked={mockSettings.security.twoFactorAuth} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Session Timeout (minutes)</label>
                    <Input defaultValue={mockSettings.security.sessionTimeout} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Password Expiry (days)</label>
                    <Input defaultValue={mockSettings.security.passwordExpiry} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Max Login Attempts</label>
                    <Input defaultValue={mockSettings.security.maxLoginAttempts} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">System Security</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">SSL Required</label>
                    <p className="text-xs text-muted-foreground">Force HTTPS connections</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked={mockSettings.security.sslRequired} disabled />
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Data Encryption</label>
                    <p className="text-xs text-muted-foreground">Encrypt sensitive data at rest</p>
                  </div>
                  <Switch defaultChecked={mockSettings.security.encryptionEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Audit Logging</label>
                    <p className="text-xs text-muted-foreground">Log all admin actions</p>
                  </div>
                  <Switch defaultChecked={mockSettings.security.auditLogging} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">IP Whitelisting</label>
                    <p className="text-xs text-muted-foreground">Restrict admin access to specific IPs</p>
                  </div>
                  <Switch defaultChecked={mockSettings.security.ipWhitelisting} />
                </div>
                {mockSettings.security.ipWhitelisting && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Allowed IP Addresses</label>
                    <Textarea 
                      defaultValue={mockSettings.security.allowedIPs.join('\n')}
                      placeholder="Enter IP addresses or ranges, one per line"
                      className="min-h-[80px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </SettingCard>
        </TabsContent>

        {/* API & Integrations */}
        <TabsContent value="api" className="space-y-6">
          <SettingCard 
            title="API Configuration" 
            description="Configure API access and third-party integrations"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">API Access</label>
                    <p className="text-xs text-muted-foreground">Enable REST API endpoints</p>
                  </div>
                  <Switch defaultChecked={mockSettings.api.enabled} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rate Limit (requests/minute)</label>
                    <Input defaultValue={mockSettings.api.rateLimit} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rate Limit Window (seconds)</label>
                    <Input defaultValue={mockSettings.api.rateLimitWindow} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Require API Key</label>
                    <p className="text-xs text-muted-foreground">Authenticate API requests with keys</p>
                  </div>
                  <Switch defaultChecked={mockSettings.api.requireApiKey} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Third-Party Integrations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Google Analytics ID</label>
                    <Input defaultValue={mockSettings.integrations.googleAnalytics} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Google Tag Manager ID</label>
                    <Input defaultValue={mockSettings.integrations.googleTagManager} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Facebook Pixel ID</label>
                    <Input defaultValue={mockSettings.integrations.facebookPixel} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Intercom App ID</label>
                    <Input defaultValue={mockSettings.integrations.intercomAppId} placeholder="Optional" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Webhook Configuration</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Enable Webhooks</label>
                    <p className="text-xs text-muted-foreground">Send events to external services</p>
                  </div>
                  <Switch defaultChecked={mockSettings.api.webhooksEnabled} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Webhook Secret</label>
                  <div className="flex gap-2">
                    <Input defaultValue={mockSettings.api.webhookSecret} className="flex-1" />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Slack Webhook URL</label>
                  <Input defaultValue={mockSettings.integrations.slackWebhookUrl} placeholder="https://hooks.slack.com/..." />
                </div>
              </div>
            </div>
          </SettingCard>
        </TabsContent>
      </Tabs>

      {/* Save Changes Footer */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm">You have unsaved changes</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Discard Changes
              </Button>
              <Button size="sm" onClick={handleSaveSettings}>
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
