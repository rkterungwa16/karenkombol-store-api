export interface AuthAccessDto {
  roles: {
    name: string;
    permissions: string[];
  }[];
}
