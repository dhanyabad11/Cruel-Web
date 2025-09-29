"use client";"use client";"use client";



import { Navigation } from "@/components/Navigation";

import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";import { Navigation } from "@/components/Navigation";import { Navigation } from "@/components/Navigation";

import { useEffect, useState } from "react";

import { Bell, Mail, MessageSquare, Clock, Save, CheckCircle } from "lucide-react";import { useAuth } from "@/contexts/AuthContext";import { useAuth } from "@/contexts/AuthContext";



interface NotificationSettings {import { useRouter } from "next/navigation";import { useRouter } from "next/navigation";

    email: {

        deadlineReminders: boolean;import { useEffect, useState } from "react";import { useEffect, useState } from "react";

        weeklyDigest: boolean;

        newDeadlines: boolean;import { Bell, Mail, MessageSquare, Clock, Save, CheckCircle } from "lucide-react";import { Bell, Mail, MessageSquare, Clock, Save, CheckCircle } from "lucide-react";

        overdueAlerts: boolean;

    };

    whatsapp: {

        deadlineReminders: boolean;interface NotificationSettings {interface NotificationSettings {

        dailyDigest: boolean;

        urgentAlerts: boolean;    email: {    email: {

    };

    inApp: {        deadlineReminders: boolean;        deadlineReminders: boolean;

        allNotifications: boolean;

        deadlineReminders: boolean;        weeklyDigest: boolean;        weeklyDigest: boolean;

        systemUpdates: boolean;

    };        newDeadlines: boolean;        newDeadlines: boolean;

    timing: {

        reminderDays: number;        overdueAlerts: boolean;        overdueAlerts: boolean;

        digestTime: string;

        urgentThreshold: number;    };    };

    };

}    whatsapp: {    whatsapp: {



export default function NotificationsPage() {        deadlineReminders: boolean;        deadlineReminders: boolean;

    const { user, loading } = useAuth();

    const router = useRouter();        dailyDigest: boolean;        dailyDigest: boolean;

    const [settings, setSettings] = useState<NotificationSettings>({

        email: {        urgentAlerts: boolean;        urgentAlerts: boolean;

            deadlineReminders: true,

            weeklyDigest: true,    };    };

            newDeadlines: false,

            overdueAlerts: true    inApp: {    inApp: {

        },

        whatsapp: {        allNotifications: boolean;        allNotifications: boolean;

            deadlineReminders: false,

            dailyDigest: false,        deadlineReminders: boolean;        deadlineReminders: boolean;

            urgentAlerts: true

        },        systemUpdates: boolean;        systemUpdates: boolean;

        inApp: {

            allNotifications: true,    };    };

            deadlineReminders: true,

            systemUpdates: true    timing: {    timing: {

        },

        timing: {        reminderDays: number;        reminderDays: number;

            reminderDays: 3,

            digestTime: "09:00",        digestTime: string;        digestTime: string;

            urgentThreshold: 24

        }        urgentThreshold: number;        urgentThreshold: number;

    });

    const [saving, setSaving] = useState(false);    };    };

    const [saved, setSaved] = useState(false);

}}

