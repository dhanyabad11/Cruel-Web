"use client";"use client";"use client";



import { Navigation } from "@/components/Navigation";

import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";import { Navigation } from "@/components/Navigation";import { Navigation } from "@/components/Navigation";

import { useEffect, useState } from "react";

import { Bell, Mail, MessageSquare, Save } from "lucide-react";import { useAuth } from "@/contexts/AuthContext";import { useAuth } from "@/contexts/AuthContext";



export default function NotificationsPage() {import { useRouter } from "next/navigation";import { useRouter } from "next/navigation";

    const { user, loading } = useAuth();

    const router = useRouter();import { useEffect, useState } from "react";import { useEffect, useState } from "react";

    const [isSaving, setIsSaving] = useState(false);

import { Bell, Mail, MessageSquare, Save } from "lucide-react";import { Bell, Mail, MessageSquare, Save } from "lucide-react";

    useEffect(() => {

        if (!loading && !user) {

            router.push("/login");

        }export default function NotificationsPage() {export default function NotificationsPage() {

    }, [user, loading, router]);

    const { user, loading } = useAuth();    const { user, loading } = useAuth();

    const handleSave = async () => {

        setIsSaving(true);    const router = useRouter();    const router = useRouter();

        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);    const [isSaving, setIsSaving] = useState(false);    const [isSaving, setIsSaving] = useState(false);

    };



    if (loading) {

        return (    useEffect(() => {    useEffect(() => {

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">

                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>        if (!loading && !user) {        if (!loading && !user) {

            </div>

        );            router.push("/login");            router.push("/login");

    }

        }        }

    if (!user) return null;

    }, [user, loading, router]);    }, [user, loading, router]);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

            <Navigation />

            <div className="max-w-4xl mx-auto p-6">    const handleSave = async () => {    const handleSave = async () => {

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Notification Settings</h1>        setIsSaving(true);        setIsSaving(true);

                    <p className="text-lg text-slate-600">Customize how and when you receive deadline reminders</p>

                </div>        await new Promise(resolve => setTimeout(resolve, 1000));        await new Promise(resolve => setTimeout(resolve, 1000));



                <div className="space-y-8">        setIsSaving(false);        setIsSaving(false);

                    <div className="card">

                        <div className="card-header">    };    };

                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">

                                    <Mail className="w-5 h-5 text-white" />

                                </div>    if (loading) {    if (loading) {

                                <div>

                                    <h2 className="card-title text-xl">Email Notifications</h2>        return (        return (

                                    <p className="card-description">Receive updates via email</p>

                                </div>            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">

                            </div>

                        </div>                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

                        <div className="card-content">

                            <p className="text-slate-600">Configure your email notification preferences here.</p>            </div>            </div>

                        </div>

                    </div>        );        );



                    <div className="card">    }    }

                        <div className="card-header">

                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">

                                    <Bell className="w-5 h-5 text-white" />    if (!user) return null;    if (!user) return null;

                                </div>

                                <div>

                                    <h2 className="card-title text-xl">Push Notifications</h2>

                                    <p className="card-description">Browser and mobile notifications</p>    return (    return (

                                </div>

                            </div>        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

                        </div>

                        <div className="card-content">            <Navigation />            <Navigation />

                            <p className="text-slate-600">Set up push notifications for instant alerts.</p>

                        </div>            <div className="max-w-4xl mx-auto p-6">            <div className="max-w-4xl mx-auto p-6">

                    </div>

                <div className="mb-10">                <div className="mb-10">

                    <div className="card">

                        <div className="card-header">                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Notification Settings</h1>                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Notification Settings</h1>

                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">                    <p className="text-lg text-slate-600">Customize how and when you receive deadline reminders</p>                    <p className="text-lg text-slate-600">Customize how and when you receive deadline reminders</p>

                                    <MessageSquare className="w-5 h-5 text-white" />

                                </div>                </div>                </div>

                                <div>

                                    <h2 className="card-title text-xl">WhatsApp Notifications</h2>

                                    <p className="card-description">Get reminders on WhatsApp</p>

                                </div>                <div className="space-y-8">                <div className="space-y-8">

                            </div>

                        </div>                    <div className="card">                    <div className="card">

                        <div className="card-content">

                            <p className="text-slate-600">Connect WhatsApp for deadline reminders.</p>                        <div className="card-header">                        <div className="card-header">

                        </div>

                    </div>                            <div className="flex items-center space-x-3">                            <div className="flex items-center space-x-3">

                </div>

                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">

                <div className="mt-10 flex justify-center">

                    <button                                    <Mail className="w-5 h-5 text-white" />                                    <Mail className="w-5 h-5 text-white" />

                        onClick={handleSave}

                        disabled={isSaving}                                </div>                                </div>

                        className="btn btn-primary btn-lg flex items-center space-x-2"

                    >                                <div>                                <div>

                        {isSaving ? (

                            <>                                    <h2 className="card-title text-xl">Email Notifications</h2>                                    <h2 className="card-title text-xl">Email Notifications</h2>

                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

                                <span>Saving...</span>                                    <p className="card-description">Receive updates via email</p>                                    <p className="card-description">Receive updates via email</p>

                            </>

                        ) : (                                </div>                                </div>

                            <>

                                <Save className="w-5 h-5" />                            </div>                            </div>

                                <span>Save Settings</span>

                            </>                        </div>                        </div>

                        )}

                    </button>                        <div className="card-content">                        <div className="card-content">

                </div>

            </div>                            <p className="text-slate-600">Configure your email notification preferences here.</p>                            <p className="text-slate-600">Configure your email notification preferences here.</p>

        </div>

    );                        </div>                        </div>

}
                    </div>                    </div>



                    <div className="card">                    <div className="card">

                        <div className="card-header">                        <div className="card-header">

                            <div className="flex items-center space-x-3">                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">

                                    <Bell className="w-5 h-5 text-white" />                                    <Bell className="w-5 h-5 text-white" />

                                </div>                                </div>

                                <div>                                <div>

                                    <h2 className="card-title text-xl">Push Notifications</h2>                                    <h2 className="card-title text-xl">Push Notifications</h2>

                                    <p className="card-description">Browser and mobile notifications</p>                                    <p className="card-description">Browser and mobile notifications</p>

                                </div>                                </div>

                            </div>                            </div>

                        </div>                        </div>

                        <div className="card-content">                        <div className="card-content">

                            <p className="text-slate-600">Set up push notifications for instant alerts.</p>                            <p className="text-slate-600">Set up push notifications for instant alerts.</p>

                        </div>                        </div>

                    </div>                    </div>



                    <div className="card">                    <div className="card">

                        <div className="card-header">                        <div className="card-header">

                            <div className="flex items-center space-x-3">                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">

                                    <MessageSquare className="w-5 h-5 text-white" />                                    <MessageSquare className="w-5 h-5 text-white" />

                                </div>                                </div>

                                <div>                                <div>

                                    <h2 className="card-title text-xl">WhatsApp Notifications</h2>                                    <h2 className="card-title text-xl">WhatsApp Notifications</h2>

                                    <p className="card-description">Get reminders on WhatsApp</p>                                    <p className="card-description">Get reminders on WhatsApp</p>

                                </div>                                </div>

                            </div>                            </div>

                        </div>                        </div>

                        <div className="card-content">                        <div className="card-content">

                            <p className="text-slate-600">Connect WhatsApp for deadline reminders.</p>                            <p className="text-slate-600">Connect WhatsApp for deadline reminders.</p>

                        </div>                        </div>

                    </div>                    </div>

                </div>                </div>



                <div className="mt-10 flex justify-center">                <div className="mt-10 flex justify-center">

                    <button                    <button

                        onClick={handleSave}                        onClick={handleSave}

                        disabled={isSaving}                        disabled={isSaving}

                        className="btn btn-primary btn-lg flex items-center space-x-2"                        className="btn btn-primary btn-lg flex items-center space-x-2"

                    >                    >

                        {isSaving ? (                        {isSaving ? (

                            <>                            <>

                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

                                <span>Saving...</span>                                <span>Saving...</span>

                            </>                            </>

                        ) : (                        ) : (

                            <>                            <>

                                <Save className="w-5 h-5" />                                <Save className="w-5 h-5" />

                                <span>Save Settings</span>                                <span>Save Settings</span>

                            </>                            </>

                        )}                        )}

                    </button>                    </button>

                </div>                </div>

            </div>            </div>

        </div>        </div>

    );    );

}}

    useEffect(() => {

        if (!loading && !user) {

            router.push("/login");

        }interface NotificationSettings {import { useRouter } from "next/navigation";import { Navigation } from "@/components/Navigation";import { Navigation } from "@/components/Navigation";

    }, [user, loading, router]);

    email: {

    const handleSave = async () => {

        setIsSaving(true);        deadlineReminders: boolean;import { useEffect, useState } from "react";

        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);        weeklyDigest: boolean;

    };

        newDeadlines: boolean;import { Bell, Mail, MessageSquare, Clock, Save, CheckCircle } from "lucide-react";import { useAuth } from "@/contexts/AuthContext";import { useAuth } from "@/contexts/AuthContext";

    if (loading) {

        return (        overdueAlerts: boolean;

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">

                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>    };

            </div>

        );    push: {

    }

        enabled: boolean;interface NotificationSettings {import { useRouter } from "next/navigation";import { useRouter } from "next/navigation";

    if (!user) return null;

        deadlineAlerts: boolean;

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">        completionReminders: boolean;    email: {

            <Navigation />

            <div className="max-w-4xl mx-auto p-6">    };

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Notification Settings</h1>    whatsapp: {        deadlineReminders: boolean;import { useEffect, useState } from "react";import { useEffect, useState } from "react";

                    <p className="text-lg text-slate-600">Customize how and when you receive deadline reminders</p>

                </div>        enabled: boolean;



                <div className="space-y-8">        phoneNumber: string;        weeklyDigest: boolean;

                    <div className="card">

                        <div className="card-header">        dailySummary: boolean;

                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">    };        newDeadlines: boolean;import { Bell, Mail, MessageSquare, Clock, Save, CheckCircle } from "lucide-react";import { Bell, Mail, MessageSquare, Clock, Save, CheckCircle } from "lucide-react";

                                    <Mail className="w-5 h-5 text-white" />

                                </div>    timing: {

                                <div>

                                    <h2 className="card-title text-xl">Email Notifications</h2>        reminderDays: number[];        overdueAlerts: boolean;

                                    <p className="card-description">Receive updates via email</p>

                                </div>        quietHours: {

                            </div>

                        </div>            enabled: boolean;    };

                        <div className="card-content">

                            <p className="text-slate-600">Configure your email notification preferences here.</p>            start: string;

                        </div>

                    </div>            end: string;    whatsapp: {



                    <div className="card">        };

                        <div className="card-header">

                            <div className="flex items-center space-x-3">    };        deadlineReminders: boolean;interface NotificationSettings {interface NotificationSettings {

                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">

                                    <Bell className="w-5 h-5 text-white" />}

                                </div>

                                <div>        dailyDigest: boolean;

                                    <h2 className="card-title text-xl">Push Notifications</h2>

                                    <p className="card-description">Browser and mobile notifications</p>export default function NotificationsPage() {

                                </div>

                            </div>    const { user, loading } = useAuth();        urgentAlerts: boolean;    email: {    email: {

                        </div>

                        <div className="card-content">    const router = useRouter();

                            <p className="text-slate-600">Set up push notifications for instant alerts.</p>

                        </div>    const [settings, setSettings] = useState<NotificationSettings>({    };

                    </div>

        email: {

                    <div className="card">

                        <div className="card-header">            deadlineReminders: true,    inApp: {        deadlineReminders: boolean;        deadlineReminders: boolean;

                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">            weeklyDigest: true,

                                    <MessageSquare className="w-5 h-5 text-white" />

                                </div>            newDeadlines: true,        allNotifications: boolean;

                                <div>

                                    <h2 className="card-title text-xl">WhatsApp Notifications</h2>            overdueAlerts: true,

                                    <p className="card-description">Get reminders on WhatsApp</p>

                                </div>        },        deadlineReminders: boolean;        weeklyDigest: boolean;        weeklyDigest: boolean;

                            </div>

                        </div>        push: {

                        <div className="card-content">

                            <p className="text-slate-600">Connect WhatsApp for deadline reminders.</p>            enabled: true,        systemUpdates: boolean;

                        </div>

                    </div>            deadlineAlerts: true,

                </div>

            completionReminders: true,    };        newDeadlines: boolean;        newDeadlines: boolean;

                <div className="mt-10 flex justify-center">

                    <button        },

                        onClick={handleSave}

                        disabled={isSaving}        whatsapp: {    timing: {

                        className="btn btn-primary btn-lg flex items-center space-x-2"

                    >            enabled: false,

                        {isSaving ? (

                            <>            phoneNumber: "",        reminderDays: number;        overdueAlerts: boolean;        overdueAlerts: boolean;

                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

                                <span>Saving...</span>            dailySummary: false,

                            </>

                        ) : (        },        digestTime: string;

                            <>

                                <Save className="w-5 h-5" />        timing: {

                                <span>Save Settings</span>

                            </>            reminderDays: [7, 3, 1],        urgentThreshold: number;    };    };

                        )}

                    </button>            quietHours: {

                </div>

            </div>                enabled: true,    };

        </div>

    );                start: "22:00",

}
                end: "08:00",}    whatsapp: {    whatsapp: {

            },

        },

    });

    const [isSaving, setIsSaving] = useState(false);export default function NotificationsPage() {        deadlineReminders: boolean;        deadlineReminders: boolean;



    useEffect(() => {    const { user, loading } = useAuth();

        if (!loading && !user) {

            router.push("/login");    const router = useRouter();        dailyDigest: boolean;        dailyDigest: boolean;

        }

    }, [user, loading, router]);    const [settings, setSettings] = useState<NotificationSettings>({



    const handleSave = async () => {        email: {        urgentAlerts: boolean;        urgentAlerts: boolean;

        setIsSaving(true);

        await new Promise(resolve => setTimeout(resolve, 1000));            deadlineReminders: true,

        setIsSaving(false);

    };            weeklyDigest: true,    };    };



    if (loading) {            newDeadlines: false,

        return (

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">            overdueAlerts: true    inApp: {    inApp: {

                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

            </div>        },

        );

    }        whatsapp: {        allNotifications: boolean;        allNotifications: boolean;



    if (!user) return null;            deadlineReminders: false,



    return (            dailyDigest: false,        deadlineReminders: boolean;        deadlineReminders: boolean;

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

            <Navigation />            urgentAlerts: true

            <div className="max-w-4xl mx-auto p-6">

                <div className="mb-10">        },        systemUpdates: boolean;        systemUpdates: boolean;

                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Notification Settings</h1>

                    <p className="text-lg text-slate-600">Customize how and when you receive deadline reminders</p>        inApp: {

                </div>

            allNotifications: true,    };    };

                <div className="space-y-8">

                    <div className="card">            deadlineReminders: true,

                        <div className="card-header">

                            <div className="flex items-center space-x-3">            systemUpdates: true    timing: {    timing: {

                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">

                                    <Mail className="w-5 h-5 text-white" />        },

                                </div>

                                <div>        timing: {        reminderDays: number;        reminderDays: number;

                                    <h2 className="card-title text-xl">Email Notifications</h2>

                                    <p className="card-description">Receive updates via email</p>            reminderDays: 3,

                                </div>

                            </div>            digestTime: "09:00",        digestTime: string;        digestTime: string;

                        </div>

                        <div className="card-content">            urgentThreshold: 24

                            <p className="text-slate-600">Configure your email notification preferences here.</p>

                        </div>        }        urgentThreshold: number;        urgentThreshold: number;

                    </div>

    });

                    <div className="card">

                        <div className="card-header">    const [saving, setSaving] = useState(false);    };    };

                            <div className="flex items-center space-x-3">

                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">    const [saved, setSaved] = useState(false);

                                    <Bell className="w-5 h-5 text-white" />

                                </div>}}

                                <div>

                                    <h2 className="card-title text-xl">Push Notifications</h2>    useEffect(() => {

                                    <p className="card-description">Browser and mobile notifications</p>

                                </div>        if (!loading && !user) {

                            </div>

                        </div>            router.push("/login");

                        <div className="card-content">

                            <p className="text-slate-600">Set up push notifications for instant alerts.</p>        }export default function NotificationsPage() {export default function NotificationsPage() {

                        </div>

                    </div>    }, [user, loading, router]);



                    <div className="card">    const { user, loading } = useAuth();    const { user, loading } = useAuth();

                        <div className="card-header">

                            <div className="flex items-center space-x-3">    const handleToggle = (category: keyof NotificationSettings, key: string) => {

                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">

                                    <MessageSquare className="w-5 h-5 text-white" />        setSettings(prev => ({    const router = useRouter();    const router = useRouter();

                                </div>

                                <div>            ...prev,

                                    <h2 className="card-title text-xl">WhatsApp Notifications</h2>

                                    <p className="card-description">Get reminders on WhatsApp</p>            [category]: {    const [settings, setSettings] = useState<NotificationSettings>({    const [settings, setSettings] = useState<NotificationSettings>({

                                </div>

                            </div>                ...prev[category],

                        </div>

                        <div className="card-content">                [key]: !prev[category][key as keyof typeof prev[typeof category]]        email: {        email: {

                            <p className="text-slate-600">Connect WhatsApp for deadline reminders.</p>

                        </div>            }

                    </div>

                </div>        }));            deadlineReminders: true,            deadlineReminders: true,



                <div className="mt-10 flex justify-center">    };

                    <button

                        onClick={handleSave}            weeklyDigest: true,            weeklyDigest: true,

                        disabled={isSaving}

                        className="btn btn-primary btn-lg flex items-center space-x-2"    const handleTimingChange = (key: keyof NotificationSettings['timing'], value: string | number) => {

                    >

                        {isSaving ? (        setSettings(prev => ({            newDeadlines: false,            newDeadlines: false,

                            <>

                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>            ...prev,

                                <span>Saving...</span>

                            </>            timing: {            overdueAlerts: true            overdueAlerts: true

                        ) : (

                            <>                ...prev.timing,

                                <Save className="w-5 h-5" />

                                <span>Save Settings</span>                [key]: value        },        },

                            </>

                        )}            }

                    </button>

                </div>        }));        whatsapp: {        whatsapp: {

            </div>

        </div>    };

    );

}            deadlineReminders: false,            deadlineReminders: false,

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