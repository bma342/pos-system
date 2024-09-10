export interface Settings {
    [key: string]: string | number | boolean;
    // Add specific settings properties here, for example:
    // theme: string;
    // notificationsEnabled: boolean;
    // orderConfirmationEmail: string;
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