    useEffect(() => {

        if (!loading && !user) {

            router.push("/login");

        }export default function NotificationsPage() {export default function NotificationsPage() {

    }, [user, loading, router]);

    const { user, loading } = useAuth();    const { user, loading } = useAuth();

    const handleToggle = (category: keyof NotificationSettings, key: string) => {

        setSettings(prev => ({    const router = useRouter();    const router = useRouter();

            ...prev,

            [category]: {    const [settings, setSettings] = useState<NotificationSettings>({    const [settings, setSettings] = useState<NotificationSettings>({

                ...prev[category],

                [key]: !prev[category][key as keyof typeof prev[typeof category]]        email: {        email: {

            }

        }));            deadlineReminders: true,            deadlineReminders: true,

    };

            weeklyDigest: true,            weeklyDigest: true,

    const handleTimingChange = (key: keyof NotificationSettings['timing'], value: string | number) => {

        setSettings(prev => ({            newDeadlines: false,            newDeadlines: false,

            ...prev,

            timing: {            overdueAlerts: true            overdueAlerts: true

                ...prev.timing,

                [key]: value        },        },

            }

        }));        whatsapp: {        whatsapp: {

    };

            deadlineReminders: false,            deadlineReminders: false,

    const handleSave = async () => {

        setSaving(true);            dailyDigest: false,            dailyDigest: false,

        try {

            // TODO: Call API to save settings            urgentAlerts: true            urgentAlerts: true

            await new Promise(resolve => setTimeout(resolve, 1000));

            setSaved(true);        },        },

            setTimeout(() => setSaved(false), 3000);

        } catch (error) {        inApp: {        inApp: {

            console.error("Error saving settings:", error);

        } finally {            allNotifications: true,            allNotifications: true,

            setSaving(false);

        }            deadlineReminders: true,            deadlineReminders: true,

    };

            systemUpdates: true            systemUpdates: true

    if (loading) {

        return (        },        },

            <div className="min-h-screen flex items-center justify-center">

                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>        timing: {        timing: {

            </div>

        );            reminderDays: 3,            reminderDays: 3,

    }

            digestTime: "09:00",            digestTime: "09:00",

    if (!user) {

        return null;            urgentThreshold: 24            urgentThreshold: 24

    }

        }        }

    return (

        <div className="min-h-screen bg-white">    });    });

            <Navigation />

            <div className="container mx-auto px-4 py-8 max-w-4xl">    const [saving, setSaving] = useState(false);    const [saving, setSaving] = useState(false);

                {/* Header */}

                <div className="mb-8">    const [saved, setSaved] = useState(false);    const [saved, setSaved] = useState(false);

                    <h1 className="text-2xl font-bold mb-2">Notification Settings</h1>

                    <p className="text-gray-600">Manage how and when you receive notifications about your deadlines</p>

                </div>

    useEffect(() => {    useEffect(() => {

                <div className="space-y-8">

                    {/* Email Notifications */}        if (!loading && !user) {        if (!loading && !user) {

                    <div className="card">

                        <div className="flex items-center gap-3 mb-6">            router.push("/login");            router.push("/login");

                            <Mail className="h-6 w-6 text-blue-600" />

                            <h2 className="text-xl font-semibold">Email Notifications</h2>        }        }

                        </div>

                            }, [user, loading, router]);    }, [user, loading, router]);

                        <div className="space-y-4">

                            <div className="flex items-center justify-between py-3">

                                <div>

                                    <h3 className="font-medium">Deadline Reminders</h3>    const handleToggle = (category: keyof NotificationSettings, key: string) => {    const handleToggle = (category: keyof NotificationSettings, key: string) => {

                                    <p className="text-sm text-gray-600">Get reminded about upcoming deadlines via email</p>

                                </div>        setSettings(prev => ({        setSettings(prev => ({

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input            ...prev,            ...prev,

                                        type="checkbox"

                                        checked={settings.email.deadlineReminders}            [category]: {            [category]: {

                                        onChange={() => handleToggle('email', 'deadlineReminders')}

                                        className="sr-only peer"                ...prev[category],                ...prev[category],

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                [key]: !prev[category][key as keyof typeof prev[typeof category]]                [key]: !prev[category][key as keyof typeof prev[typeof category]]

                                </label>

                            </div>            }            }



                            <div className="flex items-center justify-between py-3">        }));        }));

                                <div>

                                    <h3 className="font-medium">Weekly Digest</h3>    };    };

                                    <p className="text-sm text-gray-600">Receive a weekly summary of all your deadlines</p>

                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input    const handleTimingChange = (key: keyof NotificationSettings['timing'], value: string | number) => {    const handleTimingChange = (key: keyof NotificationSettings['timing'], value: string | number) => {

                                        type="checkbox"

                                        checked={settings.email.weeklyDigest}        setSettings(prev => ({        setSettings(prev => ({

                                        onChange={() => handleToggle('email', 'weeklyDigest')}

                                        className="sr-only peer"            ...prev,            ...prev,

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>            timing: {            timing: {

                                </label>

                            </div>                ...prev.timing,                ...prev.timing,



                            <div className="flex items-center justify-between py-3">                [key]: value                [key]: value

                                <div>

                                    <h3 className="font-medium">New Deadline Alerts</h3>            }            }

                                    <p className="text-sm text-gray-600">Get notified when new deadlines are added</p>

                                </div>        }));        }));

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input    };    };

                                        type="checkbox"

                                        checked={settings.email.newDeadlines}

                                        onChange={() => handleToggle('email', 'newDeadlines')}

                                        className="sr-only peer"    const handleSave = async () => {    const handleSave = async () => {

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>        setSaving(true);        setSaving(true);

                                </label>

                            </div>        try {        try {



                            <div className="flex items-center justify-between py-3">            // TODO: Call API to save settings            // TODO: Call API to save settings

                                <div>

                                    <h3 className="font-medium">Overdue Alerts</h3>            await new Promise(resolve => setTimeout(resolve, 1000));            await new Promise(resolve => setTimeout(resolve, 1000));

                                    <p className="text-sm text-gray-600">Get notified about overdue assignments</p>

                                </div>            setSaved(true);            setSaved(true);

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input            setTimeout(() => setSaved(false), 3000);            setTimeout(() => setSaved(false), 3000);

                                        type="checkbox"

                                        checked={settings.email.overdueAlerts}        } catch (error) {        } catch (error) {

                                        onChange={() => handleToggle('email', 'overdueAlerts')}

                                        className="sr-only peer"            console.error("Error saving settings:", error);            console.error("Error saving settings:", error);

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>        } finally {        } finally {

                                </label>

                            </div>            setSaving(false);            setSaving(false);

                        </div>

                    </div>        }        }



                    {/* WhatsApp Notifications */}    };    };

                    <div className="card">

                        <div className="flex items-center gap-3 mb-6">

                            <MessageSquare className="h-6 w-6 text-green-600" />

                            <h2 className="text-xl font-semibold">WhatsApp Notifications</h2>    if (loading) {    if (loading) {

                        </div>

                                return (        return (

                        <div className="space-y-4">

                            <div className="flex items-center justify-between py-3">            <div className="min-h-screen flex items-center justify-center">            <div className="min-h-screen flex items-center justify-center">

                                <div>

                                    <h3 className="font-medium">Deadline Reminders</h3>                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>

                                    <p className="text-sm text-gray-600">Get WhatsApp messages for upcoming deadlines</p>

                                </div>            </div>            </div>

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input        );        );

                                        type="checkbox"

                                        checked={settings.whatsapp.deadlineReminders}    }    }

                                        onChange={() => handleToggle('whatsapp', 'deadlineReminders')}

                                        className="sr-only peer"

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>    if (!user) {    if (!user) {

                                </label>

                            </div>        return null;        return null;



                            <div className="flex items-center justify-between py-3">    }    }

                                <div>

                                    <h3 className="font-medium">Daily Digest</h3>

                                    <p className="text-sm text-gray-600">Daily summary of today&apos;s deadlines and tasks</p>

                                </div>    return (    return (

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input        <div className="min-h-screen bg-white">        <div className="min-h-screen bg-white">

                                        type="checkbox"

                                        checked={settings.whatsapp.dailyDigest}            <Navigation />            <Navigation />

                                        onChange={() => handleToggle('whatsapp', 'dailyDigest')}

                                        className="sr-only peer"            <div className="container mx-auto px-4 py-8 max-w-4xl">            <div className="container mx-auto px-4 py-8 max-w-4xl">

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                {/* Header */}                {/* Header */}

                                </label>

                            </div>                <div className="mb-8">                <div className="mb-8">



                            <div className="flex items-center justify-between py-3">                    <h1 className="text-2xl font-bold mb-2">Notification Settings</h1>                    <h1 className="text-2xl font-bold mb-2">Notification Settings</h1>

                                <div>

                                    <h3 className="font-medium">Urgent Alerts</h3>                    <p className="text-gray-600">Manage how and when you receive notifications about your deadlines</p>                    <p className="text-gray-600">Manage how and when you receive notifications about your deadlines</p>

                                    <p className="text-sm text-gray-600">Critical notifications for urgent deadlines</p>

                                </div>                </div>                </div>

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input

                                        type="checkbox"

                                        checked={settings.whatsapp.urgentAlerts}                <div className="space-y-8">                <div className="space-y-8">

                                        onChange={() => handleToggle('whatsapp', 'urgentAlerts')}

                                        className="sr-only peer"                    {/* Email Notifications */}                    {/* Email Notifications */}

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                    <div className="card">                    <div className="card">

                                </label>

                            </div>                        <div className="flex items-center gap-3 mb-6">                        <div className="flex items-center gap-3 mb-6">

                        </div>

                    </div>                            <Mail className="h-6 w-6 text-blue-600" />                            <Mail className="h-6 w-6 text-blue-600" />



                    {/* In-App Notifications */}                            <h2 className="text-xl font-semibold">Email Notifications</h2>                            <h2 className="text-xl font-semibold">Email Notifications</h2>

                    <div className="card">

                        <div className="flex items-center gap-3 mb-6">                        </div>                        </div>

                            <Bell className="h-6 w-6 text-purple-600" />

                            <h2 className="text-xl font-semibold">In-App Notifications</h2>                                                

                        </div>

                                                <div className="space-y-4">                        <div className="space-y-4">

                        <div className="space-y-4">

                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>

                                    <h3 className="font-medium">All Notifications</h3>                                <div>                                <div>

                                    <p className="text-sm text-gray-600">Enable all in-app notifications</p>

                                </div>                                    <h3 className="font-medium">Deadline Reminders</h3>                                    <h3 className="font-medium">Deadline Reminders</h3>

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <p className="text-sm text-gray-600">Get reminded about upcoming deadlines via email</p>                                    <p className="text-sm text-gray-600">Get reminded about upcoming deadlines via email</p>

                                        type="checkbox"

                                        checked={settings.inApp.allNotifications}                                </div>                                </div>

                                        onChange={() => handleToggle('inApp', 'allNotifications')}

                                        className="sr-only peer"                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <input                                    <input

                                </label>

                            </div>                                        type="checkbox"                                        type="checkbox"



                            <div className="flex items-center justify-between py-3">                                        checked={settings.email.deadlineReminders}                                        checked={settings.email.deadlineReminders}

                                <div>

                                    <h3 className="font-medium">Deadline Reminders</h3>                                        onChange={() => handleToggle('email', 'deadlineReminders')}                                        onChange={() => handleToggle('email', 'deadlineReminders')}

                                    <p className="text-sm text-gray-600">Show deadline reminders in the app</p>

                                </div>                                        className="sr-only peer"                                        className="sr-only peer"

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    />                                    />

                                        type="checkbox"

                                        checked={settings.inApp.deadlineReminders}                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                        onChange={() => handleToggle('inApp', 'deadlineReminders')}

                                        className="sr-only peer"                                </label>                                </label>

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                            </div>                            </div>

                                </label>

                            </div>



                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>

                                    <h3 className="font-medium">System Updates</h3>                                <div>                                <div>

                                    <p className="text-sm text-gray-600">Notifications about app updates and features</p>

                                </div>                                    <h3 className="font-medium">Weekly Digest</h3>                                    <h3 className="font-medium">Weekly Digest</h3>

                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <p className="text-sm text-gray-600">Receive a weekly summary of all your deadlines</p>                                    <p className="text-sm text-gray-600">Receive a weekly summary of all your deadlines</p>

                                        type="checkbox"

                                        checked={settings.inApp.systemUpdates}                                </div>                                </div>

                                        onChange={() => handleToggle('inApp', 'systemUpdates')}

                                        className="sr-only peer"                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <input                                    <input

                                </label>

                            </div>                                        type="checkbox"                                        type="checkbox"

                        </div>

                    </div>                                        checked={settings.email.weeklyDigest}                                        checked={settings.email.weeklyDigest}



                    {/* Timing Settings */}                                        onChange={() => handleToggle('email', 'weeklyDigest')}                                        onChange={() => handleToggle('email', 'weeklyDigest')}

                    <div className="card">

                        <div className="flex items-center gap-3 mb-6">                                        className="sr-only peer"                                        className="sr-only peer"

                            <Clock className="h-6 w-6 text-orange-600" />

                            <h2 className="text-xl font-semibold">Timing & Frequency</h2>                                    />                                    />

                        </div>

                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                        <div className="space-y-6">

                            <div>                                </label>                                </label>

                                <label className="block text-sm font-medium mb-2">

                                    Reminder Days Before Deadline                            </div>                            </div>

                                </label>

                                <select

                                    value={settings.timing.reminderDays}

                                    onChange={(e) => handleTimingChange('reminderDays', parseInt(e.target.value))}                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                    className="input w-full max-w-xs"

                                >                                <div>                                <div>

                                    <option value={1}>1 day before</option>

                                    <option value={2}>2 days before</option>                                    <h3 className="font-medium">New Deadline Alerts</h3>                                    <h3 className="font-medium">New Deadline Alerts</h3>

                                    <option value={3}>3 days before</option>

                                    <option value={5}>5 days before</option>                                    <p className="text-sm text-gray-600">Get notified when new deadlines are added</p>                                    <p className="text-sm text-gray-600">Get notified when new deadlines are added</p>

                                    <option value={7}>1 week before</option>

                                </select>                                </div>                                </div>

                            </div>

                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                            <div>

                                <label className="block text-sm font-medium mb-2">                                    <input                                    <input

                                    Daily Digest Time

                                </label>                                        type="checkbox"                                        type="checkbox"

                                <input

                                    type="time"                                        checked={settings.email.newDeadlines}                                        checked={settings.email.newDeadlines}

                                    value={settings.timing.digestTime}

                                    onChange={(e) => handleTimingChange('digestTime', e.target.value)}                                        onChange={() => handleToggle('email', 'newDeadlines')}                                        onChange={() => handleToggle('email', 'newDeadlines')}

                                    className="input w-full max-w-xs"

                                />                                        className="sr-only peer"                                        className="sr-only peer"

                            </div>

                                    />                                    />

                            <div>

                                <label className="block text-sm font-medium mb-2">                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                    Urgent Alert Threshold (hours before deadline)

                                </label>                                </label>                                </label>

                                <select

                                    value={settings.timing.urgentThreshold}                            </div>                            </div>

                                    onChange={(e) => handleTimingChange('urgentThreshold', parseInt(e.target.value))}

                                    className="input w-full max-w-xs"

                                >

                                    <option value={6}>6 hours</option>                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                    <option value={12}>12 hours</option>

                                    <option value={24}>24 hours</option>                                <div>                                <div>

                                    <option value={48}>2 days</option>

                                </select>                                    <h3 className="font-medium">Overdue Alerts</h3>                                    <h3 className="font-medium">Overdue Alerts</h3>

                            </div>

                        </div>                                    <p className="text-sm text-gray-600">Get notified about overdue assignments</p>                                    <p className="text-sm text-gray-600">Get notified about overdue assignments</p>

                    </div>

                                </div>                                </div>

                    {/* Save Button */}

                    <div className="flex justify-center pt-6">                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                        <button

                            onClick={handleSave}                                    <input                                    <input

                            disabled={saving}

                            className={`btn ${saved ? 'btn-success' : 'btn-primary'} min-w-[200px]`}                                        type="checkbox"                                        type="checkbox"

                        >

                            {saving ? (                                        checked={settings.email.overdueAlerts}                                        checked={settings.email.overdueAlerts}

                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>

                            ) : saved ? (                                        onChange={() => handleToggle('email', 'overdueAlerts')}                                        onChange={() => handleToggle('email', 'overdueAlerts')}

                                <CheckCircle className="h-4 w-4 mr-2" />

                            ) : (                                        className="sr-only peer"                                        className="sr-only peer"

                                <Save className="h-4 w-4 mr-2" />

                            )}                                    />                                    />

                            {saving ? "Saving..." : saved ? "Settings Saved!" : "Save Settings"}

                        </button>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                    </div>

                </div>                                </label>                                </label>

            </div>

        </div>                            </div>                            </div>

    );

}                        </div>                        </div>

                    </div>                    </div>



                    {/* WhatsApp Notifications */}                    {/* WhatsApp Notifications */}

                    <div className="card">                    <div className="card">

                        <div className="flex items-center gap-3 mb-6">                        <div className="flex items-center gap-3 mb-6">

                            <MessageSquare className="h-6 w-6 text-green-600" />                            <MessageSquare className="h-6 w-6 text-green-600" />

                            <h2 className="text-xl font-semibold">WhatsApp Notifications</h2>                            <h2 className="text-xl font-semibold">WhatsApp Notifications</h2>

                        </div>                        </div>

                                                

                        <div className="space-y-4">                        <div className="space-y-4">

                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>                                <div>

                                    <h3 className="font-medium">Deadline Reminders</h3>                                    <h3 className="font-medium">Deadline Reminders</h3>

                                    <p className="text-sm text-gray-600">Get WhatsApp messages for upcoming deadlines</p>                                    <p className="text-sm text-gray-600">Get WhatsApp messages for upcoming deadlines</p>

                                </div>                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <input

                                        type="checkbox"                                        type="checkbox"

                                        checked={settings.whatsapp.deadlineReminders}                                        checked={settings.whatsapp.deadlineReminders}

                                        onChange={() => handleToggle('whatsapp', 'deadlineReminders')}                                        onChange={() => handleToggle('whatsapp', 'deadlineReminders')}

                                        className="sr-only peer"                                        className="sr-only peer"

                                    />                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                </label>                                </label>

                            </div>                            </div>



                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>                                <div>

                                    <h3 className="font-medium">Daily Digest</h3>                                    <h3 className="font-medium">Daily Digest</h3>

                                    <p className="text-sm text-gray-600">Daily summary of today&apos;s deadlines and tasks</p>                                    <p className="text-sm text-gray-600">Daily summary of today&apos;s deadlines and tasks</p>

                                </div>                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <input

                                        type="checkbox"                                        type="checkbox"

                                        checked={settings.whatsapp.dailyDigest}                                        checked={settings.whatsapp.dailyDigest}

                                        onChange={() => handleToggle('whatsapp', 'dailyDigest')}                                        onChange={() => handleToggle('whatsapp', 'dailyDigest')}

                                        className="sr-only peer"                                        className="sr-only peer"

                                    />                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                </label>                                </label>

                            </div>                            </div>



                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>                                <div>

                                    <h3 className="font-medium">Urgent Alerts</h3>                                    <h3 className="font-medium">Urgent Alerts</h3>

                                    <p className="text-sm text-gray-600">Critical notifications for urgent deadlines</p>                                    <p className="text-sm text-gray-600">Critical notifications for urgent deadlines</p>

                                </div>                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <input

                                        type="checkbox"                                        type="checkbox"

                                        checked={settings.whatsapp.urgentAlerts}                                        checked={settings.whatsapp.urgentAlerts}

                                        onChange={() => handleToggle('whatsapp', 'urgentAlerts')}                                        onChange={() => handleToggle('whatsapp', 'urgentAlerts')}

                                        className="sr-only peer"                                        className="sr-only peer"

                                    />                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                </label>                                </label>

                            </div>                            </div>

                        </div>                        </div>

                    </div>                    </div>



                    {/* In-App Notifications */}                    {/* In-App Notifications */}

                    <div className="card">                    <div className="card">

                        <div className="flex items-center gap-3 mb-6">                        <div className="flex items-center gap-3 mb-6">

                            <Bell className="h-6 w-6 text-purple-600" />                            <Bell className="h-6 w-6 text-purple-600" />

                            <h2 className="text-xl font-semibold">In-App Notifications</h2>                            <h2 className="text-xl font-semibold">In-App Notifications</h2>

                        </div>                        </div>

                                                

                        <div className="space-y-4">                        <div className="space-y-4">

                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>                                <div>

                                    <h3 className="font-medium">All Notifications</h3>                                    <h3 className="font-medium">All Notifications</h3>

                                    <p className="text-sm text-gray-600">Enable all in-app notifications</p>                                    <p className="text-sm text-gray-600">Enable all in-app notifications</p>

                                </div>                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <input

                                        type="checkbox"                                        type="checkbox"

                                        checked={settings.inApp.allNotifications}                                        checked={settings.inApp.allNotifications}

                                        onChange={() => handleToggle('inApp', 'allNotifications')}                                        onChange={() => handleToggle('inApp', 'allNotifications')}

                                        className="sr-only peer"                                        className="sr-only peer"

                                    />                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                </label>                                </label>

                            </div>                            </div>



                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>                                <div>

                                    <h3 className="font-medium">Deadline Reminders</h3>                                    <h3 className="font-medium">Deadline Reminders</h3>

                                    <p className="text-sm text-gray-600">Show deadline reminders in the app</p>                                    <p className="text-sm text-gray-600">Show deadline reminders in the app</p>

                                </div>                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <input

                                        type="checkbox"                                        type="checkbox"

                                        checked={settings.inApp.deadlineReminders}                                        checked={settings.inApp.deadlineReminders}

                                        onChange={() => handleToggle('inApp', 'deadlineReminders')}                                        onChange={() => handleToggle('inApp', 'deadlineReminders')}

                                        className="sr-only peer"                                        className="sr-only peer"

                                    />                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                </label>                                </label>

                            </div>                            </div>



                            <div className="flex items-center justify-between py-3">                            <div className="flex items-center justify-between py-3">

                                <div>                                <div>

                                    <h3 className="font-medium">System Updates</h3>                                    <h3 className="font-medium">System Updates</h3>

                                    <p className="text-sm text-gray-600">Notifications about app updates and features</p>                                    <p className="text-sm text-gray-600">Notifications about app updates and features</p>

                                </div>                                </div>

                                <label className="relative inline-flex items-center cursor-pointer">                                <label className="relative inline-flex items-center cursor-pointer">

                                    <input                                    <input

                                        type="checkbox"                                        type="checkbox"

                                        checked={settings.inApp.systemUpdates}                                        checked={settings.inApp.systemUpdates}

                                        onChange={() => handleToggle('inApp', 'systemUpdates')}                                        onChange={() => handleToggle('inApp', 'systemUpdates')}

                                        className="sr-only peer"                                        className="sr-only peer"

                                    />                                    />

                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>

                                </label>                                </label>

                            </div>                            </div>

                        </div>                        </div>

                    </div>                    </div>



                    {/* Timing Settings */}                    {/* Timing Settings */}

                    <div className="card">                    <div className="card">

                        <div className="flex items-center gap-3 mb-6">                        <div className="flex items-center gap-3 mb-6">

                            <Clock className="h-6 w-6 text-orange-600" />                            <Clock className="h-6 w-6 text-orange-600" />

                            <h2 className="text-xl font-semibold">Timing & Frequency</h2>                            <h2 className="text-xl font-semibold">Timing & Frequency</h2>

                        </div>                        </div>

                                                

                        <div className="space-y-6">                        <div className="space-y-6">

                            <div>                            <div>

                                <label className="block text-sm font-medium mb-2">                                <label className="block text-sm font-medium mb-2">

                                    Reminder Days Before Deadline                                    Reminder Days Before Deadline

                                </label>                                </label>

                                <select                                <select

                                    value={settings.timing.reminderDays}                                    value={settings.timing.reminderDays}

                                    onChange={(e) => handleTimingChange('reminderDays', parseInt(e.target.value))}                                    onChange={(e) => handleTimingChange('reminderDays', parseInt(e.target.value))}

                                    className="input w-full max-w-xs"                                    className="input w-full max-w-xs"

                                >                                >

                                    <option value={1}>1 day before</option>                                    <option value={1}>1 day before</option>

                                    <option value={2}>2 days before</option>                                    <option value={2}>2 days before</option>

                                    <option value={3}>3 days before</option>                                    <option value={3}>3 days before</option>

                                    <option value={5}>5 days before</option>                                    <option value={5}>5 days before</option>

                                    <option value={7}>1 week before</option>                                    <option value={7}>1 week before</option>

                                </select>                                </select>

                            </div>                            </div>



                            <div>                            <div>

                                <label className="block text-sm font-medium mb-2">                                <label className="block text-sm font-medium mb-2">

                                    Daily Digest Time                                    Daily Digest Time

                                </label>                                </label>

                                <input                                <input

                                    type="time"                                    type="time"

                                    value={settings.timing.digestTime}                                    value={settings.timing.digestTime}

                                    onChange={(e) => handleTimingChange('digestTime', e.target.value)}                                    onChange={(e) => handleTimingChange('digestTime', e.target.value)}

                                    className="input w-full max-w-xs"                                    className="input w-full max-w-xs"

                                />                                />

                            </div>                            </div>



                            <div>                            <div>

                                <label className="block text-sm font-medium mb-2">                                <label className="block text-sm font-medium mb-2">

                                    Urgent Alert Threshold (hours before deadline)                                    Urgent Alert Threshold (hours before deadline)

                                </label>                                </label>

                                <select                                <select

                                    value={settings.timing.urgentThreshold}                                    value={settings.timing.urgentThreshold}

                                    onChange={(e) => handleTimingChange('urgentThreshold', parseInt(e.target.value))}                                    onChange={(e) => handleTimingChange('urgentThreshold', parseInt(e.target.value))}

                                    className="input w-full max-w-xs"                                    className="input w-full max-w-xs"

                                >                                >

                                    <option value={6}>6 hours</option>                                    <option value={6}>6 hours</option>

                                    <option value={12}>12 hours</option>                                    <option value={12}>12 hours</option>

                                    <option value={24}>24 hours</option>                                    <option value={24}>24 hours</option>

                                    <option value={48}>2 days</option>                                    <option value={48}>2 days</option>

                                </select>                                </select>

                            </div>                            </div>

                        </div>                        </div>

                    </div>                    </div>



                    {/* Save Button */}                    {/* Save Button */}

                    <div className="flex justify-center pt-6">                    <div className="flex justify-center pt-6">

                        <button                        <button

                            onClick={handleSave}                            onClick={handleSave}

                            disabled={saving}                            disabled={saving}

                            className={`btn ${saved ? 'btn-success' : 'btn-primary'} min-w-[200px]`}                            className={`btn ${saved ? 'btn-success' : 'btn-primary'} min-w-[200px]`}

                        >                        >

                            {saving ? (                            {saving ? (

                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>

                            ) : saved ? (                            ) : saved ? (

                                <CheckCircle className="h-4 w-4 mr-2" />                                <CheckCircle className="h-4 w-4 mr-2" />

                            ) : (                            ) : (

                                <Save className="h-4 w-4 mr-2" />                                <Save className="h-4 w-4 mr-2" />

                            )}                            )}

                            {saving ? "Saving..." : saved ? "Settings Saved!" : "Save Settings"}                            {saving ? "Saving..." : saved ? "Settings Saved!" : "Save Settings"}

                        </button>                        </button>

                    </div>                    </div>

                </div>                </div>

            </div>            </div>

        </div>        </div>

    );    );

}}