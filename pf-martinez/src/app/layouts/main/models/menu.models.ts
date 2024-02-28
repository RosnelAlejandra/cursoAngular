export interface SectionListNav {
    name: string;
    icon: any;
    updated?: Date | null;
    path: string;
}

export interface SectionList {
    name: string;
    start?: Date | null;
    end?: Date | null;
    description: string;
}
  