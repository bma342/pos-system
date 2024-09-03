export interface Settings {
    id: string;
    clientId: string;
    theme: ThemeSettings;
    notifications: NotificationSettings;
    general: GeneralSettings;
  }
  
  export interface ThemeSettings {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  }
  
  export interface NotificationSettings {
    email: boolean;
    sms: boolean;
    push: boolean;
  }
  
  export interface GeneralSettings {
    language: string;
    timezone: string;
  }