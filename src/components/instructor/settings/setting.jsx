"use client"

import React from "react"

import { useState } from "react"
import { Lock, Shield, Smartphone, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function InstructorSettings() {
    const [profileForm, setProfileForm] = useState({
        name: "Dr. John Smith",
        email: "john.smith@university.edu",
        phone: "+1 (555) 123-4567",
        bio: "Professor of Computer Science with over 15 years of experience in teaching and research. Specializing in artificial intelligence and machine learning.",
        department: "Computer Science",
        office: "Room 301, Science Building",
        officeHours: "Monday and Wednesday, 2:00 PM - 4:00 PM",
        website: "https://johnsmith.university.edu",
    })

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        assignmentSubmissions: true,
        discussionPosts: true,
        courseAnnouncements: true,
        gradeUpdates: true,
        systemAnnouncements: false,
        dailyDigest: true,
        weeklyDigest: false,
    })

    const [privacySettings, setPrivacySettings] = useState({
        showEmail: true,
        showPhone: false,
        showOfficeHours: true,
        showBio: true,
        allowStudentMessages: true,
        allowProfileViews: true,
    })

    const [displaySettings, setDisplaySettings] = useState({
        theme: "system",
        fontSize: "medium",
        language: "english",
        timezone: "America/New_York",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
    })

    const handleProfileChange = (e) => {
        setProfileForm({
            ...profileForm,
            [e.target.name]: e.target.value,
        })
    }

    const handleNotificationChange = (key, value) => {
        setNotificationSettings({
            ...notificationSettings,
            [key]: value,
        })
    }

    const handlePrivacyChange = (key, value) => {
        setPrivacySettings({
            ...privacySettings,
            [key]: value,
        })
    }

    const handleDisplayChange = (key, value) => {
        setDisplaySettings({
            ...displaySettings,
            [key]: value,
        })
    }

    const handleSaveProfile = () => {
        // In a real app, this would save the profile to the database
        console.log("Saving profile:", profileForm)
    }

    const handleSaveNotifications = () => {
        // In a real app, this would save the notification settings to the database
        console.log("Saving notification settings:", notificationSettings)
    }

    const handleSavePrivacy = () => {
        // In a real app, this would save the privacy settings to the database
        console.log("Saving privacy settings:", privacySettings)
    }

    const handleSaveDisplay = () => {
        // In a real app, this would save the display settings to the database
        console.log("Saving display settings:", displaySettings)
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger value="display">Display</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal information and profile details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                                    <AvatarFallback>JS</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Profile Picture</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Upload a new profile picture. JPG, GIF or PNG. Max size of 800K.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            Upload
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={profileForm.email}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" value={profileForm.phone} onChange={handleProfileChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        name="department"
                                        value={profileForm.department}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="office">Office Location</Label>
                                    <Input id="office" name="office" value={profileForm.office} onChange={handleProfileChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="officeHours">Office Hours</Label>
                                    <Input
                                        id="officeHours"
                                        name="officeHours"
                                        value={profileForm.officeHours}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" name="website" value={profileForm.website} onChange={handleProfileChange} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="bio">Biography</Label>
                                <Textarea id="bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} rows={4} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveProfile}>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>Manage how and when you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Email Notifications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="emailNotifications">Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                        </div>
                                        <Switch
                                            id="emailNotifications"
                                            checked={notificationSettings.emailNotifications}
                                            onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Notification Types</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="assignmentSubmissions">Assignment Submissions</Label>
                                            <p className="text-sm text-muted-foreground">Notify when students submit assignments</p>
                                        </div>
                                        <Switch
                                            id="assignmentSubmissions"
                                            checked={notificationSettings.assignmentSubmissions}
                                            onCheckedChange={(checked) => handleNotificationChange("assignmentSubmissions", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="discussionPosts">Discussion Posts</Label>
                                            <p className="text-sm text-muted-foreground">Notify when students post in discussions</p>
                                        </div>
                                        <Switch
                                            id="discussionPosts"
                                            checked={notificationSettings.discussionPosts}
                                            onCheckedChange={(checked) => handleNotificationChange("discussionPosts", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="courseAnnouncements">Course Announcements</Label>
                                            <p className="text-sm text-muted-foreground">Notify about course announcements</p>
                                        </div>
                                        <Switch
                                            id="courseAnnouncements"
                                            checked={notificationSettings.courseAnnouncements}
                                            onCheckedChange={(checked) => handleNotificationChange("courseAnnouncements", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="gradeUpdates">Grade Updates</Label>
                                            <p className="text-sm text-muted-foreground">Notify when grades are updated</p>
                                        </div>
                                        <Switch
                                            id="gradeUpdates"
                                            checked={notificationSettings.gradeUpdates}
                                            onCheckedChange={(checked) => handleNotificationChange("gradeUpdates", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="systemAnnouncements">System Announcements</Label>
                                            <p className="text-sm text-muted-foreground">Notify about system-wide announcements</p>
                                        </div>
                                        <Switch
                                            id="systemAnnouncements"
                                            checked={notificationSettings.systemAnnouncements}
                                            onCheckedChange={(checked) => handleNotificationChange("systemAnnouncements", checked)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Digest Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="dailyDigest">Daily Digest</Label>
                                            <p className="text-sm text-muted-foreground">Receive a daily summary of activities</p>
                                        </div>
                                        <Switch
                                            id="dailyDigest"
                                            checked={notificationSettings.dailyDigest}
                                            onCheckedChange={(checked) => handleNotificationChange("dailyDigest", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                                            <p className="text-sm text-muted-foreground">Receive a weekly summary of activities</p>
                                        </div>
                                        <Switch
                                            id="weeklyDigest"
                                            checked={notificationSettings.weeklyDigest}
                                            onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveNotifications}>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>Control what information is visible to students and other users</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Profile Visibility</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="showEmail">Show Email Address</Label>
                                            <p className="text-sm text-muted-foreground">Make your email address visible to students</p>
                                        </div>
                                        <Switch
                                            id="showEmail"
                                            checked={privacySettings.showEmail}
                                            onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="showPhone">Show Phone Number</Label>
                                            <p className="text-sm text-muted-foreground">Make your phone number visible to students</p>
                                        </div>
                                        <Switch
                                            id="showPhone"
                                            checked={privacySettings.showPhone}
                                            onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="showOfficeHours">Show Office Hours</Label>
                                            <p className="text-sm text-muted-foreground">Make your office hours visible to students</p>
                                        </div>
                                        <Switch
                                            id="showOfficeHours"
                                            checked={privacySettings.showOfficeHours}
                                            onCheckedChange={(checked) => handlePrivacyChange("showOfficeHours", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="showBio">Show Biography</Label>
                                            <p className="text-sm text-muted-foreground">Make your biography visible to students</p>
                                        </div>
                                        <Switch
                                            id="showBio"
                                            checked={privacySettings.showBio}
                                            onCheckedChange={(checked) => handlePrivacyChange("showBio", checked)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Communication Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="allowStudentMessages">Allow Student Messages</Label>
                                            <p className="text-sm text-muted-foreground">Allow students to send you direct messages</p>
                                        </div>
                                        <Switch
                                            id="allowStudentMessages"
                                            checked={privacySettings.allowStudentMessages}
                                            onCheckedChange={(checked) => handlePrivacyChange("allowStudentMessages", checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="allowProfileViews">Allow Profile Views</Label>
                                            <p className="text-sm text-muted-foreground">Allow students to view your full profile</p>
                                        </div>
                                        <Switch
                                            id="allowProfileViews"
                                            checked={privacySettings.allowProfileViews}
                                            onCheckedChange={(checked) => handlePrivacyChange("allowProfileViews", checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSavePrivacy}>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="display" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Settings</CardTitle>
                            <CardDescription>Customize how the platform appears to you</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="theme">Theme</Label>
                                    <Select value={displaySettings.theme} onValueChange={(value) => handleDisplayChange("theme", value)}>
                                        <SelectTrigger id="theme">
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="fontSize">Font Size</Label>
                                    <Select
                                        value={displaySettings.fontSize}
                                        onValueChange={(value) => handleDisplayChange("fontSize", value)}
                                    >
                                        <SelectTrigger id="fontSize">
                                            <SelectValue placeholder="Select font size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">Small</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="large">Large</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select
                                        value={displaySettings.language}
                                        onValueChange={(value) => handleDisplayChange("language", value)}
                                    >
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="spanish">Spanish</SelectItem>
                                            <SelectItem value="french">French</SelectItem>
                                            <SelectItem value="german">German</SelectItem>
                                            <SelectItem value="chinese">Chinese</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select
                                        value={displaySettings.timezone}
                                        onValueChange={(value) => handleDisplayChange("timezone", value)}
                                    >
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                            <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="dateFormat">Date Format</Label>
                                    <Select
                                        value={displaySettings.dateFormat}
                                        onValueChange={(value) => handleDisplayChange("dateFormat", value)}
                                    >
                                        <SelectTrigger id="dateFormat">
                                            <SelectValue placeholder="Select date format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="timeFormat">Time Format</Label>
                                    <Select
                                        value={displaySettings.timeFormat}
                                        onValueChange={(value) => handleDisplayChange("timeFormat", value)}
                                    >
                                        <SelectTrigger id="timeFormat">
                                            <SelectValue placeholder="Select time format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                                            <SelectItem value="24h">24-hour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveDisplay}>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security and authentication methods</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Change Password</h3>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input id="currentPassword" type="password" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input id="newPassword" type="password" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input id="confirmPassword" type="password" />
                                    </div>
                                    <Button className="w-fit">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Update Password
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security to your account by enabling two-factor authentication.
                                    </p>
                                    <Button variant="outline">
                                        <Shield className="mr-2 h-4 w-4" />
                                        Enable Two-Factor Authentication
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Login Sessions</h3>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">View and manage your active login sessions.</p>
                                    <Button variant="outline">
                                        <Smartphone className="mr-2 h-4 w-4" />
                                        Manage Login Sessions
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

